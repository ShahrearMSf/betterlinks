<?php
namespace BetterLinks;
class Installer extends \WP_Background_Process
{
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
			$this->$item();
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
		$action = get_option($this->action);
		if($action){
			delete_option($this->action);
			return $action;
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

	public function createBetterLinksTable()
	{
		$table_name = $this->wpdb->prefix . 'betterlinks';
		$sql = "CREATE TABLE IF NOT EXISTS $table_name (
            ID bigint(20) unsigned NOT NULL auto_increment,
            link_author bigint(20) unsigned NOT NULL default '0',
            link_date datetime NOT NULL default '0000-00-00 00:00:00',
            link_date_gmt datetime NOT NULL default '0000-00-00 00:00:00',
            link_title text NOT NULL,
            link_slug varchar(200) NOT NULL default '',
            link_note text NOT NULL,
            link_status varchar(20) NOT NULL default 'publish',
            nofollow varchar(10),
            sponsored varchar(10),
            track_me varchar(10),
            param_forwarding varchar(10),
            param_struct varchar(255) default NULL,
            redirect_type varchar(255) default '307',
            target_url varchar(255) default NULL,
            short_url varchar(255) default NULL,
            link_order tinyint(11) default 0,
            link_modified datetime NOT NULL default '0000-00-00 00:00:00',
            link_modified_gmt datetime NOT NULL default '0000-00-00 00:00:00',
			wildcards boolean NOT NULL default 0,
			expire text default NULL,
            PRIMARY KEY  (ID),
            KEY link_slug (link_slug(191)),
            KEY type_status_date (link_status,link_date,ID),
            KEY link_author (link_author),
            KEY link_order (link_order)
        ) $this->charset_collate;";
		dbDelta($sql);
	}

	public function createBetterTermsTable()
	{
		$table_name = $this->wpdb->prefix . 'betterlinks_terms';
		$sql = "CREATE TABLE IF NOT EXISTS $table_name (
            ID bigint(20) unsigned NOT NULL auto_increment,
            term_name text NOT NULL,
            term_slug varchar(200) NOT NULL default '',
            term_type varchar(15) NOT NULL,
            term_order tinyint(11) default 0,
            PRIMARY KEY  (ID),
            KEY term_slug (term_slug(191)),
            key term_type (term_type),
            key term_order (term_order)
        ) $this->charset_collate;";
		dbDelta($sql);
	}

	public function createBetterTermsRelationshipsTable()
	{
		$table_name = $this->wpdb->prefix . 'betterlinks_terms_relationships';
		$sql = "CREATE TABLE IF NOT EXISTS $table_name (
            ID bigint(20) unsigned NOT NULL auto_increment,
            term_id bigint(20) default 0,
            link_id bigint(20) default 0,
            PRIMARY KEY  (ID),
            KEY term_id (term_id),
            key link_id (link_id)
        ) $this->charset_collate;";
		dbDelta($sql);
	}

	public function createBetterClicksTable()
	{
		$table_name = $this->wpdb->prefix . 'betterlinks_clicks';
		$sql = "CREATE TABLE IF NOT EXISTS $table_name (
            ID bigint(20) unsigned NOT NULL auto_increment,
            link_id bigint(20) NOT NULL,
            ip 	varchar(255) NULL,
            browser varchar(255) NULL,
            os varchar(255) NULL,
            referer varchar(255) NULL,
            host varchar(255) NULL,
            uri varchar(255) NULL,
            click_count tinyint(4) NOT NULL default 0, 
            visitor_id varchar(25) NULL,
            click_order tinyint(11) default 0,
            created_at datetime NOT NULL default '0000-00-00 00:00:00',
            created_at_gmt datetime NOT NULL default '0000-00-00 00:00:00',
            PRIMARY KEY  (ID),
            KEY ip (ip),
            key link_id (link_id),
            key click_order (click_order)
        ) $this->charset_collate;";
		dbDelta($sql);
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
