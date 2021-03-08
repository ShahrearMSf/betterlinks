<?php
namespace BetterLinks\API;

use BetterLinks\Traits\ArgumentSchema;

class Settings extends Controller
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
		$endpoint = '/settings/';
		register_rest_route($this->namespace, $endpoint, [
			[
				'methods' => \WP_REST_Server::READABLE,
				'callback' => [$this, 'get_value'],
				'permission_callback' => [$this, 'permissions_check'],
				'args' => $this->get_settings_schema(),
			],
		]);

		register_rest_route($this->namespace, $endpoint, [
			[
				'methods' => \WP_REST_Server::EDITABLE,
				'callback' => [$this, 'update_value'],
				'permission_callback' => [$this, 'permissions_check'],
				'args' => $this->get_settings_schema(),
			],
		]);
	}

	/**
	 * Get betterlinks
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|WP_REST_Request
	 */
	public function get_value($request)
	{
		$response = get_option(BETTERLINKS_LINKS_OPTION_NAME);
		return new \WP_REST_Response(
			[
				'success' => true,
				'data' => $response ? $response : [],
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
	public function create_value($request)
	{
		return new \WP_REST_Response(
			[
				'success' => true,
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
	public function update_value($request)
	{
		$response = json_encode($request->get_params());
		if ($response) {
			update_option(BETTERLINKS_LINKS_OPTION_NAME, $response);
		}
		// regenerate links for wildcards option update
		\BetterLinks\Helper::create_cron_jobs_for_json_links();
		return new \WP_REST_Response(
			[
				'success' => true,
				'data' => $response ? $response : [],
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
	public function delete_value($request)
	{
		return new \WP_REST_Response(
			[
				'success' => true,
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
