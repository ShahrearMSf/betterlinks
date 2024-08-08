<?php
namespace BetterLinks\Admin;

class Cache {
	public static function init() {
		self::write_json_settings();
	}
	public static function write_json_settings() {
		$betterlinks_links = get_option( BETTERLINKS_LINKS_OPTION_NAME, array() );
		if ( is_string( $betterlinks_links ) ) {
			$betterlinks_links = json_decode( $betterlinks_links, true );
		}
		// Using file_put_contents is like opening a file, writing to it, and then closing it. Sometimes, it might show warnings because of caching, so it's better to silence the warning.
		return @file_put_contents( BETTERLINKS_UPLOAD_DIR_PATH . '/settings.json', json_encode( $betterlinks_links ) ); // phpcs:ignore
	}

	public static function get_json_settings() {
		if ( file_exists( BETTERLINKS_UPLOAD_DIR_PATH . '/settings.json' ) ) {
			$settings = json_decode( file_get_contents( BETTERLINKS_UPLOAD_DIR_PATH . '/settings.json' ), true );
			if ( ! empty( $settings ) ) {
				return $settings;
			}
		}
		return self::write_json_settings();
	}
}
