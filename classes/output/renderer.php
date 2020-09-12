<?php

namespace block_weather\output;

defined('MOODLE_INTERNAL') || die;

use context_system;

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
        if ($config->enableopenweather) {
            $enabledOption = 1;
            $openWeatherKey = $config->openweatherapikey;

        }
        $PAGE->requires->js_call_amd('block_weather/block_weather', 'init', array($enabledOption, $openWeatherKey));
    }
}
