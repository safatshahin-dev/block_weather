<?php

/**
 * Plugin administration pages are defined here.
 *
 * @package     block_weather
 * @category    admin
 * @copyright   2020 A K M Safat Shahin <safatshahin@gmail.com>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

if ($ADMIN->fulltree) {
    $none = get_string('noweatherapi', 'block_weather');
    $openWeather = get_string('openweather', 'block_weather');
    $accuWeather = get_string('accuweather', 'block_weather');
    $climacell = get_string('climacell', 'block_weather');
    $weatherDropdown = array($none, $openWeather, $accuWeather, $climacell);

    $name = 'block_weather/selectedweatherapi';
    $title = get_string('selectedweatherapi', 'block_weather');
    $description = get_string('selectedweatherapi_desc', 'block_weather');
    $setting = new admin_setting_configselect($name, $title, '', 0, $weatherDropdown);
    $settings->add($setting);

    $settings->add(new admin_setting_heading('openweather', get_string('openweather', 'block_weather'),
        format_text(get_string('openweather_description', 'block_weather'), FORMAT_MARKDOWN)));

    $name = 'block_weather/openweatherapikey';
    $title = get_string('openweatherapikey', 'block_weather');
    $description = get_string('openweatherapikey_desc', 'block_weather');
    $setting = new admin_setting_configtext($name, $title, $description, '');
    $settings->add($setting);

    $settings->add(new admin_setting_heading('accuweather', get_string('accuweather', 'block_weather'),
        format_text(get_string('accuweather_description', 'block_weather'), FORMAT_MARKDOWN)));

    $name = 'block_weather/accuweatherapikey';
    $title = get_string('accuweatherapikey', 'block_weather');
    $description = get_string('accuweatherapikey_desc', 'block_weather');
    $setting = new admin_setting_configtext($name, $title, $description, '');
    $settings->add($setting);

    $settings->add(new admin_setting_heading('climacell', get_string('climacell', 'block_weather'),
        format_text(get_string('climacell_description', 'block_weather'), FORMAT_MARKDOWN)));

    $name = 'block_weather/climacellpikey';
    $title = get_string('climacellpikey', 'block_weather');
    $description = get_string('climacellpikey_desc', 'block_weather');
    $setting = new admin_setting_configtext($name, $title, $description, '');
    $settings->add($setting);
}
