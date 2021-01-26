<?php
namespace BetterLinks\Tools\Migration;

class PrettyLinks {
	private $DB;
	public function __construct($DB)
	{
		$this->DB = $DB;
	}
    public function process_data($data){
		$links = [];
		$categories = [];
		$author_id = get_current_user_id();
		$catMessage = [];
        $message = [];
		foreach($data as $key => $item) {
			/*
			Link Header
			(
				[0] => id [1] => url [2] => slug [3] => name [4] => redirect_type [5] => track_me
				[6] => nofollow [7] => sponsored [8] => param_forwarding [9] => google_tracking
				[10] => delay [11] => created_at [12] => last_updated_at [13] => link_categories
				[14] => link_tags [15] => keywords
			)
			*/
			// skip csv header row
			if($key === 0 || empty($item[3])) {
				continue;
			}

			$slug = \BetterLinks\Helper::make_slug($item[3]);
			if( ! \BetterLinks\Helper::link_exists($item[3], $item[2]) ){
				$links[] = [
					'link_author' => $author_id,
					'link_date' => $item[11],
					'link_date_gmt' => $item[11],
					'link_title' => $item[3],
					'link_slug' => $slug,
					'link_note' => '',
					'link_status' => 'publish',
					'nofollow' => (isset($item[6]) ? $item[6] : ''),
					'sponsored' => (isset($item[7]) ? $item[7] : ''),
					'track_me' => (isset($item[5]) ? $item[5] : ''),
					'param_forwarding' => (isset($item[8]) ? $item[8] : ''),
					'param_struct' => '',
					'redirect_type' => (isset($item[4]) ? $item[4] : ''),
					'target_url' => (isset($item[1]) ? $item[1] : ''),
					'short_url' => (isset($item[2]) ? $item[2] : ''),
					'link_order' => 0,
					'link_modified' => (isset($item[12]) ? $item[12] : ''),
					'link_modified_gmt' => (isset($item[12]) ? $item[12] : ''),
				];
				if(isset($item[13]) && !empty($item[13])){
					$categories[$slug] = $item[13];
				}

                $message[] = 'import succesfully "' . $item[3] . '"';
			} else {
                $message[] = 'import failed "' . $item[3] . '" already exists';
            }
		}
		if(count($links) > 0){
            $this->DB->table('betterlinks')->insert($links);
		}

		if(count($categories) > 0){
			$catMessage = $this->terms_insert($categories);
		}
        return [
			'links' => $message,
			'terms' => $catMessage
		];
	}

	public function terms_insert($categories){
		$termsList = [];
		$message = [];
		foreach($categories as $slug => $catName){
			if( ! \BetterLinks\Helper::term_exists($catName) ){
				$termsList[] = [
					'term_name' => $catName,
					'term_slug' => \BetterLinks\Helper::make_slug($catName),
					'term_type' => 'category'
				];
				$message[] = 'import succesfully "' . $catName . '"';
			} else {
				$message[] = 'import failed "' . $catName . '" already exists';
			}
		}
		$this->DB->table('betterlinks_terms')->insert($termsList);
		$this->terms_relationship_insert($categories);
		return $message;
	}

	public function terms_relationship_insert($categories){
		$termRelationList = [];
		foreach($categories as $slug => $catName){
			$link = $this->DB->table('betterlinks')->where('link_slug', '=', $slug)->get();
			$term = $this->DB->table('betterlinks_terms')->where('term_name', '=', $catName)->get();
			$termRelationList[] = [
				'term_id' => $term[0]->ID,
				'link_id' => $link[0]->ID
			];
		}
		if(count($termRelationList) > 0){
			$this->DB->table('betterlinks_terms_relationships')->insert($termRelationList);
		}
	}
}
