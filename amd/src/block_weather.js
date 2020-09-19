/**
 * Contains the logic for a weather block.
 *
 * @package     block_weather
 * @copyright   2020 A K M Safat Shahin <safatshahin@gmail.com>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

define(['jquery', 'core/ajax', 'core/str', 'core/config', 'core/notification', 'core/templates'],
    function($, AJAX, str, mdlcfg, notification, templates) {
        var weather = {
            init: function(enabledOption, weatherKey) {
                str.get_strings([
                    {'key': 'no_geo_location_support', component: 'block_weather'},
                    {'key': 'no_openweather_key', component: 'block_weather'},
                    {'key': 'no_weather_provider', component: 'block_weather'}
                ]).done(function(s) {
                    if (enabledOption === 0) {
                        weather.weatherError(s[2]);
                    } else {
                        weather.weatherInfo(s, enabledOption, weatherKey);
                    }
                    // REFRESH THE WEATHER
                    $(document).on('click', '.block-weather-refresh', function() {
                        var tag = $('#weather-container');
                        var html = '';
                        tag.html(html);
                        weather.weatherInfo(s, enabledOption, weatherKey);
                    });
                    // CHANGE CELSIUS TO FAHRENHEIT ON CLICK OR VICE THE OTHER WAY
                    $(document).on('click', '.block-weather-temperature-value', function() {
                        var tempValue = $('.block-weather-temperature-value').attr('data-value');
                        if (tempValue !== '-') {
                            var tempAction = $('.block-weather-temperature-value').attr('data-action');
                            if (tempAction === 'celsius') {
                                // CHANGE TO FAHRENHEIT
                                var farhValue = Math.floor((parseInt(tempValue) * 9 / 5) + 32);
                                var temp = $('.block-weather-temperature-value');
                                var tempData = '<p>' + farhValue + '°<span>F</span></p>';
                                $('.block-weather-temperature-value').attr('data-action', 'fahrenheit');
                                temp.html(tempData);
                            } else {
                                // CHANGE TO CELSIUS
                                var temp = $('.block-weather-temperature-value');
                                var tempData = '<p>' + tempValue + '°<span>C</span></p>';
                                $('.block-weather-temperature-value').attr('data-action', 'celsius');
                                temp.html(tempData);
                            }
                        }
                    });
                });
            },
            weatherInfo: function(s, enabledOption, weatherKey) {
                // CHECK IF BROWSER SUPPORTS GEOLOCATION
                if ('geolocation' in navigator) {
                    navigator.geolocation.getCurrentPosition(setPosition, showError);
                } else {
                    weather.weatherError(s[0]);
                }

                // SET USER'S POSITION
                function setPosition(position) {
                    let latitude = position.coords.latitude;
                    let longitude = position.coords.longitude;
                    let timestamp = position.timestamp;
                    if (enabledOption === 1 && weatherKey.length) {
                        weather.openWeather(s, weatherKey, latitude, longitude);
                    } else if (enabledOption === 2 && weatherKey.length) {
                        weather.accuWeather(s, weatherKey, latitude, longitude);
                    } else if (enabledOption === 3 && weatherKey.length) {
                        weather.climacellWeather(s, weatherKey, latitude, longitude, timestamp);
                    } else {
                        var errorMsg = s[1];
                        weather.weatherError(errorMsg);
                    }
                }

                // SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
                function showError(error) {
                    var errorMsg = `${error.message}`;
                    weather.weatherError(errorMsg);
                }
            },
            weatherError: function(error) {
                var context = {
                    weathererror: `<p> ${error} </p>`,
                    weathericon: M.util.image_url('unknown', 'block_weather'),
                    weathervalue: '-',
                    weatherattr: '-'
                };
                templates.render('block_weather/weather_info', context).then(function(html, js) {
                    var tag = $('#weather-container');
                    tag.html(html);
                }).fail(notification.exception);
            },
            openWeather: function(s, weatherKey, latitude, longitude) {
                let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherKey}`;
                fetch(api)
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(data) {
                        if (data.cod === 200) {
                            var context = {
                                weathervalue: Math.floor(data.main.temp - 273),
                                weatherdesc: data.weather[0].description,
                                weatherattr: 'celsius',
                                weathericon: M.util.image_url(data.weather[0].icon, 'block_weather'),
                                weatherlocation: data.name + ', ' + data.sys.country
                            };
                            templates.render('block_weather/weather_info', context).then(function(html, js) {
                                var tag = $('#weather-container');
                                tag.html(html);
                            }).fail(notification.exception);
                        } else {
                            var errorMsg = s[1];
                            weather.weatherError(errorMsg);
                        }
                    });
            },
            accuWeather : function(s, weatherKey, latitude, longitude) {
                let locationKey = `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${weatherKey}&q=${latitude}%2C${longitude}&language=en-us&details=false&toplevel=false`;
                fetch(locationKey)
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(data) {
                        if (data.Key.length) {
                            let api = `https://dataservice.accuweather.com/currentconditions/v1/${data.Key}?apikey=${weatherKey}&language=en-us&details=false`;
                            fetch(api)
                                .then(function(response) {
                                    return response.json();
                                })
                                .then(function(weatherData) {
                                    if (weatherData[0].WeatherText.length) {
                                        var context = {
                                            weathervalue: weatherData[0].Temperature.Metric.Value,
                                            weatherdesc: weatherData[0].WeatherText,
                                            weatherattr: 'celsius',
                                            weathericon: M.util.image_url(weatherData[0].WeatherIcon, 'block_weather'),
                                            weatherlocation: data.EnglishName + ', ' + data.AdministrativeArea.EnglishName
                                        };
                                        templates.render('block_weather/weather_info', context).then(function(html, js) {
                                            var tag = $('#weather-container');
                                            tag.html(html);
                                        }).fail(notification.exception);
                                    } else {
                                        var errorMsg = s[1];
                                        weather.weatherError(errorMsg);
                                    }
                                });
                        } else {
                            var errorMsg = s[1];
                            weather.weatherError(errorMsg);
                        }
                    });

            },
            climacellWeather: function(s, weatherKey, latitude, longitude, timestamp) {
                let api = `https://api.climacell.co/v3/weather/realtime?lat=${latitude}&lon=${longitude}&unit_system=si&fields=temp%2Cweather_code&apikey=${weatherKey}`;
                fetch(api)
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(data) {
                        if (data.message) {
                            var errorMsg = s[1];
                            weather.weatherError(errorMsg);
                        } else {
                            var weatherCode = data.weather_code.value;
                            if (data.weather_code.value === 'clear') {
                                var today = new Date(timestamp);
                                var hour = today.getHours();
                                console.log(hour);
                                if (hour >= 18 || hour <= 6) {
                                    weatherCode = data.weather_code.value + '_night';
                                } else {
                                    weatherCode = data.weather_code.value + '_day';
                                }
                            }
                            let location = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
                            fetch(location)
                                .then(function(response) {
                                    return response.json();
                                })
                                .then(function(locationData) {
                                    var weatherLocation = '';
                                    if (locationData.locality) {
                                        weatherLocation = locationData.locality + ', ' + locationData.principalSubdivision;
                                    }
                                    var context = {
                                        weathervalue: Math.floor(data.temp.value),
                                        weatherdesc: M.util.get_string(weatherCode, 'block_weather'),
                                        weatherattr: 'celsius',
                                        weathericon: M.util.image_url(weatherCode, 'block_weather'),
                                        weatherlocation: weatherLocation
                                    };
                                    templates.render('block_weather/weather_info', context).then(function(html, js) {
                                        var tag = $('#weather-container');
                                        tag.html(html);
                                    }).fail(notification.exception);
                                });

                        }
                    });
            }
        };
        return weather;
    });
