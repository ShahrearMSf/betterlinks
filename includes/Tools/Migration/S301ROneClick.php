<?php
namespace BetterLinks\Tools\Migration;

class S301ROneClick extends Base
{
	public $DB;
	public function __construct($DB)
	{
		$this->DB = $DB;
	}
	public function process_links_data($data)
	{
		$links = [];
		$categories = [];
		$author_id = get_current_user_id();
		$catMessage = [];
        $message = [];

        $now = current_time('mysql');
        $now_gmt = current_time('mysql', 1);
        $betterlinks_links = json_decode(get_option('betterlinks_links'));        
		foreach ($data as $request => $destination) {
			if (!\BetterLinks\Helper::link_exists('Simple 301 Redirects - ' . ltrim($request, '/'), ltrim($request, '/'))) {
				$links[] = [
					'link_author' => $author_id,
					'link_date' => $now,
					'link_date_gmt' => $now_gmt,
					'link_title' => 'Simple 301 Redirects - ' . ltrim($request, '/'),
					'link_slug' => \BetterLinks\Helper::make_slug('Simple 301 Redirects - ' . $destination),
					'link_note' => '',
					'link_status' => 'publish',
					'nofollow' => $betterlinks_links->nofollow,
					'sponsored' => $betterlinks_links->sponsored,
					'track_me' => $betterlinks_links->track_me,
					'param_forwarding' => $betterlinks_links->param_forwarding,
					'param_struct' => '',
					'redirect_type' => '301',
					'target_url' => $destination,
					'short_url' => ltrim($request, '/'),
					'link_order' => 0,
					'link_modified' => $now,
					'link_modified_gmt' => $now_gmt,
					'wildcards' 		=> (strpos($request, '/*') !== false ? 1 : 0),
                ];
				$categories[ltrim($request, '/')] = 'simple-301-redirects';
				$message[] = 'Imported Successfully "' . $destination . '"';
			} else {
				$message[] = 'import failed "' . $destination . '" already exists';
			}
		}
		if (count($links) > 0) {
			$this->DB->table('betterlinks')->insert($links);
		}
		if (count($categories) > 0) {
			$catMessage = $this->terms_insert($categories);
		}
		$update_option = $this->save_option();
		return [
            'links' => $message,
			'terms' => $catMessage,
			'wildcard' => ($update_option ? ['Import Successfully Wildcards'] : [])
		];
	}

	public function save_option()
	{
		$wildcard = get_option('301_redirects_wildcard');
		if($wildcard == true){
			$links = json_decode(get_option('betterlinks_links'));
			$links->wildcards = $wildcard;
			return update_option('betterlinks_links', json_encode($links));
		}
		return;
	}
}
