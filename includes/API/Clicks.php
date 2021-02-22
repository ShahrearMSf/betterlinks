<?php
namespace BetterLinks\API;

use BetterLinks\Traits\ArgumentSchema;

class Clicks extends Controller
{
	use ArgumentSchema;
	/**
	 * Initialize hooks and option name
	 */
	public function __construct()
	{
		add_action('rest_api_init', [$this, 'register_routes']);
	}

	/**
	 * Register the routes for the objects of the controller.
	 */
	public function register_routes()
	{
		$endpoint = '/clicks/';
		register_rest_route($this->namespace, $endpoint, [
			[
				'methods' => \WP_REST_Server::READABLE,
				'callback' => [$this, 'get_items'],
				'permission_callback' => [$this, 'permissions_check'],
				'args' => $this->get_clicks_schema(),
			],
		]);

		register_rest_route($this->namespace, $endpoint, [
			[
				'methods' => \WP_REST_Server::CREATABLE,
				'callback' => [$this, 'create_item'],
				'permission_callback' => [$this, 'permissions_check'],
				'args' => $this->get_clicks_schema(),
			],
		]);

		register_rest_route($this->namespace, $endpoint, [
			[
				'methods' => \WP_REST_Server::EDITABLE,
				'callback' => [$this, 'update_item'],
				'permission_callback' => [$this, 'permissions_check'],
				'args' => $this->get_clicks_schema(),
			],
		]);

		register_rest_route($this->namespace, $endpoint, [
			[
				'methods' => \WP_REST_Server::DELETABLE,
				'callback' => [$this, 'delete_item'],
				'permission_callback' => [$this, 'permissions_check'],
				'args' => $this->get_clicks_schema(),
			],
		]);
	}

	/**
	 * Get betterlinks
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|WP_REST_Request
	 */
	public function get_items($request)
	{
		$request = $request->get_params();
		$from = isset($request['from']) ? $request['from'] : date('Y-m-d', strtotime(' - 30 days'));
		$to = isset($request['to']) ? $request['to'] : date('Y-m-d');

		global $wpdb;
		$prefix = $wpdb->prefix;
		$query = \BetterLinks\Helper::DB();
		$results = $query
			->query(
				"SELECT CLICKS.ID as 
        click_ID, link_id, browser, created_at, referer, short_url, target_url, ip, {$prefix}betterlinks.link_title,
        (select count(id) from {$prefix}betterlinks_clicks where CLICKS.ip = {$prefix}betterlinks_clicks.ip group by ip) as IPCOUNT
		from {$prefix}betterlinks_clicks as CLICKS left join {$prefix}betterlinks on {$prefix}betterlinks.id = CLICKS.link_id WHERE created_at BETWEEN '{$from} 00:00:00' AND '{$to} 23:59:00' group by CLICKS.id"
			)
			->get();

		return new \WP_REST_Response(
			[
				'success' => true,
				'data' => $results,
			],
			200
		);
	}

	/**
	 * Create OR Update betterlinks
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|WP_REST_Request
	 */
	public function create_item($request)
	{
		return new \WP_REST_Response(
			[
				'success' => false,
				'data' => [],
			],
			200
		);
	}

	/**
	 * Create OR Update betterlinks
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|WP_REST_Request
	 */
	public function update_item($request)
	{
		return new \WP_REST_Response(
			[
				'success' => false,
				'data' => [],
			],
			200
		);
	}

	/**
	 * Delete betterlinks
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|WP_REST_Request
	 */
	public function delete_item($request)
	{
		return new \WP_REST_Response(
			[
				'success' => false,
				'data' => [],
			],
			200
		);
	}

	/**
	 * Check if a given request has access to update a setting
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|bool
	 */
	public function permissions_check($request)
	{
		return current_user_can('manage_options');
	}
}
