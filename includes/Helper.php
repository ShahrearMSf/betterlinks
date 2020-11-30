<?php 
namespace BetterLinks;

class Helper {

    /**
     * Check Supported Post type for admin page and plugin main settings page
     * 
     * @return bool
     */

    public static function plugin_page_hook_suffix($hook)
    {
        if (
            $hook == 'toplevel_page_' .  BL_PLUGIN_SLUG
        ) {
            return true;
        }
        return false;
    }
}