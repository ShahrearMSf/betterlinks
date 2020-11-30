<?php

namespace BetterLinks\Admin;


class Assets
{
    public function __construct()
    {
        add_action('admin_enqueue_scripts', [$this, 'plugin_scripts']);
    }


    /**
     * Enqueue Files on Start Plugin
     *
     * @function plugin_script
     */
    public function plugin_scripts($hook)
    {
        if (\BetterLinks\Helper::plugin_page_hook_suffix($hook)) {
            wp_enqueue_style('wpscp-admin', BL_ASSETS_URI . 'css/wpscp-admin.css', array(), filemtime(WPSP_ASSETS_DIR_PATH . 'css/wpscp-admin.css'), 'all');
            // js
            wp_enqueue_script('jquery-datetimepicker', BL_ASSETS_URI . 'js/vendor/jquery.datetimepicker.full.min.js', array('jquery'), filemtime(WPSP_ASSETS_DIR_PATH . 'js/vendor/jquery.datetimepicker.full.min.js'), false);
        }
    }
}
