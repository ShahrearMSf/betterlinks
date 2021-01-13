<?php
namespace BetterLinks;

class Cron
{
	public function __construct()
	{
		add_action('betterlinks/write_json_links', [$this, 'write_json_links']);
	}
	public function write_json_links()
	{
		global $wpdb;
		$prefix = $wpdb->prefix;
		$query = Helper::DB();
		$items = $query
			->query(
				"SELECT redirect_type,short_url,target_url,nofollow,sponsored,param_forwarding,track_me FROM {$prefix}betterlinks"
			)
			->get();
		if (is_array($items) && count($items) > 0) {
			$formattedArray = [];
			foreach ($items as $item) {
				$formattedArray[$item->short_url] = $item;
			}
			return file_put_contents(
				BETTERLINKS_UPLOAD_DIR_PATH . '/links.json',
				json_encode($formattedArray)
			);
		}
		return;
	}
}
