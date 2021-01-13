<?php
namespace BetterLinks;

class Uninstall {
    public function __construct()
    {
        $this->clear_cron_events();
    }
    public function clear_cron_events ()
    {
        wp_clear_scheduled_hook( 'betterlinks/write_json_links' );
    }
}