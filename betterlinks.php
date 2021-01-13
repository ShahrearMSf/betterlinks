<?php
/*
 * Plugin Name:		BetterLinks
 * Plugin URI:		https://betterlinks.io/
 * Description:		Ultimate plugin to create, shorten, track and manage any URL. Gather analytics reports and run successfully marketing campaigns easily.
 * Version:			1.0.0
 * Author:			WPDeveloper
 * Author URI:		https://wpdeveloper.net
 * License:			GPL-3.0+
 * License URI:		http://www.gnu.org/licenses/gpl-3.0.txt
 * Author URI:		https://wpdeveloper.net
 * Text Domain:		betterlinks
 * Domain Path:		/languages
 */

if (!defined('ABSPATH')) exit;

if (file_exists(dirname(__FILE__) . '/vendor/autoload.php')) {
	require_once dirname(__FILE__) . '/vendor/autoload.php';
}


if(!class_exists('BetterLinks')) {
	final class BetterLinks
	{
		private $upload_dir;
		private function __construct()
		{
			$this->upload_dir_path();
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
			define('BETTERLINKS_VERSION', '1.0.0');
			define('BETTERLINKS_DB_VERSION', '1.0');
			define('BETTERLINKS_SETTINGS_NAME', 'betterlinks_settings');
			define('BETTERLINKS_PLUGIN_FILE', __FILE__);
			define('BETTERLINKS_PLUGIN_BASENAME', plugin_basename(__FILE__));
			define('BETTERLINKS_PLUGIN_SLUG', 'betterlinks');
			define('BETTERLINKS_PLUGIN_ROOT_URI', plugins_url("/", __FILE__));
			define('BETTERLINKS_ROOT_DIR_PATH', plugin_dir_path(__FILE__));
			define('BETTERLINKS_ASSETS_DIR_PATH', BETTERLINKS_ROOT_DIR_PATH . 'assets/');
			define('BETTERLINKS_ASSETS_URI', BETTERLINKS_PLUGIN_ROOT_URI . 'assets/');
			define('BETTERLINKS_UPLOAD_DIR_PATH', $this->upload_dir['basedir'] . '/betterlinks_uploads');
		}

		public function upload_dir_path(){
			$this->upload_dir = wp_get_upload_dir();
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
				'betterlinks',
				false,
				dirname(dirname(plugin_basename(__FILE__))) . '/languages/'
			);
		}

		public function activate(){
			new BetterLinks\Installer();
		}
	}
}


/**
 * Initializes the main plugin
 *
 * @return \BetterLinks
 */
if(!function_exists('BetterLinks_Start')){
	function BetterLinks_Start()
	{
		return BetterLinks::init();
	}
}

// Plugin Start
BetterLinks_Start();