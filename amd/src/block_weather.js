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
                        weather.weatherInfo(s, enabledOption, openWeatherKey);
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
                        weather.openWeather(openWeatherKey, latitude, longitude);
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
                    weathererror: error,
                    weathericon: M.util.image_url('unknown', 'block_weather'),
                    weathervalue: '-'
                };
                templates.render('block_weather/weather_info', context).then(function(html, js) {
                    var tag = $('#weather-container');
                    tag.html(html);
                }).fail(notification.exception);
            },
            openWeather: function(openWeatherKey, latitude, longitude) {
                console.log(latitude);
                console.log(longitude);
                console.log(openWeatherKey);
                var context = {};
                templates.render('block_weather/weather_info', context).then(function(html, js) {
                    var tag = $('#weather-container');
                    tag.html(html);
                }).fail(notification.exception);
            }
        };
        return weather;
    });
