<?php
namespace BetterLinks;

use BetterLinks\Helper;

class Cron
{
	public function __construct()
	{
		add_filter('cron_schedules', [$this, 'add_cron_schedule']);
		add_action('betterlinks/write_json_links', [$this, 'write_json_links']);
		if (!wp_next_scheduled('betterlinks/analytics')) {
			wp_schedule_event(time(), 'hourly', 'betterlinks/analytics');
		}
		add_action('betterlinks/analytics', [$this, 'analytics']);
	}
	public function add_cron_schedule($schedules)
	{
		$schedules['every_one_and_half_hours'] = [
			'interval' => 5400, // Every 90 Minutes
			'display' => __('Every 90 Minutes'),
		];
		return $schedules;
	}
	public function write_json_links()
	{
		global $wpdb;
		$prefix = $wpdb->prefix;
		$query = Helper::DB();
		$items = $query->query("SELECT ID,redirect_type,short_url,link_slug,target_url,nofollow,sponsored,param_forwarding,track_me FROM {$prefix}betterlinks")->get();
		if (is_array($items) && count($items) > 0) {
			$formattedArray = [];
			foreach ($items as $item) {
				$formattedArray[$item->short_url] = $item;
			}
			return file_put_contents(BETTERLINKS_UPLOAD_DIR_PATH . '/links.json', json_encode($formattedArray));
		}
		return;
	}

	public function analytics()
	{
		try {
			global $wpdb;
			$prefix = $wpdb->prefix;
			$query = Helper::DB();
			// insert clicks json data into db
			if (BETTERLINKS_EXISTS_CLICKS_JSON) {
				$Clicks = json_decode(file_get_contents(BETTERLINKS_UPLOAD_DIR_PATH . '/clicks.json'), true);
				if ($Clicks) {
					$query = \BetterLinks\Helper::DB();
					$results = $query->table('betterlinks_clicks')->insert($Clicks);
					// reset file
					if ($results) {
						file_put_contents(BETTERLINKS_UPLOAD_DIR_PATH . '/clicks.json', '{}');
					}
				}
			}

			// update links analytic
			$items = (array) $query
				->query(
					"SELECT DISTINCT link_id, ip,
			(select count(ip) from {$prefix}betterlinks_clicks WHERE CLICKS.ip = {$prefix}betterlinks_clicks.ip  group by ip) as IPCOUNT,
			(select count(link_id) from {$prefix}betterlinks_clicks WHERE CLICKS.link_id = {$prefix}betterlinks_clicks.link_id group by link_id) as LINKCOUNT
			from {$prefix}betterlinks_clicks as CLICKS group by CLICKS.id"
				)
				->get();
			$results = [];
			if (!empty($items)) {
				foreach ($items as $item) {
					$results[$item->link_id]['link_count'] = $item->LINKCOUNT;
					$results[$item->link_id]['ip'][] = [
						$item->ip => $item->IPCOUNT,
					];
				}
			}
			return update_option('betterlinks_analytics_data', json_encode($results));
		} catch (\Throwable $th) {
			return $th->getMessage();
		}
		return;
	}
}
