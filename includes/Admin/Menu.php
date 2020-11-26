<?php

namespace BETTERLINKS\Admin;

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
        add_menu_page(__('Better Links', 'better-links'), __('Better Links', 'better-links'), 'manage_options', BL_PLUGIN_SLUG, [$this, 'load_main_template'], null, 30);
    }


    public function load_main_template()
    {
        echo '<div id="betterlinksbody" class="betterlinks-body"></div>';
    }

}
