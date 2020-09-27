<?php
// This file is part of Moodle - https://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <https://www.gnu.org/licenses/>.
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
        $this->page->requires->css('/blocks/weather/assets/css/block_weather.css');
        $config = get_config('block_weather');
        $weatherKey = '';
        $enabledOption = 0;
        if ((int)$config->selectedweatherapi == 1) {
            $enabledOption = 1;
            $weatherKey = $config->openweatherapikey;
        } else if ((int)$config->selectedweatherapi == 2) {
            $enabledOption = 2;
            $weatherKey = $config->accuweatherapikey;
        } else if ((int)$config->selectedweatherapi == 3) {
            $enabledOption = 3;
            $weatherKey = $config->climacellpikey;
        }

        $this->page->requires->js_call_amd('block_weather/block_weather', 'init', array($enabledOption, $weatherKey));
    }
}
