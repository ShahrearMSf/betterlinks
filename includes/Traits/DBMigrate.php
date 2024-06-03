<?php
namespace BetterLinks\Traits;

use BetterLinks\Admin\Cache;
use BetterLinks\Helper;

trait DBMigrate
{
    public function db_migration_1_1()
    {
        $table_name = $this->wpdb->prefix . 'betterlinks';
        $betterlinks = $this->wpdb->get_row("SELECT * FROM $table_name");
        //Add column if not present.
        if (!isset($betterlinks->wildcards)) {
            $this->wpdb->query("ALTER TABLE $table_name ADD wildcards BOOLEAN NOT NULL DEFAULT 0");
        }
    }
    public function db_migration_1_2()
    {
        $table_name = $this->wpdb->prefix . 'betterlinks';
        $betterlinks = $this->wpdb->get_row("SELECT * FROM $table_name");
        //Add column if not present.
        if (!isset($betterlinks->expire)) {
            $this->wpdb->query("ALTER TABLE $table_name ADD expire text default NULL");
        }
    }
    public function db_migration_1_4()
    {
        // links
        $betterlinks_table = $this->wpdb->prefix . 'betterlinks';
        $betterlinks = $this->wpdb->get_row("SELECT * FROM $betterlinks_table");
        //Add column if not present.
        if (!isset($betterlinks->dynamic_redirect)) {
            $this->wpdb->query("ALTER TABLE $betterlinks_table ADD dynamic_redirect text default NULL");
        }
        // clicks
        $betterlinks_clicks_table = $this->wpdb->prefix . 'betterlinks_clicks';
        $betterlinks_clicks = $this->wpdb->get_row("SELECT * FROM $betterlinks_clicks_table");
        //Add column if not present.
        if (!isset($betterlinks_clicks->rotation_target_url)) {
            $this->wpdb->query("ALTER TABLE  $betterlinks_clicks_table ADD rotation_target_url varchar(255) NULL");
        }
    }


    public function update_settings() {
        $settings = Cache::get_json_settings();

        if( empty( $settings['enable_custom_domain_menu'] ) ){
            $settings['enable_custom_domain_menu'] = true;
        }
        $settings = json_encode( $settings );
        delete_transient( BETTERLINKS_CACHE_LINKS_NAME );
        if ( $settings ) {
            update_option( BETTERLINKS_LINKS_OPTION_NAME, $settings );
            Cache::write_json_settings();
        }
        if( empty(get_option( BETTERLINKS_CUSTOM_DOMAIN_MENU, false )) ) {
            update_option(BETTERLINKS_CUSTOM_DOMAIN_MENU, true);
        }
        // regenerate links for wildcards option update
        Helper::write_links_inside_json();
    }
}
