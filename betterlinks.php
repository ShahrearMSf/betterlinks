<?php
/*
 * Plugin Name:		BetterLinks
 * Plugin URI:		https://betterlinks.io/
 * Description:		Ultimate plugin to create, shorten, track and manage any URL. Gather analytics reports and run successfully marketing campaigns easily.
 * Version:			1.2.3
 * Author:			WPDeveloper
 * Author URI:		https://wpdeveloper.net
 * License:			GPL-3.0+
 * License URI:		http://www.gnu.org/licenses/gpl-3.0.txt
 * Author URI:		https://wpdeveloper.net
 * Text Domain:		betterlinks
 * Domain Path:		/languages
 */

if (!defined('ABSPATH')) {
    exit();
}

if (file_exists(dirname(__FILE__) . '/vendor/autoload.php')) {
    require_once dirname(__FILE__) . '/vendor/autoload.php';
}

if (!class_exists('BetterLinks')) {
    final class BetterLinks
    {
        private $Installer;
        private $upload_dir;
        private function __construct()
        {
            $this->upload_dir_path();
            $this->define_constants();
            $this->set_global_settings();
            $this->Installer = new BetterLinks\Installer();
            register_activation_hook(__FILE__, [$this, 'activate']);
            register_deactivation_hook(__FILE__, [$this, 'deactivate']);
            add_action('plugins_loaded', [$this, 'on_plugins_loaded']);
            add_action('betterlinks_loaded', [$this, 'init_plugin']);
            add_action('init', [$this, 'init_dispatch']);
            $this->dispatch_hook();
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
            define('BETTERLINKS_VERSION', '1.2.3');
            define('BETTERLINKS_DB_VERSION', '1.4');
            define('BETTERLINKS_SETTINGS_NAME', 'betterlinks_settings');
            define('BETTERLINKS_PLUGIN_FILE', __FILE__);
            define('BETTERLINKS_PLUGIN_BASENAME', plugin_basename(__FILE__));
            define('BETTERLINKS_PLUGIN_SLUG', 'betterlinks');
            define('BETTERLINKS_PLUGIN_ROOT_URI', plugins_url('/', __FILE__));
            define('BETTERLINKS_ROOT_DIR_PATH', plugin_dir_path(__FILE__));
            define('BETTERLINKS_ASSETS_DIR_PATH', BETTERLINKS_ROOT_DIR_PATH . 'assets/');
            define('BETTERLINKS_ASSETS_URI', BETTERLINKS_PLUGIN_ROOT_URI . 'assets/');
            define('BETTERLINKS_UPLOAD_DIR_PATH', $this->upload_dir['basedir'] . '/betterlinks_uploads');
            define('BETTERLINKS_EXISTS_LINKS_JSON', file_exists(BETTERLINKS_UPLOAD_DIR_PATH . '/links.json'));
            define('BETTERLINKS_EXISTS_CLICKS_JSON', file_exists(BETTERLINKS_UPLOAD_DIR_PATH . '/clicks.json'));
            define('BETTERLINKS_LINKS_OPTION_NAME', 'betterlinks_links');
            define('BETTERLINKS_CACHE_LINKS_NAME', 'betterlinks_cache_links_data');
        }

        public function upload_dir_path()
        {
            $this->upload_dir = wp_get_upload_dir();
        }

        public function on_plugins_loaded()
        {
            do_action('betterlinks_loaded');
        }

        /**
         * Initialize the plugin
         *
         * @return void
         */
        public function init_plugin()
        {
            $this->load_textdomain();
            BetterLinks\API::init();
            if (is_admin()) {
                new BetterLinks\Admin();
            }
            new BetterLinks\Link();
            new BetterLinks\Tools();
            $this->run_migrator();
        }

        public function dispatch_hook()
        {
            BetterLinks\API::dispatch_hook();
            BetterLinks\Cron::init();
        }

        

        public function load_textdomain()
        {
            load_plugin_textdomain('betterlinks', false, dirname(dirname(plugin_basename(__FILE__))) . '/languages/');
        }

        public function set_global_settings()
        {
            $GLOBALS['betterlinks'] = BetterLinks\Helper::get_links();
        }

        public function run_migrator()
        {
            if (get_option('betterlinks_version') != BETTERLINKS_VERSION) {
                if (!$this->Installer->doing_dispatch()) {
                    update_option('betterlinks_version', BETTERLINKS_VERSION);
                    $this->Installer->init();
                    foreach ($this->Installer->migration as $task) {
                        $this->Installer->push_to_queue($task);
                    }
                    $this->Installer->save();
                }
            }
        }

        public function init_dispatch()
        {
            if ($this->Installer->start_dispatch()) {
                $this->Installer->dispatch();
            }
        }

        public function activate()
        {
            if (!$this->Installer->doing_dispatch()) {
                $this->Installer->init();
                foreach ($this->Installer->activation as $task) {
                    $this->Installer->push_to_queue($task);
                }
                $this->Installer->save();
            }
        }

        public function deactivate()
        {
            new BetterLinks\Uninstall();
        }
    }
}

/**
 * Initializes the main plugin
 *
 * @return \BetterLinks
 */
if (!function_exists('BetterLinks_Start')) {
    function BetterLinks_Start()
    {
        return BetterLinks::init();
    }
}

// Plugin Start
BetterLinks_Start();
