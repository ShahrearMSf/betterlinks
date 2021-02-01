<?php

namespace BetterLinks\Admin;

use BetterLinks\Cron;

class Ajax
{
	public function __construct()
	{
		add_action('wp_ajax_betterlinks/admin/get_prettylinks_data', [$this, 'get_prettylinks_data']);
		add_action('wp_ajax_betterlinks/admin/run_prettylinks_migration', [$this, 'run_prettylinks_migration']);
		add_action('wp_ajax_betterlinks/admin/migration_notice_hide', [$this, 'migration_notice_hide']);
		add_action('wp_ajax_betterlinks/admin/deactive_prettylinks', [$this, 'deactive_prettylinks']);
		add_action('wp_ajax_betterlinks/admin/write_json_links', [$this, 'write_json_links']);
		add_action('wp_ajax_betterlinks/admin/analytics', [$this, 'analytics']);
	}

	public function get_prettylinks_data()
	{
		$query = \BetterLinks\Helper::DB();
		$links = $query->table('prli_links')->get();
		$clicks = $query->table('prli_clicks')->get();
		set_transient('betterlinks_migration_data_prettylinks', ['links' => $links, 'clicks' => $clicks], 60 * 5);
		wp_send_json_success(['links' => $links, 'clicks' => $clicks]);
		wp_die();
	}

	public function run_prettylinks_migration()
	{
		$type = isset($_POST['type']) ? $_POST['type'] : '';
		$type = explode(',', $type);
		$prettylinks = get_transient('betterlinks_migration_data_prettylinks');
		$DB = \BetterLinks\Helper::DB();
		$migrator = new \BetterLinks\Tools\Migration\PTLOneClick($DB);
		$resutls = [];
		foreach ($type as $item) {
			if ($item === 'links') {
				$resutls[] = $migrator->process_links_data($prettylinks[$item]);
			} elseif ($item === 'clicks') {
				$resutls[] = $migrator->process_clicks_data($prettylinks[$item]);
			}
		}
		update_option('betterlink_notice_ptl_migrate', true);
		wp_send_json_success($resutls);
		wp_die();
	}

	public function migration_notice_hide(){
		$type = (isset($_POST['type']) ? $_POST['type'] : '');
		if($type == 'deactive'){
			update_option('betterlink_hide_notice_ptl_deactive', true);
		} else if($type == 'migrate') {
			update_option('betterlink_hide_notice_ptl_migrate', true);
		}
		wp_die();
	}
	public function deactive_prettylinks(){
		$deactivate = deactivate_plugins( 'pretty-link/pretty-link.php' );
		wp_send_json_success($deactivate);
		wp_die();
	}
	public function write_json_links()
	{
		$Cron = new Cron();
		$resutls = $Cron->write_json_links();
		wp_send_json_success($resutls);
		wp_die();
	}
	public function analytics() 
	{
		$Cron = new Cron();
		$resutls = $Cron->analytics();
		wp_send_json_success($resutls);
		wp_die();
	}
}
