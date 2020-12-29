<?php 
namespace BetterLinks;

class Helper {

    public static function DB(){
        static $BLDATA;
        if (! $BLDATA) {
            global $wpdb;
            $connection = new Query\Connection($wpdb, ['prefix' => $wpdb->prefix]);
            $BLDATA = new Query\QueryBuilder\QueryBuilderHandler($connection);
        }
        return $BLDATA;
    }

    /**
     * Check Supported Post type for admin page and plugin main settings page
     * 
     * @return bool
     */

    public static function plugin_page_hook_suffix($hook)
    {
        if (
            $hook == 'toplevel_page_' .  BL_PLUGIN_SLUG ||
            $hook = BL_PLUGIN_SLUG . '_page_'.BL_PLUGIN_SLUG.'-clicks'
        ) {
            return true;
        }
        return false;
    }
}