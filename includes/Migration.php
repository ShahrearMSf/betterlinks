<?php
namespace BetterLinks;

class Migration {
    public $wpdb;
    public function __construct()
    {
        global $wpdb;
		$this->wpdb = $wpdb;
        $db_version = get_option('betterlinks_db_version');
        if ($db_version != BETTERLINKS_DB_VERSION) {
            if(BETTERLINKS_DB_VERSION == '1.1'){
                $this->db_migration_1_1();
            }else if(BETTERLINKS_DB_VERSION == '1.2'){
                $this->db_migration_1_2();
            }
            if(version_compare($db_version, '1.3', '<')){
                $this->db_migration_1_1();
                $this->db_migration_1_2();
            }
			update_option('betterlinks_db_version', BETTERLINKS_DB_VERSION);
		}
        // update plugin version
		if (get_option('betterlinks_version') != BETTERLINKS_VERSION) {
            Helper::create_cron_jobs_for_json_links();
            Helper::clear_query_cache();
            update_option('betterlinks_version', BETTERLINKS_VERSION);
		}
    }
    public function db_migration_1_1()
    {
        $table_name = $this->wpdb->prefix . 'betterlinks';
        $betterlinks = $this->wpdb->get_row("SELECT * FROM $table_name");
        //Add column if not present.
        if(!isset($betterlinks->wildcards)){
            $this->wpdb->query("ALTER TABLE $table_name ADD wildcards BOOLEAN NOT NULL DEFAULT 0");
        }
    }
    public function db_migration_1_2()
    {
        $table_name = $this->wpdb->prefix . 'betterlinks';
        $betterlinks = $this->wpdb->get_row("SELECT * FROM $table_name");
        //Add column if not present.
        if(!isset($betterlinks->expire)){
            $this->wpdb->query("ALTER TABLE $table_name ADD expire text default NULL");
        }
    }
}