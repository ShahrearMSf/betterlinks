<?php
namespace BetterLinks\API;

use BetterLinks\Traits\ArgumentSchema;

class Clicks extends Controller {

	use \BetterLinks\Traits\Clicks;
	use ArgumentSchema;

	/**
	 * Initialize hooks and option name
	 */
	public function __construct() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

	/**
	 * Register the routes for the objects of the controller.
	 */
	public function register_routes() {
		$endpoint = '/clicks/';
		register_rest_route(
			$this->namespace,
			$endpoint,
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_items' ),
					'permission_callback' => array( $this, 'get_items_permissions_check' ),
					'args'                => $this->get_clicks_schema(),
				),
			)
		);

		register_rest_route(
			$this->namespace,
			$endpoint,
			array(
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'create_item' ),
					'permission_callback' => array( $this, 'permissions_check' ),
					'args'                => $this->get_clicks_schema(),
				),
			)
		);

		register_rest_route(
			$this->namespace,
			$endpoint,
			array(
				array(
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'update_item' ),
					'permission_callback' => array( $this, 'permissions_check' ),
					'args'                => $this->get_clicks_schema(),
				),
			)
		);

		register_rest_route(
			$this->namespace,
			$endpoint,
			array(
				array(
					'methods'             => \WP_REST_Server::DELETABLE,
					'callback'            => array( $this, 'delete_item' ),
					'permission_callback' => array( $this, 'permissions_check' ),
					'args'                => $this->get_clicks_schema(),
				),
			)
		);

		do_action( 'betterlinks_register_clicks_routes', $this );
	}

	/**
	 * Get betterlinks
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|WP_REST_Response
	 */
	public function get_items( $request ) {
		$request = $request->get_params();
		$from    = isset( $request['from'] ) ? $request['from'] : date( 'Y-m-d', strtotime( ' - 30 days' ) );
		$to      = isset( $request['to'] ) ? $request['to'] : date( 'Y-m-d' );
		$results = $this->get_clicks_data( $from, $to );

		$top_referer = $device_stats = $top_os = $top_browser = $top_medium = $top_links_clicks = array();
		if ( apply_filters( 'betterlinks/is_extra_data_tracking_compatible', false ) ) {
			$top_referer  = \BetterLinksPro\Helper::get_top_referer( $from, $to );
			$device_stats = \BetterLinksPro\Helper::get_device_click_stats( $from, $to );
			$top_os       = \BetterLinksPro\Helper::get_top_os( $from, $to );
			$top_browser  = \BetterLinksPro\Helper::get_top_browser( $from, $to );
			$top_clicks_id   = \BetterLinksPro\Helper::get_top_links( $from, $to );
		
			$top_medium   = \BetterLinksPro\Helper::get_top_medium( $results, $top_clicks_id );
            $top_links_clicks = array_splice( $top_medium, -1 );
		}

		return new \WP_REST_Response(
			array(
				'success' => true,
				'data'    => array(
					'clicks'     => $results,
					'referer'    => $top_referer,
					'devices'    => $device_stats,
					'os'         => $top_os,
					'browser'    => $top_browser,
					'top_medium' => $top_medium,
                    'top_links_clicks' => $top_links_clicks
				),
			),
			200
		);
	}

	/**
	 * Create OR Update betterlinks
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|WP_REST_Request
	 */
	public function create_item( $request ) {
		return new \WP_REST_Response(
			array(
				'success' => false,
				'data'    => array(),
			),
			200
		);
	}

	/**
	 * Create OR Update betterlinks
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|WP_REST_Request
	 */
	public function update_item( $request ) {
		return new \WP_REST_Response(
			array(
				'success' => false,
				'data'    => array(),
			),
			200
		);
	}

	/**
	 * Delete betterlinks
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|WP_REST_Request
	 */
	public function delete_item( $request ) {
		return new \WP_REST_Response(
			array(
				'success' => false,
				'data'    => array(),
			),
			200
		);
	}

	/**
	 * Check if a given request has access to update a setting
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|bool
	 */
	public function get_items_permissions_check( $request ) {
		return apply_filters( 'betterlinks/api/analytics_items_permissions_check', current_user_can( 'manage_options' ) );
	}
	/**
	 * Check if a given request has access to update a setting
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|bool
	 */
	public function permissions_check( $request ) {
		return current_user_can( 'manage_options' );
	}
}
