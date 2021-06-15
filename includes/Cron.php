<?php
namespace BetterLinks;

use BetterLinks\Helper;

class Cron
{
	public static function init()
	{
		$self = new self();
		add_filter('cron_schedules', [$self, 'add_cron_schedule']);
		add_action('betterlinks/write_json_links', [$self, 'write_json_links']);
		if (!wp_next_scheduled('betterlinks/analytics')) {
			wp_schedule_event(time(), 'hourly', 'betterlinks/analytics');
		}
		add_action('betterlinks/analytics', [$self, 'analytics']);
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
		$formattedArray = [];
		$items = $query->query("SELECT ID,redirect_type,short_url,link_slug,link_status,target_url,nofollow,sponsored,param_forwarding,track_me,wildcards,expire,dynamic_redirect FROM {$prefix}betterlinks")->get();
		$options = json_decode(get_option(BETTERLINKS_LINKS_OPTION_NAME));
		if(!empty($options)){
			$formattedArray['wildcards_is_active'] = $options->wildcards;
		}
		if (is_array($items) && count($items) > 0) {
			foreach ($items as $item) {
				if($item->wildcards == true){
					$formattedArray['wildcards'][$item->short_url] = $item;
				} else {
					$formattedArray['links'][$item->short_url] = $item;
				}
			}
		}
		$formattedArray = apply_filters('betterlinks/before_write_json_links', $formattedArray);
		return file_put_contents(BETTERLINKS_UPLOAD_DIR_PATH . '/links.json', json_encode($formattedArray));
	}

	public function analytics()
	{
		Helper::clear_query_cache();
		try {
			global $wpdb;
			$prefix = $wpdb->prefix;
			$query = Helper::DB();
			// insert clicks json data into db
			if (BETTERLINKS_EXISTS_CLICKS_JSON) {
				$Clicks = json_decode(file_get_contents(BETTERLINKS_UPLOAD_DIR_PATH . '/clicks.json'), true);
				// link id already exists or not in links table
				if (is_array($Clicks)) {
					foreach ($Clicks as $key => $item) {
						if ($query->table('betterlinks')->find($item['link_id'])) {
							$click_id = $query->table('betterlinks_clicks')->insert($item);
							if(!empty($click_id)) {
								do_action('betterlinks/link/after_insert_click',$item['link_id'], $click_id);
							}
						}
					}
					file_put_contents(BETTERLINKS_UPLOAD_DIR_PATH . '/clicks.json', '{}');
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
