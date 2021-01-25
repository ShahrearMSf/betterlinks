<?php
namespace BetterLinks\Tools\Migration;

class PrettyLinks {
    public function process_data($data){
		$links = [];
        $author_id = get_current_user_id();
        $message = [];
		foreach($data as $item) {
			$slug = \BetterLinks\Helper::make_slug($item['name']);
			if( ! \BetterLinks\Helper::link_exists($item['name'], $item['slug']) ){
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
                $message[] = 'import succesfully "' . $item['name'] . '"';
			} else {
                $message[] = 'import failed "' . $item['name'] . '" already exists';
            }
		}
		if(count($links) > 0){
            $this->DB->table('betterlinks')->insert($links);
        }
        return $message;
	}
}
