<?php
namespace BetterLinks;

class Migration extends \WP_Background_Process {
    use Traits\DBMigrate;
    public $wpdb;
    protected $db_version;
    protected $plugin_version;
    protected $action;
    public function __construct()
    {
        parent::__construct();
        global $wpdb;
        $this->wpdb = $wpdb;
        $this->action = 'betterlinks_run_updater';
		$this->task_lists = ['db_migration', 'update_json_links', 'clear_cache'];
        $this->db_version = get_option('betterlinks_db_version');
        $this->plugin_version = get_option('betterlinks_version');
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
	protected function task( $item ) {
		if(method_exists($this, $item)){
			try {
				$this->$item();
			} catch ( \Exception $e ) {
				if ( defined('WP_DEBUG') && WP_DEBUG) {
					trigger_error( 'BetterLinks updater triggered fatal error for callback ' . esc_html( $item ), E_USER_WARNING ); // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_trigger_error
				}
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
	protected function complete() {
		parent::complete();
		// Show notice to user or perform some other arbitrary task...
    }
    
    public function is_doing_dispatch()
	{
		if ($this->plugin_version != BETTERLINKS_VERSION) {
            update_option('betterlinks_version', BETTERLINKS_VERSION);
            return true;
        }
        return false;
    }
    
    public function db_migration()
    {
        if ($this->db_version != BETTERLINKS_DB_VERSION) {
            if(BETTERLINKS_DB_VERSION == '1.1'){
                $this->db_migration_1_1();
            }else if(BETTERLINKS_DB_VERSION == '1.2'){
                $this->db_migration_1_2();
            }
            if(version_compare($this->db_version, '1.3', '<')){
                $this->db_migration_1_1();
                $this->db_migration_1_2();
            }
			update_option('betterlinks_db_version', BETTERLINKS_DB_VERSION);
		}
    }

    public function update_json_links()
    {
        $Cron = new Cron();
		$Cron->write_json_links();
    }

    public function clear_cache()
    {
        Helper::clear_query_cache();
    }
}