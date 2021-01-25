<?php
namespace BetterLinks\Tools;

class Import 
{
    private $DB;
	public function __construct()
	{
		add_action( 'admin_init', array($this, 'import_data') );
		add_action( 'wp_ajax_betterlinks/tools/get_import_info', array($this, 'get_import_info') );
	}
	public function import_data(){
		session_start();
		$page = (isset($_GET['page']) ? $_GET['page'] : '');
		$import = (isset($_GET['import']) ? $_GET['import'] : false);
        if( $page === 'betterlinks-settings' && $import == true){
			$this->DB = \BetterLinks\Helper::DB();
			if(isset($_FILES['upload_file'])) {
				if($_POST['mode'] == 'default'){
					$fileContent = json_decode(file_get_contents($_FILES['upload_file']['tmp_name']), true);
					if(!empty($fileContent)){
						$results = $this->process_default_data($fileContent);
						error_log(print_r($results, true));
						$_SESSION['betterlinks_import_info'] = $results;
					}
				} else if($_POST['mode'] == 'prettylinks') {
					$csv = array_map("str_getcsv", file($_FILES['upload_file']['tmp_name'],FILE_SKIP_EMPTY_LINES));
					$data = $this->csv_to_associative_arrays($csv);
					if(is_array($data) && count($data) > 0){
						$this->process_prettylinks_data($data);
					}
				}
			}
        }
	}
	public function process_default_data($type) {
		$message = [];
		if(isset($type['links']) && is_array($type['links']) && count($type['links']) > 0){
			$message['links'] = $this->links_data_insert($type['links']);
		}
		// if(isset($type['terms']) && is_array($type['terms']) && count($type['terms']) > 0){
		// 	$this->terms_data_insert($type['terms']);
		// }
		// if(isset($type['terms_relationships']) && is_array($type['terms_relationships']) && count($type['terms_relationships']) > 0){
		// 	$this->terms_relationships_data_insert($type['terms_relationships']);
		// }
		// if(isset($type['clicks']) && is_array($type['clicks']) && count($type['clicks']) > 0){
		// 	$this->clicks_data_insert($type['clicks']);
		// }
		return $message;
	}

	public function links_data_insert($data){
		$links = [];
		$linkImportMessage = [];
		foreach($data as $item) {
			if( ! $this->link_exists($item['link_title'], $item['short_url']) ){
				$links[] = $item;
				$linkImportMessage[] = 'import succesfully "' . $item['link_title'] . '"';
			} else {
				$linkImportMessage[] = 'import failed "' . $item['link_title'] . '" already exists';
			}
		}
		if(count($links) > 0){
			$this->DB->table('betterlinks')->insert($links);
		}
		return $linkImportMessage;
	}

	public function terms_data_insert($data){
		return $this->DB->table('betterlinks_terms')->insert($data);
	}
	
	public function terms_relationships_data_insert($data){
		return $this->DB->table('betterlinks_terms_relationships')->insert($data);
	}

	public function clicks_data_insert($data){
		return $this->DB->table('betterlinks_clicks')->insert($data);
	}

	public function csv_to_associative_arrays($csv){
		$keys = array_shift($csv);
		foreach ($csv as $i=>$row) {
			$csv[$i] = array_combine($keys, $row);
		}
		return $csv;
	}

	public function link_exists($title, $slug = ''){
		global $wpdb;

		$link_title   = wp_unslash( sanitize_post_field( 'link_title', $title, 0, 'db' ) );
		$short_url = wp_unslash( sanitize_post_field( 'short_url', $slug, 0, 'db' ) );
		$betterlinks = $wpdb->prefix . 'betterlinks';
		$query = "SELECT link_title, short_url FROM  $betterlinks WHERE ";
		$args  = array();

		if ( ! empty( $title ) ) {
			$query .= ' link_title = %s';
			$args[] = $link_title;
		}

		if ( ! empty( $slug ) ) {
			$query .= ' AND short_url = %s';
			$args[] = $short_url;
		}

		if ( ! empty( $args ) ) {
			$results =  $wpdb->get_var( $wpdb->prepare( $query, $args ) );
			if(!empty($results)){
				return true;
			}
			return;
		}
		return;
	}

	public function process_prettylinks_data($data){
		$links = [];
		$author_id = get_current_user_id();
		foreach($data as $item) {
			$slug = \BetterLinks\Helper::make_slug($item['name']);
			if( ! $this->link_exists($item['name'], $item['slug']) ){
				$links[] = [
					'link_author' => $author_id,
					'link_date' => $item['created_at'],
					'link_date_gmt' => $item['created_at'],
					'link_title' => $item['name'],
					'link_slug' => $slug,
					'link_note' => (isset($item['description']) ? $item['description'] : ''),
					'link_status' => (isset($item['link_status']) ? $item['link_status'] : 'publish'),
					'nofollow' => (isset($item['nofollow']) ? $item['nofollow'] : ''),
					'sponsored' => (isset($item['sponsored']) ? $item['sponsored'] : ''),
					'track_me' => (isset($item['track_me']) ? $item['track_me'] : ''),
					'param_forwarding' => (isset($item['param_forwarding']) ? $item['param_forwarding'] : ''),
					'param_struct' => (isset($item['param_struct']) ? $item['param_struct'] : ''),
					'redirect_type' => (isset($item['redirect_type']) ? $item['redirect_type'] : ''),
					'target_url' => (isset($item['url']) ? $item['url'] : ''),
					'short_url' => (isset($item['slug']) ? $item['slug'] : ''),
					'link_order' => 0,
					'link_modified' => (isset($item['updated_at']) ? $item['updated_at'] : ''),
					'link_modified_gmt' => (isset($item['updated_at']) ? $item['updated_at'] : ''),
				];
			}
		}
		if(count($links) > 0){
			$ids = $this->links_data_insert($links);
		}
	}

	public function get_import_info(){
		if(isset($_SESSION['betterlinks_import_info'])){
			echo $_SESSION['betterlinks_import_info'];
		} else {
			echo 'No information is saved';
		}
	}
}
