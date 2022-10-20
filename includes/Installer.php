<?php
namespace BetterLinks;

class Installer extends \WP_Background_Process
{
    use Traits\DBTables;
    use Traits\DBMigrate;
    protected $wpdb;
    protected $charset_collate;
    protected $action = 'betterlinks_background_task';
    public $activation;
    public $migration;
    public $db_version;

    public function __construct()
    {
        parent::__construct();
        global $wpdb;
        $this->wpdb = $wpdb;
        $this->charset_collate = $wpdb->get_charset_collate();
        $this->activation = ['create_db_tables', 'db_migration', 'insert_terms_data','create_json_files','save_settings','update_json_links'];
        $this->migration = ['db_migration', 'update_json_links', 'clear_cache'];
        $this->ptl_migration = ['prettylinks_background_migration'];
        $this->db_version = get_option('betterlinks_db_version');
    }

    public function start_dispatch()
    {
        if (get_option($this->action)) {
            delete_option($this->action);
            return true;
        }
        return false;
    }
    public function doing_dispatch()
    {
        return get_option($this->action);
    }
    public function init()
    {
        add_option($this->action, true);
    }

    /**
     * Task
     *
     * Override this method to perform any actions required on each
     * queue item. Return the modified item for further processing
     * in the next pass through. Or, return false to remove the
     * item from the queue.
     *
     * @param mixed $item Queue item to iterate over
     *
     * @return mixed
     */
    protected function task($item)
    {
        if (! is_numeric( $item ) && method_exists($this, $item)) {
            try {
                $this->$item();
            } catch (\Exception $e) {
                if (defined('WP_DEBUG') && WP_DEBUG) {
                    trigger_error('BetterLinks background task triggered fatal error for callback ' . esc_html($item), E_USER_WARNING); // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_trigger_error
                }
            }
        } elseif( is_numeric( $item ) ) {
            //TODO: Flag for max given chances to insert for the same ID ( click ).
            $migrator = new \BetterLinks\Tools\Migration\PTLOneClick();
            if( ! $migrator->insert_clicks( absint( $item ) ) ) {
                return true;
            }
        }
        return false;
    }

    /**
     * Complete
     *
     * Override if applicable, but ensure that the below actions are
     * performed, or, call parent::complete().
     */
    protected function complete()
    {
        parent::complete();
        // Show notice to user or perform some other arbitrary task...
    }

    public function create_db_tables()
    {
        // error_log("--create_db_tables started running in background--");
        require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        $this->createBetterLinksTable();
        $this->createBetterTermsTable();
        $this->createBetterTermsRelationshipsTable();
        $this->createBetterClicksTable();
        $this->createBetterLinkMetaTable();
        // update plugin version
        if (!get_option('betterlinks_version')) {
            update_option('betterlinks_version', BETTERLINKS_VERSION);
        }
        // update db version
        if (!get_option('betterlinks_db_version')) {
            update_option('betterlinks_db_version', BETTERLINKS_DB_VERSION);
        }
        // error_log("--create_db_tables ended running in background--");
    }

    public function insert_terms_data()
    {
        try {
            Helper::insert_term([
                'term_name' => 'Uncategorized',
                'term_slug' => 'uncategorized',
                'term_type' => 'category',
            ]);
        } catch (\Throwable $th) {
            echo $th->getMessage();
        }
    }

    public function save_settings()
    {
        if (!get_option(BETTERLINKS_LINKS_OPTION_NAME)) {
            $value = [
                'redirect_type'         => '307',
                'nofollow'   		    => true,
                'sponsored'  	        => '',
                'track_me'   		    => true,
                'param_forwarding'      => '',
                'wildcards'  	        => false,
                'disablebotclicks'      => false,
                'is_allow_gutenberg'    => true,
                'force_https'   	    => false,
                'prefix'                => 'go',
                'is_allow_qr'           => false,
                'is_random_string'      => false,
                'is_autolink_icon'      => false,
                'is_autolink_headings'  => true,
                'is_case_sensitive'     => false,
            ];
            add_option(BETTERLINKS_LINKS_OPTION_NAME, json_encode($value));
        }
    }

    /**
     * Create files/directories.
     */
    public function create_json_files()
    {
        $emptyContent = '{}';
        $files = [
            [
                'base' => BETTERLINKS_UPLOAD_DIR_PATH,
                'file' => 'index.html',
                'content' => '',
            ],
            [
                'base' => BETTERLINKS_UPLOAD_DIR_PATH,
                'file' => 'links.json',
                'content' => $emptyContent,
            ],
            [
                'base' => BETTERLINKS_UPLOAD_DIR_PATH,
                'file' => 'clicks.json',
                'content' => $emptyContent,
            ],
        ];

        foreach ($files as $file) {
            if (wp_mkdir_p($file['base']) && !file_exists(trailingslashit($file['base']) . $file['file'])) {
                $file_handle = @fopen(trailingslashit($file['base']) . $file['file'], 'wb');
                if ($file_handle) {
                    fwrite($file_handle, $file['content']);
                    fclose($file_handle);
                }
            }
        }
    }

    public function update_json_links()
    {
        // error_log("--update_json_links started running in background--");
        $Cron = new Cron();
        $Cron->write_json_links();
        // error_log("--update_json_links ended running in background--");
    }

    public function db_migration()
    {
        // error_log("--db_migration started running in background--");
        require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        if ($this->db_version && $this->db_version != BETTERLINKS_DB_VERSION) {
            if (BETTERLINKS_DB_VERSION == '1.1') {
                $this->db_migration_1_1();
            } elseif (BETTERLINKS_DB_VERSION == '1.2') {
                $this->db_migration_1_2();
            } elseif (BETTERLINKS_DB_VERSION == '1.4') {
                $this->db_migration_1_4();
            } elseif (BETTERLINKS_DB_VERSION == '1.5') {
                $this->createBetterLinkMetaTable();
            }
            if (version_compare($this->db_version, '1.3', '<')) {
                $this->db_migration_1_1();
                $this->db_migration_1_2();
            }
        }
        update_option('betterlinks_db_version', BETTERLINKS_DB_VERSION);
        // error_log("--db_migration stopped running in background--");
    }

    public function clear_cache()
    {
        // error_log("--clear_cache started running in background--");
        Helper::clear_query_cache();
        // error_log("--clear_cache ended running in background--");
    }

    public function prettylinks_background_migration()
    {

        $result = \BetterLinks\Helper::btl_get_option("btl_should_prettylink_migration_start_in_background");
        if($result){
            \BetterLinks\Helper::btl_update_option("btl_should_prettylink_migration_start_in_background", false);
        }else{
            return false;
        }

        $type = \BetterLinks\Helper::btl_get_option("ptrl_migration_type");
        $type = explode(',', $type);

        $migrator = new \BetterLinks\Tools\Migration\PTLOneClick();
        $resutls = $migrator->run_importer($type);
        do_action('betterlinks/admin/after_import_data');
        \BetterLinks\Helper::btl_update_option('betterlinks_notice_ptl_migrate', true);
        \BetterLinks\Helper::btl_update_option('btl_prettylinks_background_migration_completed', ["bg_process_finished" => true]);
    }
}
