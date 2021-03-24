<?php

namespace BetterLinks\Admin;

use BetterLinks\Cron;

class Ajax
{
	public function __construct()
	{
		add_action('wp_ajax_betterlinks/admin/get_prettylinks_data', [$this, 'get_prettylinks_data']);
		add_action('wp_ajax_betterlinks/admin/run_prettylinks_migration', [$this, 'run_prettylinks_migration']);
		add_action('wp_ajax_betterlinks/admin/migration_prettylinks_notice_hide', [$this, 'migration_prettylinks_notice_hide']);
		add_action('wp_ajax_betterlinks/admin/deactive_prettylinks', [$this, 'deactive_prettylinks']);
		add_action('wp_ajax_betterlinks/admin/write_json_links', [$this, 'write_json_links']);
		add_action('wp_ajax_betterlinks/admin/write_json_clicks', [$this, 'write_json_clicks']);
		add_action('wp_ajax_betterlinks/admin/analytics', [$this, 'analytics']);
		add_action('wp_ajax_betterlinks/admin/short_url_unique_checker', [$this, 'short_url_unique_checker']);
		add_action('wp_ajax_betterlinks/admin/cat_slug_unique_checker', [$this, 'cat_slug_unique_checker']);
		add_action('wp_ajax_betterlinks/admin/get_simple301redirects_data', [$this, 'get_simple301redirects_data']);
		add_action('wp_ajax_betterlinks/admin/run_simple301redirects_migration', [$this, 'run_simple301redirects_migration']);
		add_action('wp_ajax_betterlinks/admin/migration_simple301redirects_notice_hide', [$this, 'migration_simple301redirects_notice_hide']);
		add_action('wp_ajax_betterlinks/admin/deactive_simple301redirects', [$this, 'deactive_simple301redirects']);
		add_action('wp_ajax_betterlinks/admin/search_clicks_data', [$this, 'search_clicks_data']);
	}

	public function get_prettylinks_data()
	{
		check_ajax_referer('wp_rest', 'security');
		$query = \BetterLinks\Helper::DB();
		$links = $query->table('prli_links')->get();
		$clicks = $query->table('prli_clicks')->get();
		set_transient('betterlinks_migration_data_prettylinks', ['links' => $links, 'clicks' => $clicks], 60 * 5);
		wp_send_json_success(['links' => $links, 'clicks' => $clicks]);
		wp_die();
	}

	public function run_prettylinks_migration()
	{
		check_ajax_referer('wp_rest', 'security');
		try {
			$type = isset($_POST['type']) ? $_POST['type'] : '';
			$type = explode(',', $type);
			$prettylinks = get_transient('betterlinks_migration_data_prettylinks');
			$DB = \BetterLinks\Helper::DB();
			$migrator = new \BetterLinks\Tools\Migration\PTLOneClick($DB);
			$resutls = [];
			foreach ($type as $item) {
				if (isset($prettylinks[$item]) && count($prettylinks[$item]) > 0) {
					if ($item === 'links') {
						$resutls[] = $migrator->process_links_data($prettylinks[$item]);
					} elseif ($item === 'clicks') {
						$resutls[] = $migrator->process_clicks_data($prettylinks[$item]);
					}
				}
			}
			\BetterLinks\Helper::create_cron_jobs_for_json_links();
			\BetterLinks\Helper::clear_query_cache();
			\BetterLinks\Helper::create_cron_jobs_for_analytics();
			update_option('betterlink_notice_ptl_migrate', true);
			wp_send_json_success($resutls);
			wp_die();
		} catch (\Throwable $th) {
			wp_send_json_error($th->getMessage());
			wp_die();
		}
	}

