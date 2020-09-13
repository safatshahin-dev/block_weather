define(['jquery', 'core/ajax', 'core/str', 'core/config', 'core/notification', 'core/templates'],
    function($, AJAX, str, mdlcfg, notification, templates) {
        var weather = {
            init: function(enabledOption, openWeatherKey) {
                str.get_strings([
                    {'key': 'no_geo_location_support', component: 'block_weather'},
                    {'key': 'no_openweather_key', component: 'block_weather'}
                ]).done(function(s) {
                    weather.weatherInfo(s, enabledOption, openWeatherKey);
                    $(document).on('click', '.block-weather-refresh', function() {
                        var tag = $('#weather-container');
                        var html = '';
                        tag.html(html);
                        weather.weatherInfo(s, enabledOption, openWeatherKey);
                    });
                    $(document).on('click', '.block-weather-temperature-value', function() {
                        var tempValue = $('.block-weather-temperature-value').attr('data-value');
                        if (tempValue !== '-') {
                            var tempAction = $('.block-weather-temperature-value').attr('data-action');
                            if (tempAction === 'celsius') {
                                var farhValue = Math.floor((parseInt(tempValue) * 9 / 5) + 32);
                                var temp = $('.block-weather-temperature-value');
                                var tempData = '<p>' + farhValue + '°<span>F</span></p>';
                                $('.block-weather-temperature-value').attr('data-value', farhValue);
                                $('.block-weather-temperature-value').attr('data-action', 'fahrenheit');
                                temp.html(tempData);
                            } else {
                                var celcValue = Math.floor((parseInt(tempValue) - 32) * 5 / 9);
                                var temp = $('.block-weather-temperature-value');
                                var tempData = '<p>' + celcValue + '°<span>C</span></p>';
                                $('.block-weather-temperature-value').attr('data-value', celcValue);
                                $('.block-weather-temperature-value').attr('data-action', 'celsius');
                                temp.html(tempData);
                            }
                        }
                    });
                });
            },
            weatherInfo: function(s, enabledOption, openWeatherKey) {
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
                    if (enabledOption === 1 && openWeatherKey.length) {
                        weather.openWeather(s, openWeatherKey, latitude, longitude);
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
            openWeather: function(s, openWeatherKey, latitude, longitude) {
                let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openWeatherKey}`;
                fetch(api)
                    .then(function(response){
                        return response.json();
                    })
                    .then(function(data) {
                        if (data.cod === 200) {
                            var context = {
                                weathervalue: Math.floor(data.main.temp - 273),
                                weatherdesc: data.weather[0].description,
                                weatherattr: 'celsius',
                                weathericon: M.util.image_url(data.weather[0].icon, 'block_weather'),
                                weatherlocation: data.name + ',' + data.sys.country
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
            }
        };
        return weather;
    });
