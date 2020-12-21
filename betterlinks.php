<?php
/*
 * Plugin Name: Better Links
 * Description: Better Links
 * Version: 0.0.1
 * Author: WPDeveloper
 * Author URI: https://wpdeveloper.net
 * Text Domain: better-links
 */

if (!defined('ABSPATH')) exit;

if (file_exists(dirname(__FILE__) . '/vendor/autoload.php')) {
	require_once dirname(__FILE__) . '/vendor/autoload.php';
}



final class BetterLinks
{
	private function __construct()
	{
		$this->define_constants();
		register_activation_hook(__FILE__, [$this, 'activate']);
		add_action('plugins_loaded', [$this, 'init_plugin']);
	}

	public static function init()
	{
		static $instance = false;

		if (!$instance) {
			$instance = new self();
		}

		return $instance;
	}
	public function define_constants()
	{
		/**
		 * Defines CONSTANTS for Whole plugins.
		 */
		define('BL_VERSION', '0.0.1');
		define('BL_SETTINGS_NAME', 'betterlinks_settings');
		define('BL_PLUGIN_FILE', __FILE__);
		define('BL_PLUGIN_BASENAME', plugin_basename(__FILE__));
		define('BL_PLUGIN_SLUG', 'betterlinks');
		define('BL_PLUGIN_ROOT_URI', plugins_url("/", __FILE__));
		define('BL_ROOT_DIR_PATH', plugin_dir_path(__FILE__));
		define('WPSP_ASSETS_DIR_PATH', BL_ROOT_DIR_PATH . 'assets/');
		define('BL_ASSETS_URI', BL_PLUGIN_ROOT_URI . 'assets/');
	}

	/**
	 * Initialize the plugin
	 *
	 * @return void
	 */
	public function init_plugin()
	{
        $this->load_textdomain();
		new BetterLinks\API();
		if(is_admin()){
			new BetterLinks\Admin();
		}
		new BetterLinks\Link();
	}

	public function load_textdomain()
	{
		load_plugin_textdomain(
			'better-links',
			false,
			dirname(dirname(plugin_basename(__FILE__))) . '/languages/'
		);
	}

	public function activate(){
		new BetterLinks\Installer();
	}
}

/**
 * Initializes the main plugin
 *
 * @return \BetterLinks
 */
function BetterLinks_Start()
{
	return BetterLinks::init();
}

// Plugin Start
BetterLinks_Start();