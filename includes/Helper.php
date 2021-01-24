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
		if(BETTERLINKS_EXISTS_LINKS_JSON) {
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
			BETTERLINKS_PLUGIN_SLUG . '-settings' => [
				'title' => __('Settings', 'betterlinks'),
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

	
	public static function make_slug($str)
	{ 
		if($str !== mb_convert_encoding( mb_convert_encoding($str, 'UTF-32', 'UTF-8'), 'UTF-8', 'UTF-32') )
			$str = mb_convert_encoding($str, 'UTF-8', mb_detect_encoding($str));
		$str = htmlentities($str, ENT_NOQUOTES, 'UTF-8');
		$str = preg_replace('`&([a-z]{1,2})(acute|uml|circ|grave|ring|cedil|slash|tilde|caron|lig);`i', '\\1', $str);
		$str = html_entity_decode($str, ENT_NOQUOTES, 'UTF-8');
		$str = preg_replace(array('`[^a-z0-9]`i','`[-]+`'), '-', $str);
		$str = strtolower( trim($str, '-') );
		$str = substr($str, 0, 100);
		return $str;
	}
}
