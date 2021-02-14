<?php
namespace BetterLinks\Tools\Migration;

class PTLOneClick extends PTLBase
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
		foreach ($data as $key => $item) {
			// skip csv header row
			if (empty($item->name) || $item->name == 1) {
				continue;
			}

			$slug = \BetterLinks\Helper::make_slug($item->name);
			if (!\BetterLinks\Helper::link_exists($item->name, $item->slug)) {
				$links[] = [
					'link_author' => $author_id,
					'link_date' => $item->created_at,
					'link_date_gmt' => $item->created_at,
					'link_title' => $item->name,
					'link_slug' => $slug,
					'link_note' => '',
					'link_status' => 'publish',
					'nofollow' => isset($item->nofollow) && $item->nofollow == 1 ? $item->nofollow : '',
					'sponsored' => isset($item->sponsored) && $item->sponsored == 1 ? $item->sponsored : '',
					'track_me' => isset($item->track_me) && $item->track_me == 1 ? $item->track_me : '',
					'param_forwarding' => isset($item->param_forwarding) && $item->param_forwarding == 1 ? $item->param_forwarding : '',
					'param_struct' => '',
					'redirect_type' => isset($item->redirect_type) ? $item->redirect_type : '',
					'target_url' => isset($item->url) ? $item->url : '',
					'short_url' => isset($item->slug) ? $item->slug : '',
					'link_order' => 0,
					'link_modified' => isset($item->last_updated_at) ? $item->last_updated_at : '',
					'link_modified_gmt' => isset($item->last_updated_at) ? $item->last_updated_at : '',
				];

				if (isset($item->link_cpt_id) && !empty($item->link_cpt_id)) {
					$term = get_the_terms($item->link_cpt_id, 'pretty-link-category');
					$term = !empty($term) ? current($term) : $term;
				}
				if (!empty($term->slug)) {
					$categories[$item->slug] = $term->slug;
				} else {
					$categories[$item->slug] = 'uncategorized';
				}

				$message[] = 'import succesfully "' . $item->name . '"';
			} else {
				$message[] = 'import failed "' . $item->name . '" already exists';
			}
		}
		if (count($links) > 0) {
			$this->DB->table('betterlinks')->insert($links);
		}

		if (count($categories) > 0) {
			$catMessage = $this->terms_insert($categories);
		}
		return [
			'links' => $message,
			'terms' => $catMessage,
		];
	}

	public function process_clicks_data($data)
	{
		$clicks = [];
		$message = [];
		foreach ($data as $key => $item) {
			// skip csv header row
			if (!isset($item->uri)) {
				continue;
			}

			$link = $this->DB
				->table('betterlinks')
				->where('short_url', '=', \ltrim($item->uri, '/'))
				->get();
			if (!empty($link)) {
				$clicks[] = [
					'link_id' => $link[0]->ID,
					'ip' => $item->ip,
					'browser' => $item->browser,
					'os' => $item->os,
					'referer' => $item->referer,
					'host' => $item->host,
					'uri' => $item->uri,
					'click_count' => '',
					'visitor_id' => $item->vuid,
					'click_order' => '',
					'created_at' => $item->created_at,
					'created_at_gmt' => $item->created_at,
				];
				$message[] = 'import succesfully "' . $item->uri . '"';
			}
		}
		if (count($clicks) > 0) {
			$this->DB->table('betterlinks_clicks')->insert($clicks);
		}
		return [
			'clicks' => $message,
		];
	}
}
