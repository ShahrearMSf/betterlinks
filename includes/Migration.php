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
            if(version_compare($db_version, '1.1', '<')){
                $this->db_migration_1_1();
            } else if(version_compare($db_version, '1.2', '<')) {
                $this->db_migration_1_2();
            }
			update_option('betterlinks_db_version', BETTERLINKS_DB_VERSION);
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