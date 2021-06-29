<?php
namespace BetterLinks\Tools;

class Import
{
	private $DB;
	private $term_IDs = [];
	private $link_IDs = [];
	public function __construct()
	{
		add_action('admin_init', [$this, 'import_data']);
		add_action('wp_ajax_betterlinks/tools/get_import_info', [$this, 'get_import_info']);
	}
	public function import_data()
	{
		$page = isset($_GET['page']) ? $_GET['page'] : '';
		$import = isset($_GET['import']) ? $_GET['import'] : false;
		if ($page === 'betterlinks-settings' && $import == true) {
			\BetterLinks\Helper::clear_query_cache();
			$this->DB = \BetterLinks\Helper::DB();
			if (!empty($_FILES['upload_file']['tmp_name'])) {
				if ($_POST['mode'] == 'default') {
					$fileContent = json_decode(file_get_contents($_FILES['upload_file']['tmp_name']), true);
					if (!empty($fileContent)) {
						$results = $this->process_data($fileContent);
						set_transient( 'betterlinks_import_info', json_encode($results), 60 * 60 * 5 );
					}
				} elseif ($_POST['mode'] == 'prettylinks') {
					$csv = array_map('str_getcsv', file($_FILES['upload_file']['tmp_name'], FILE_SKIP_EMPTY_LINES));
					if (is_array($csv) && count($csv) > 0) {
						$PrettyLinks = new Migration\PTLImportCSV($this->DB);
						if (isset($csv[0][0]) && $csv[0][0] === 'Browser') {
							// import clicks data
							$results = $PrettyLinks->process_clicks_data($csv);
						} else {
							// import link data
							$results = $PrettyLinks->process_links_data($csv);
						}
						set_transient( 'betterlinks_import_info', json_encode($results), 60 * 60 * 5 );
					}
				} elseif ($_POST['mode'] == 'simple301redirects') {
					$fileContent = json_decode(file_get_contents($_FILES['upload_file']['tmp_name']), true);
					$migrator = new \BetterLinks\Tools\Migration\S301ROneClick($this->DB);
					$results = $migrator->process_links_data(array_reverse($fileContent));
					if (!empty($results)) {
						set_transient( 'betterlinks_import_info', json_encode($results), 60 * 60 * 5 );
					}
				}
			}
			\BetterLinks\Helper::create_cron_jobs_for_json_links();
			\BetterLinks\Helper::create_cron_jobs_for_analytics();
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
		return apply_filters('betterlinks/tools/import_process_data', $message, $type, $this->link_IDs);
	}

	public function links_data_insert($data)
	{
		$linkImportMessage = [];
		foreach ($data as $item) {
			if (!empty($item['link_title']) && !empty($item['short_url'])) {
				$oldID = $item['ID'];
				unset($item['ID']);
				$betterlinks = $this->DB->table('betterlinks')->where('short_url', '=', $item['short_url'])->get();
				if(is_array($betterlinks) && count($betterlinks) > 0){
					$this->link_IDs[$oldID] = $oldID;
					$linkImportMessage[] = 'import failed "' . $item['link_title'] . '" already exists';
				} else {
					$results = $this->DB->table('betterlinks')->insert([$item]);
					$this->link_IDs[$oldID] = current($results);
					$linkImportMessage[] = 'Imported Successfully "' . $item['link_title'] . '"';
				}
			}
		}
		return $linkImportMessage;
	}

	public function terms_data_insert($data)
	{
		$message = [];
		foreach ($data as $item) {
			$terms = $this->DB->table('betterlinks_terms')->where('term_slug', '=', $item['term_slug'])->get();
			if (is_array($terms) && count($terms) > 0) {
				$this->term_IDs[] = current($terms)->ID;
				$message[] = 'import failed "' . $item['term_name'] . '" already exists';
			} else {
				$insertedTerms = $this->DB->table('betterlinks_terms')->insert([$item]);
				$this->term_IDs[] = current($insertedTerms);
				$message[] = 'Imported Successfully "' . $item['term_name'] . '"';
			}
		}
		return $message;
	}

	public function terms_relationships_data_insert($data)
	{
		$terms = [];
		$message = [];
		foreach ($data as $item) {
			if(isset($this->link_IDs[$item['link_id']])){
				$item['link_id'] = $this->link_IDs[$item['link_id']];
			}
			if(isset($this->term_IDs[$item['term_id']])){
				$item['term_id'] = $this->term_IDs[$item['term_id']];
			}
			$terms[] = $item;
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
				unset($item['ID']);
				if(isset($this->link_IDs[$item['link_id']])){
					$item['link_id'] = $this->link_IDs[$item['link_id']];
				}
				
				$clicks[] = $item;
				$message[] = 'Imported Successfully "' . $item['uri'] . '"';
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
		check_ajax_referer('wp_rest', 'security');
		$results = json_encode([]);
		if (get_transient('betterlinks_import_info')) {
			\BetterLinks\Helper::clear_query_cache();
			\BetterLinks\Helper::create_cron_jobs_for_json_links();
			$results = get_transient('betterlinks_import_info');
			delete_transient('betterlinks_import_info');
		}
		wp_send_json_success($results);
		wp_die();
	}
}
