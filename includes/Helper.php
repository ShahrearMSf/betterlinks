<?php
namespace BetterLinks;

class Helper
{
	public static function DB()
	{
		static $BLDATA;
		if (!$BLDATA) {
			global $wpdb;
			$connection = new Query\Connection($wpdb, [
				'prefix' => $wpdb->prefix,
			]);
			$BLDATA = new Query\QueryBuilder\QueryBuilderHandler($connection);
		}
		return $BLDATA;
	}

	public static function get_links(){
		if(file_exists(BETTERLINKS_UPLOAD_DIR_PATH . '/links.json')) {
			return json_decode(file_get_contents(BETTERLINKS_UPLOAD_DIR_PATH . '/links.json'));
		}
		return;
	}

	public static function get_link_from_json_file($short_url)
	{
		global $betterlinks;
		if (isset($betterlinks->$short_url)) {
			return $betterlinks->$short_url;
		}
		return;
	}

	public static function get_menu_items()
	{
		$menu_items = [
			BETTERLINKS_PLUGIN_SLUG => [
				'title' => __('Manage Links', 'betterlinks'),
				'capability' => 'manage_options',
			],
			BETTERLINKS_PLUGIN_SLUG . '-analytics' => [
				'title' => __('Analytics', 'betterlinks'),
				'capability' => 'manage_options',
			],
		];
		return apply_filters('betterlinks/helper/menu_items', $menu_items);
	}

	/**
	 * Check Supported Post type for admin page and plugin main settings page
	 *
	 * @return bool
	 */

	public static function plugin_page_hook_suffix($hook)
	{
		if ($hook == 'toplevel_page_' . BETTERLINKS_PLUGIN_SLUG) {
			return true;
		} else {
			foreach (self::get_menu_items() as $key => $value) {
				if ($hook == BETTERLINKS_PLUGIN_SLUG . '_page_' . $key) {
					return true;
				}
			}
		}
		return false;
	}
}
