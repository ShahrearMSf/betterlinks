<?php
namespace BetterLinks\API;

use BetterLinks\Traits\ArgumentSchema;

class Terms extends Controller
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
		$endpoint = '/terms/';
		register_rest_route($this->namespace, $endpoint, [
			[
				'methods' => \WP_REST_Server::READABLE,
				'callback' => [$this, 'get_value'],
				'permission_callback' => [$this, 'permissions_check'],
				'args' => $this->get_terms_schema(),
			],
		]);

		register_rest_route($this->namespace, $endpoint, [
			[
				'methods' => \WP_REST_Server::CREATABLE,
				'callback' => [$this, 'create_value'],
				'permission_callback' => [$this, 'permissions_check'],
				'args' => $this->get_terms_schema(),
			],
		]);

		register_rest_route($this->namespace, $endpoint, [
			[
				'methods' => \WP_REST_Server::EDITABLE,
				'callback' => [$this, 'update_value'],
				'permission_callback' => [$this, 'permissions_check'],
				'args' => $this->get_terms_schema(),
			],
		]);

		register_rest_route($this->namespace, $endpoint, [
			[
				'methods' => \WP_REST_Server::DELETABLE,
				'callback' => [$this, 'delete_value'],
				'permission_callback' => [$this, 'permissions_check'],
				'args' => $this->get_terms_schema(),
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
		$query_params = $request->get_query_params();
		global $wpdb;
		$prefix = $wpdb->prefix;
		$query = \BetterLinks\Helper::DB();
		if (isset($query_params['ID'])) {
			$results = $query
				->query(
					"SELECT 
            {$prefix}betterlinks_terms.ID as term_id, 
            {$prefix}betterlinks_terms.term_name, 
            {$prefix}betterlinks_terms.term_slug,
            {$prefix}betterlinks_terms.term_type
            FROM {$prefix}betterlinks_terms
            LEFT JOIN  {$prefix}betterlinks_terms_relationships ON {$prefix}betterlinks_terms.ID = {$prefix}betterlinks_terms_relationships.term_id
            LEFT JOIN  {$prefix}betterlinks ON {$prefix}betterlinks.ID = {$prefix}betterlinks_terms_relationships.link_id
            WHERE {$prefix}betterlinks_terms_relationships.link_id = {$query_params['ID']} 
            AND {$prefix}betterlinks_terms.term_type = '{$query_params['term_type']}'
            "
				)
				->get();
		} else {
			$results = $query->table('betterlinks_terms')->get();
		}

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
	public function create_value($request)
	{
		delete_transient(BETTERLINKS_CACHE_LINKS_NAME);
		$request = $request->get_params();
		$id = \BetterLinks\Helper::DB()
			->table('betterlinks_terms')
			->insert($request['params']);
		$request['params']['ID'] = $id;
		$request['params']['lists'] = [];
		return new \WP_REST_Response(
			[
				'success' => is_bool($id),
				'data' => $request['params'],
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
		delete_transient(BETTERLINKS_CACHE_LINKS_NAME);
		$request = $request->get_params();
		$data = [
			'term_name' => $request['params']['cat_name'],
			'term_slug' => $request['params']['cat_slug'],
		];

		\BetterLinks\Helper::DB()
			->table('betterlinks_terms')
			->where('ID', $request['params']['cat_id'])
			->update($data);

		return new \WP_REST_Response(
			[
				'success' => is_bool($request['params']['cat_id']),
				'data' => $request['params'],
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
		delete_transient(BETTERLINKS_CACHE_LINKS_NAME);
		$request = $request->get_params();
		\BetterLinks\Helper::DB()->transaction(function ($qb) use ($request) {
			if ($request['cat_id'] != 1) {
				$qb->table('betterlinks_terms')
					->where('id', '=', $request['cat_id'])
					->delete();

				$term = current(
					$qb
						->table('betterlinks_terms')
						->where('term_slug', '=', 'uncategorized')
						->get()
				);

				$qb->table('betterlinks_terms_relationships')
					->where('term_id', '=', $request['cat_id'])
					->update(['term_id' => $term->ID]);
			}
		});
		return new \WP_REST_Response(
			[
				'success' => true,
				'data' => [
					'cat_id' => $request['cat_id'],
				],
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
