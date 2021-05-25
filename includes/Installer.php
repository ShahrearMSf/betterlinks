<?php
namespace BetterLinks;
class Installer extends \WP_Background_Process
{
	use Traits\DBTables;
	protected $wpdb;
	protected $charset_collate;
	protected $action;

	public function __construct()
	{
		parent::__construct();
		global $wpdb;
		$this->wpdb = $wpdb;
		$this->charset_collate = $wpdb->get_charset_collate();
		$this->action = 'betterlinks_run_installer';
		$this->task_lists = ['create_db_tables','insert_terms_data','create_json_files','save_settings','update_json_links'];
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
					trigger_error( 'BetterLinks installer triggered fatal error for callback ' . esc_html( $item ), E_USER_WARNING ); // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_trigger_error
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
		if(get_option($this->action)){
			delete_option($this->action);
			return true;
		}
		return false;
	}
	public function start_dispatch()
	{
		add_option($this->action, true);
	}

	public function create_db_tables()
	{
		require_once ABSPATH . 'wp-admin/includes/upgrade.php';
		$this->createBetterLinksTable();
		$this->createBetterTermsTable();
		$this->createBetterTermsRelationshipsTable();
		$this->createBetterClicksTable();
		// update plugin version
		if (get_option('betterlinks_version') != BETTERLINKS_VERSION) {
			update_option('betterlinks_version', BETTERLINKS_VERSION);
		}
		// update db version
        if (!get_option('betterlinks_db_version')) {
			update_option('betterlinks_db_version', BETTERLINKS_DB_VERSION);
		}
	}

	public function insert_terms_data()
	{
		$query = \BetterLinks\Helper::DB();
		$result = $query
			->table('betterlinks_terms')
			->where('term_slug', '=', 'uncategorized')
			->get();
		if (count($result) === 0) {
			try {
				$data = [
					'term_name' => 'Uncategorized',
					'term_slug' => 'uncategorized',
					'term_type' => 'category',
				];
				$query
					->table('betterlinks_terms')
					->where('term_slug', '!', 'uncategorized')
					->insert($data);
			} catch (\Throwable $th) {
				echo $th->getMessage();
			}
		}
	}

	private function save_settings()
	{
		if (!get_option(BETTERLINKS_LINKS_OPTION_NAME)) {
			$value = [
				'redirect_type' => '307',
				'nofollow' => true,
				'sponsored' => '',
				'track_me' => true,
				'param_forwarding' => '',
				'wildcards' => false
			];
			add_option(BETTERLINKS_LINKS_OPTION_NAME, json_encode($value));
		}
	}

	/**
	 * Create files/directories.
	 */
	private function create_json_files()
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

	private function update_json_links()
	{
		$Cron = new Cron();
		$Cron->write_json_links();
	}
}
