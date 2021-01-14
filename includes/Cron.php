<?php
namespace BetterLinks;

use BetterLinks\Helper;

class Cron
{
	public function __construct()
	{
		add_filter( 'cron_schedules', array($this, 'add_cron_schedule') );
		add_action('betterlinks/write_json_links', [$this, 'write_json_links']);
		if ( ! wp_next_scheduled( 'betterlinks/update_clicks_analytics' ) ) {
			wp_schedule_event( time(), 'hourly', 'betterlinks/update_clicks_analytics' );
		}
		add_action( 'betterlinks/update_clicks_analytics', array($this, 'update_clicks_analytics') ); 
	}
	public function add_cron_schedule($schedules)
	{
		$schedules['every_six_hours'] = array(
			'interval' => 21600, // Every 6 hours
			'display'  => __( 'Every 6 hours' ),
		);
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
	public function update_clicks_analytics()
	{
		$Clicks = json_decode(file_get_contents(BETTERLINKS_UPLOAD_DIR_PATH . '/clicks.json'), true);
		if($Clicks){
			try {
				$query = \BetterLinks\Helper::DB();
				$results = $query->table('betterlinks_clicks')->insert($Clicks);
				// reset file
				if($results){
					return file_put_contents(BETTERLINKS_UPLOAD_DIR_PATH . '/clicks.json', '{}');
				}
			} catch (\Throwable $th) {
				echo $th->getMessage();
			}
		}
	}
}
