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
            add_action('wp_print_scripts', function () {
                $isSkip = apply_filters('BetterLinks/Admin/skip_no_conflict', false);
    
                if ($isSkip) {
                    return;
                }
    
                global $wp_scripts;
                if (!$wp_scripts) {
                    return;
                }
    
                $pluginUrl = plugins_url();
                foreach ($wp_scripts->queue as $script) {
                    $src = $wp_scripts->registered[$script]->src;
                    if (strpos($src, $pluginUrl) !== false && !strpos($src, BL_PLUGIN_SLUG) !== false) {
                        wp_dequeue_script($wp_scripts->registered[$script]->handle);
                    }
                }
            }, 1);

            wp_enqueue_style('betterlinks-admin-style', BL_ASSETS_URI . 'css/admin.css', array(), filemtime(BL_ASSETS_DIR_PATH . 'css/admin.css'), 'all');
            // js
            wp_enqueue_script('betterlinks-admin-scripts', BL_ASSETS_URI . 'js/admin.js', array('jquery'), filemtime(BL_ASSETS_DIR_PATH . 'js/admin.js'), true);
            wp_localize_script('betterlinks-admin-scripts', 'betterLinksGlobal', array(
                'nonce' => wp_create_nonce('wp_rest'),
                'rest_url' => rest_url(),
                'namespace' => BL_PLUGIN_SLUG . '/v1/',
                'plugin_root_url' => BL_PLUGIN_ROOT_URI,
                'plugin_root_path' => BL_ROOT_DIR_PATH,
                'site_url' => site_url(),
                'page'  => (isset($_GET['page']) ? $_GET['page'] : '')
            ));
        }
    }
}
