<?php
namespace BetterLinks;
class Installer
{
	public $wpdb;
	public $charset_collate;
	public function __construct()
	{
		global $wpdb;
		$this->wpdb = $wpdb;
		$this->charset_collate = $wpdb->get_charset_collate();
		$this->run_create_tables();
		$this->insert_terms();
		$this->create_files();
		$this->set_default_option();
		$this->create_cron_jobs();
	}

	public function run_create_tables()
	{
		require_once ABSPATH . 'wp-admin/includes/upgrade.php';
		$this->createBetterLinksTable();
		$this->createBetterTermsTable();
		$this->createBetterTermsRelationshipsTable();
		$this->createBetterClicksTable();

		if (get_option('betterlinks_version') != BETTERLINKS_VERSION) {
			update_option('betterlinks_version', BETTERLINKS_VERSION);
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
	public function insert_terms()
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

	private function set_default_option()
	{
		if (!get_option(BETTERLINKS_LINKS_OPTION_NAME)) {
			$value = [
				'redirect_type' => '307',
				'nofollow' => true,
				'sponsored' => '',
				'track_me' => true,
				'param_forwarding' => '',
			];
			add_option(BETTERLINKS_LINKS_OPTION_NAME, json_encode($value));
		}
	}

	/**
	 * Create files/directories.
	 */
	private function create_files()
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

	/**
	 * Create Cron Jobs
	 */
	private function create_cron_jobs()
	{
		Helper::create_cron_jobs_for_json_links();
	}
}