	public function migration_prettylinks_notice_hide()
	{
		check_ajax_referer('wp_rest', 'security');
		$type = isset($_POST['type']) ? $_POST['type'] : '';
		if ($type == 'deactive') {
			update_option('betterlink_hide_notice_ptl_deactive', true);
		} elseif ($type == 'migrate') {
			update_option('betterlink_hide_notice_ptl_migrate', true);
		}
		wp_die();
	}
	public function deactive_prettylinks()
	{
		check_ajax_referer('wp_rest', 'security');
		$deactivate = deactivate_plugins('pretty-link/pretty-link.php');
		wp_send_json_success($deactivate);
		wp_die();
	}
	public function write_json_links()
	{
		check_ajax_referer('wp_rest', 'security');
		$Cron = new Cron();
		$resutls = $Cron->write_json_links();
		wp_send_json_success($resutls);
		wp_die();
	}
	public function write_json_clicks()
	{
		check_ajax_referer('wp_rest', 'security');
		if (!BETTERLINKS_EXISTS_CLICKS_JSON) {
			$emptyContent = '{}';
			$file_handle = @fopen(trailingslashit(BETTERLINKS_UPLOAD_DIR_PATH) . 'clicks.json', 'wb');
			if ($file_handle) {
				fwrite($file_handle, $emptyContent);
				fclose($file_handle);
			}
			wp_send_json_success(true);
			wp_die();
		}
		wp_send_json_error(false);
		wp_die();
	}
	public function analytics()
	{
		check_ajax_referer('wp_rest', 'security');
		$Cron = new Cron();
		$resutls = $Cron->analytics();
		wp_send_json_success($resutls);
		wp_die();
	}
	public function short_url_unique_checker()
	{
		check_ajax_referer('wp_rest', 'security');
		$ID = isset($_POST['ID']) ? $_POST['ID'] : '';
		$slug = isset($_POST['slug']) ? $_POST['slug'] : '';
		$alreadyExists = false;
		$resutls = [];
		if (!empty($slug)) {
			$query = \BetterLinks\Helper::DB()
				->table('betterlinks')
				->where('short_url', '=', $slug);
			$resutls = $query->get();
			if (count($resutls) > 0) {
				$alreadyExists = true;
				$resutls = current($resutls);
				if ($resutls->ID == $ID) {
					$alreadyExists = false;
				}
			}
		}
		wp_send_json_success($alreadyExists);
		wp_die();
	}
	public function cat_slug_unique_checker()
	{
		check_ajax_referer('wp_rest', 'security');
		$ID = isset($_POST['ID']) ? $_POST['ID'] : '';
		$slug = isset($_POST['slug']) ? $_POST['slug'] : '';
		$alreadyExists = false;
		$resutls = [];
		if (!empty($slug)) {
			$query = \BetterLinks\Helper::DB()
				->table('betterlinks_terms')
				->where('term_slug', '=', $slug);
			$resutls = $query->get();
			if (count($resutls) > 0) {
				$alreadyExists = true;
				$resutls = current($resutls);
				if ($resutls->ID == $ID) {
					$alreadyExists = false;
				}
			}
		}
		wp_send_json_success($alreadyExists);
		wp_die();
	}
	public function get_simple301redirects_data()
	{
		check_ajax_referer('wp_rest', 'security');
		$links = get_option('301_redirects');
		wp_send_json_success($links);
		wp_die();
	}
	public function run_simple301redirects_migration()
	{
		check_ajax_referer('wp_rest', 'security');
		try {
			$simple_301_redirects = get_option('301_redirects');
			$DB = \BetterLinks\Helper::DB();
			$migrator = new \BetterLinks\Tools\Migration\S301ROneClick($DB);
			$resutls = $migrator->process_links_data($simple_301_redirects);
			\BetterLinks\Helper::create_cron_jobs_for_json_links();
			\BetterLinks\Helper::clear_query_cache();
			update_option('betterlink_notice_s301r_migrate', true);
			wp_send_json_success($resutls);
			wp_die();
		} catch (\Throwable $th) {
			wp_send_json_error($th->getMessage());
			wp_die();
		}
	}
	public function migration_simple301redirects_notice_hide()
	{
		check_ajax_referer('wp_rest', 'security');
		$type = isset($_POST['type']) ? $_POST['type'] : '';
		if ($type == 'deactive') {
			update_option('betterlink_hide_notice_s301r_deactive', true);
		} elseif ($type == 'migrate') {
			update_option('betterlink_notice_s301r_migrate', true);
		}
		wp_die();
	}
	public function deactive_simple301redirects()
	{
		check_ajax_referer('wp_rest', 'security');
		$deactivate = deactivate_plugins('simple-301-redirects/wp-simple-301-redirects.php');
		wp_send_json_success($deactivate);
		wp_die();
	}
	public function search_clicks_data()
	{
		check_ajax_referer('wp_rest', 'security');
		$title = isset($_GET['title']) ? $_GET['title'] : '';
		global $wpdb;
		$prefix = $wpdb->prefix;
		$query = \BetterLinks\Helper::DB();
		$results = $query
			->query(
				"SELECT CLICKS.ID as 
        click_ID, link_id, browser, created_at, referer, short_url, target_url, ip, {$prefix}betterlinks.link_title,
        (select count(id) from {$prefix}betterlinks_clicks where CLICKS.ip = {$prefix}betterlinks_clicks.ip group by ip) as IPCOUNT
		from {$prefix}betterlinks_clicks as CLICKS left join {$prefix}betterlinks on {$prefix}betterlinks.id = CLICKS.link_id WHERE {$prefix}betterlinks.link_title LIKE '%$title%'  group by CLICKS.id ORDER BY CLICKS.created_at DESC"
			)
			->get();
		
		wp_send_json_success($results);
		wp_die();
	}
}
