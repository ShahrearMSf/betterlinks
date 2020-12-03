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
            wp_enqueue_style('betterlinks-admin-style', BL_ASSETS_URI . 'css/admin.css', array(), filemtime(WPSP_ASSETS_DIR_PATH . 'css/admin.css'), 'all');
            // js
            wp_enqueue_script('betterlinks-admin-scripts', BL_ASSETS_URI . 'js/admin.js', array('jquery'), filemtime(WPSP_ASSETS_DIR_PATH . 'js/admin.js'), false);
            wp_localize_script('betterlinks-admin-scripts', 'betterLinksGlobal', array(
                'nonce' => wp_create_nonce('wp_rest'),
                'rest_url' => rest_url(),
                'namespace' => BL_PLUGIN_SLUG . '/v1/',
                'plugin_root_url' => BL_PLUGIN_ROOT_URI,
                'plugin_root_path' => BL_ROOT_DIR_PATH,
            ));
        }
    }
}
