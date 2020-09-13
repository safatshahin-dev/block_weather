<?php

/**
 * Block weather renderer.
 *
 * @package     block_weather
 * @copyright   2020 A K M Safat Shahin <safatshahin@gmail.com>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

namespace block_weather\output;

defined('MOODLE_INTERNAL') || die;

class renderer extends \plugin_renderer_base {
    /**
     * Throws in a call to the JS for AJAX etc.
     *
     * @return string html for the page
     */
    public function __construct()
    {
        global $PAGE;
        parent::__construct($PAGE, RENDERER_TARGET_GENERAL);
    }

    public function render_weather() {
        $data = array();
        return parent::render_from_template('block_weather/weather', $data);
    }

    public function render_weather_info () {
        global $PAGE;
        $PAGE->requires->css('/blocks/weather/assets/css/block_weather.css');
        $config = get_config('block_weather');
        $openWeatherKey = '';
        $enabledOption = 0;
        if ((int)$config->selectedweatherapi == 1) {
            $enabledOption = 1;
            $openWeatherKey = $config->openweatherapikey;
        }

        $PAGE->requires->js_call_amd('block_weather/block_weather', 'init', array($enabledOption, $openWeatherKey));
    }
}
