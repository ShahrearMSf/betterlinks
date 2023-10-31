<?php
namespace BetterLinks;

/**
 * Summery
 */
class Admin {

	/**
	 * Description
	 */
	public function __construct() {
		$this->add_menu();
		$this->add_scripts();
		$this->dispath_action();
	}

	/**
	 * Adding BetterLinks Menu
	 */
	public function add_menu() {
		new Admin\Menu();
	}
	/**
	 * Adding BetterLinks Assets
	 */
	public function add_scripts() {
		new Admin\Assets();
	}
	/**
	 * initialize BetterLinks filter,actions,apis and notices
	 */
	public function dispath_action() {
		new Admin\Ajax();
		new Admin\Notice();
		Admin\Metabox::init();
		add_filter( 'BetterLinks/Admin/skip_no_conflict', array( $this, 'skip_no_conflict' ) );
		add_filter( 'plugin_action_links_' . BETTERLINKS_PLUGIN_BASENAME, array( $this, 'insert_plugin_links' ) );
		add_action( 'admin_head-toplevel_page_betterlinks', array( $this, 'append_no_cache_meta' ) );
		add_action( 'admin_head-toplevel_page_betterlinks-analytics', array( $this, 'append_no_cache_meta' ) );
		add_action( 'admin_head-toplevel_page_betterlinks-settings', array( $this, 'append_no_cache_meta' ) );
		add_action( 'betterlinks/admin/after_import_data', array( $this, 'after_import_data' ) );
	}
	/**
	 * Description
	 */
	public function skip_no_conflict() {
		$whitelist   = array( '127.0.0.1', '::1' );
		$remote_addr = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : false;
		if ( in_array( $remote_addr, $whitelist, true ) ) {
			return true;
		}
		return false;
	}
	/**
	 * BetterLinks Pro promotion Link
	 *
	 * @param Array $links - Array of plugin links.
	 */
	public function insert_plugin_links( $links ) {
		if ( ! apply_filters( 'betterlinks/pro_enabled', false ) ) {
			$links[] = sprintf( '<a href="https://wpdeveloper.com/in/upgrade-betterlinks" target="_blank" style="color: #39b54a; font-weight: bold;">' . __( 'Go Pro', 'betterlinks' ) . '</a>' );
		}
		return $links;
	}

	/**
	 * Description
	 */
	public function append_no_cache_meta() {
		echo '<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
		<meta http-equiv="Pragma" content="no-cache">
		<meta http-equiv="Expires" content="0">';
	}

	/**
	 * Description
	 */
	public function after_import_data() {
		$cron = new Cron();
		$cron->write_json_links();
		$cron->analytics();
		\BetterLinks\Helper::clear_query_cache();
	}
}
