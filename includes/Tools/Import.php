<?php
namespace BetterLinks\Tools;

class Import
{
	private $DB;
	private $term_IDs = [];
	public function __construct()
	{
		add_action('admin_init', [$this, 'import_data']);
		add_action('wp_ajax_betterlinks/tools/get_import_info', [$this, 'get_import_info']);
	}
	public function import_data()
	{
		session_start();
		$page = isset($_GET['page']) ? $_GET['page'] : '';
		$import = isset($_GET['import']) ? $_GET['import'] : false;
		if ($page === 'betterlinks-settings' && $import == true) {
			$this->DB = \BetterLinks\Helper::DB();
			if (isset($_FILES['upload_file'])) {
				if ($_POST['mode'] == 'default') {
					$fileContent = json_decode(file_get_contents($_FILES['upload_file']['tmp_name']), true);
					if (!empty($fileContent)) {
						$results = $this->process_data($fileContent);
						$_SESSION['betterlinks_import_info'] = json_encode($results);
					}
				} elseif ($_POST['mode'] == 'prettylinks') {
					$csv = array_map('str_getcsv', file($_FILES['upload_file']['tmp_name'], FILE_SKIP_EMPTY_LINES));
					if (is_array($csv) && count($csv) > 0) {
						$PrettyLinks = new Migration\PrettyLinks($this->DB);
						if (isset($csv[0][0]) && $csv[0][0] === 'Browser') {
							// import clicks data
							$results = $PrettyLinks->process_clicks_data($csv);
						} else {
							// import link data
							$results = $PrettyLinks->process_links_data($csv);
						}
						$_SESSION['betterlinks_import_info'] = json_encode($results);
					}
				}
			}
		}
	}
	public function process_data($type)
	{
		$message = [];
		if (isset($type['links']) && is_array($type['links']) && count($type['links']) > 0) {
			$message['links'] = $this->links_data_insert($type['links']);
		}
		if (isset($type['terms']) && is_array($type['terms']) && count($type['terms']) > 0) {
			$message['terms'] = $this->terms_data_insert($type['terms']);
		}
		if (isset($type['terms_relationships']) && is_array($type['terms_relationships']) && count($type['terms_relationships']) > 0) {
			$message['terms_relationships'] = $this->terms_relationships_data_insert($type['terms_relationships']);
		}
		if (isset($type['clicks']) && is_array($type['clicks']) && count($type['clicks']) > 0) {
			$message['clicks'] = $this->clicks_data_insert($type['clicks']);
		}
		return $message;
	}

	public function links_data_insert($data)
	{
		$links = [];
		$linkImportMessage = [];
		foreach ($data as $item) {
			if (!\BetterLinks\Helper::link_exists($item['term_name'], $item['short_url'])) {
				$links[] = $item;
				$linkImportMessage[] = 'import succesfully "' . $item['link_title'] . '"';
			} else {
				$linkImportMessage[] = 'import failed "' . $item['link_title'] . '" already exists';
			}
		}
		if (count($links) > 0) {
			$this->DB->table('betterlinks')->insert($links);
		}
		return $linkImportMessage;
	}

	public function terms_data_insert($data)
	{
		$terms = [];
		$message = [];
		foreach ($data as $item) {
			if (!\BetterLinks\Helper::term_exists($item['term_slug'], $item['term_type'])) {
				$terms[] = $item;
				$message[] = 'import succesfully "' . $item['term_name'] . '"';
			} else {
				$this->term_IDs[] = $item['ID'];
				$message[] = 'import failed "' . $item['term_name'] . '" already exists';
			}
		}
		if (count($terms) > 0) {
			$this->DB->table('betterlinks_terms')->insert($terms);
		}
		return $message;
	}

	public function terms_relationships_data_insert($data)
	{
		$terms = [];
		$message = [];
		foreach ($data as $item) {
			if (in_array($item['ID'], $this->term_IDs)) {
				continue;
			} else {
				if (!\BetterLinks\Helper::term_exists($item['term_slug'], $item['term_type'])) {
					$terms[] = $item;
					$message[] = 'import succesfully "' . $item['term_name'] . '"';
				} else {
					$message[] = 'import failed "' . $item['term_name'] . '" already exists';
				}
			}
		}
		if (count($terms) > 0) {
			$this->DB->table('betterlinks_terms_relationships')->insert($terms);
		}
		return $message;
	}

	public function clicks_data_insert($data)
	{
		$clicks = [];
		$message = [];
		foreach ($data as $item) {
			if (!\BetterLinks\Helper::click_exists($item['ID'])) {
				$clicks[] = $item;
				$message[] = 'import succesfully "' . $item['uri'] . '"';
			} else {
				$message[] = 'import failed "' . $item['uri'] . '" already exists';
			}
		}
		if (count($clicks) > 0) {
			$this->DB->table('betterlinks_clicks')->insert($clicks);
		}
		return $message;
	}

	public function get_import_info()
	{
		$results = json_encode([]);
		if (isset($_SESSION['betterlinks_import_info'])) {
			\BetterLinks\Helper::create_cron_jobs_for_json_links();
			$results = $_SESSION['betterlinks_import_info'];
			unset($_SESSION['betterlinks_import_info']);
		}
		wp_send_json_success($results);
		wp_die();
	}
}
