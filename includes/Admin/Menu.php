<?php

namespace BetterLinks\Admin;

class Menu
{
    /**
     * add plugin menu page and submenu pages 
     */
    public function __construct()
    {
        add_action('admin_menu', array($this, 'admin_menu'));
    }


    /**
     * add admin menu page
     * @return hooks
     */
    public function admin_menu()
    {
        add_menu_page(__('Better Links', 'betterlinks'), __('Better Links', 'betterlinks'), 'manage_options', BL_PLUGIN_SLUG, [$this, 'load_main_template'], null, 30);
        add_submenu_page(BL_PLUGIN_SLUG, __('Better Links', 'betterlinks'), __('Better Links', 'betterlinks'), 'manage_options', BL_PLUGIN_SLUG, [$this, 'load_main_template']);
        add_submenu_page(BL_PLUGIN_SLUG, __('Clicks', 'betterlinks'), __('Clicks', 'betterlinks'), 'manage_options', BL_PLUGIN_SLUG . '-clicks', [$this, 'load_main_template']);
    }


    public function load_main_template()
    {
        echo '<div id="betterlinksbody" class="betterlinks-body"></div>';
    }

}
