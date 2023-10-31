<?php
namespace BetterLinks;

use BetterLinks\Link\Utils;

/**
 * Summery - Redirect the BetterLinks to targeted links
 */
class Link extends Utils {

	/**
	 * Init the redirect functionality
	 *
	 * @return void
	 */
	public function __construct() {
		if ( ! is_admin() && isset( $_SERVER['REQUEST_METHOD'] ) && 'GET' === $_SERVER['REQUEST_METHOD'] ) {
			add_action( 'init', array( $this, 'run_redirect' ), 0 );
		}
	}
	/**
	 * checks requested short links
	 */
	public function run_redirect() {
		$request_uri = isset( $_SERVER['REQUEST_URI'] ) ? stripslashes( rawurldecode( sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ) ) ) ) : false;
		$request_uri = substr( $request_uri, strlen( wp_parse_url( site_url( '/' ), PHP_URL_PATH ) ) );
		$param       = explode( '?', $request_uri, 2 );
		$data        = $this->get_slug_raw( rtrim( current( $param ), '/' ) );

		if ( empty( $data['target_url'] ) || ! apply_filters( 'betterlinks/pre_before_redirect', $data ) ) {
			return false;
		}
		$data = apply_filters( 'betterlinks/link/before_dispatch_redirect', $data );
		if ( empty( $data ) ) {
			return false;
		}

		do_action( 'betterlinks/before_redirect', $data );
		$this->dispatch_redirect( $data, next( $param ) );
	}
}
