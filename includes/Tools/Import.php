<?php
namespace BetterLinks\Tools;

use Apfelbox\FileDownload\FileDownload;


class Import 
{
    private $DB;
	public function __construct()
	{
		add_action( 'admin_init', array($this, 'import_data') );
	}
	public function import_data(){
		$page = (isset($_GET['page']) ? $_GET['page'] : '');
        $import = (isset($_GET['import']) ? $_GET['import'] : false);
        if( $page === 'betterlinks-settings' && $import == true){
			$this->DB = \BetterLinks\Helper::DB();
			if(isset($_FILES['upload_file'])) {
				$fileContent = json_decode(file_get_contents($_FILES['upload_file']['tmp_name']), true);
				if(!empty($fileContent)){
					$this->process_data($fileContent);
				}
			}
        }
	}
	public function process_data($type) {
		if(isset($type['links']) && is_array($type['links']) && count($type['links']) > 0){
			$this->links_data_insert($type['links']);
		}
		if(isset($type['terms']) && is_array($type['terms']) && count($type['terms']) > 0){
			$this->terms_data_insert($type['terms']);
		}
		if(isset($type['terms_relationships']) && is_array($type['terms_relationships']) && count($type['terms_relationships']) > 0){
			$this->terms_relationships_data_insert($type['terms_relationships']);
		}
		if(isset($type['clicks']) && is_array($type['clicks']) && count($type['clicks']) > 0){
			$this->clicks_data_insert($type['clicks']);
		}
	}

	public function links_data_insert($data){
		return $this->DB->table('betterlinks')->insert($data);
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
	
}
