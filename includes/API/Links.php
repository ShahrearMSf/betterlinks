<?php
namespace BetterLinks\API;

use BetterLinks\Traits\ArgumentSchema;

class Links extends Controller
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
		$endpoint = '/links/';
		register_rest_route($this->namespace, $endpoint, [
			[
				'methods' => \WP_REST_Server::READABLE,
				'callback' => [$this, 'get_items'],
				'permission_callback' => [$this, 'permissions_check'],
				'args' => $this->get_links_schema(),
			],
		]);

		register_rest_route($this->namespace, $endpoint, [
			[
				'methods' => \WP_REST_Server::CREATABLE,
				'callback' => [$this, 'create_item'],
				'permission_callback' => [$this, 'permissions_check'],
				'args' => $this->get_links_schema(),
			],
		]);

		register_rest_route(
			$this->namespace,
			$endpoint . '(?P<id>[\d]+)',
			array(
				'args'   => array(
					'id' => array(
						'description' => __( 'Unique identifier for the object.' ),
						'type'        => 'integer',
					),
				),
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_item' ),
					'permission_callback' => [$this, 'permissions_check'],
					'args'                => $this->get_links_schema(),
				),
				array(
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'update_item' ),
					'permission_callback' => [$this, 'permissions_check'],
					'args'                => $this->get_links_schema(),
				),
				array(
					'methods'             => \WP_REST_Server::DELETABLE,
					'callback'            => array( $this, 'delete_item' ),
					'permission_callback' => [$this, 'permissions_check'],
					'args'                => array(
						'force' => array(
							'type'        => 'boolean',
							'default'     => false,
							'description' => __( 'Whether to bypass Trash and force deletion.' ),
						),
					),
				),
				// 'schema' => array( $this, 'get_public_item_schema' ),
			)
		);
	}

	public function parse_response($items, $analytic)
	{
		$results = [];
		foreach ($items as $item) {
			//insert analytic data
			if (isset($analytic[$item->ID])) {
				$item->analytic = $analytic[$item->ID];
			}

			// formatting response
			if (!isset($results[$item->cat_id])) {
				$results[$item->cat_id] = [
					'term_name' => $item->term_name,
					'term_slug' => $item->term_slug,
					'term_type' => $item->term_type,
				];
				if ($item->ID !== null) {
					$results[$item->cat_id]['lists'][] = $item;
				} else {
					$results[$item->cat_id]['lists'] = [];
				}
			} else {
				$results[$item->cat_id]['lists'][] = $item;
			}
		}
		return $results;
	}

	/**
	 * Get betterlinks
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|WP_REST_Request
	 */
	public function get_items($request)
	{
		$cache_data = get_transient(BETTERLINKS_CACHE_LINKS_NAME);
		if (!$cache_data) {
			global $wpdb;
			$prefix = $wpdb->prefix;
			$query = \BetterLinks\Helper::DB();
			$analytic = get_option('betterlinks_analytics_data');
			$analytic = $analytic ? json_decode($analytic, true) : [];
			$results = $query
				->query(
					"SELECT 
				{$prefix}betterlinks_terms.ID as cat_id, 
				{$prefix}betterlinks_terms.term_name, 
				{$prefix}betterlinks_terms.term_slug,
				{$prefix}betterlinks_terms.term_type, 
				{$prefix}betterlinks.ID, 
				{$prefix}betterlinks.link_title,
				{$prefix}betterlinks.link_slug,
				{$prefix}betterlinks.link_note,
				{$prefix}betterlinks.link_status,
				{$prefix}betterlinks.nofollow,
				{$prefix}betterlinks.sponsored,
				{$prefix}betterlinks.track_me,
				{$prefix}betterlinks.param_forwarding,
				{$prefix}betterlinks.param_struct,
				{$prefix}betterlinks.redirect_type,
				{$prefix}betterlinks.target_url,
				{$prefix}betterlinks.short_url,
				{$prefix}betterlinks.link_date,
				{$prefix}betterlinks.expire
			FROM {$prefix}betterlinks_terms
			LEFT JOIN  {$prefix}betterlinks_terms_relationships ON {$prefix}betterlinks_terms.ID = {$prefix}betterlinks_terms_relationships.term_id
			LEFT JOIN  {$prefix}betterlinks ON {$prefix}betterlinks.ID = {$prefix}betterlinks_terms_relationships.link_id
			WHERE {$prefix}betterlinks_terms.term_type = 'category' ORDER BY {$prefix}betterlinks.link_order ASC"
				)
				->get();

			$results = $this->parse_response($results, $analytic);
			set_transient(BETTERLINKS_CACHE_LINKS_NAME, json_encode($results));
			return new \WP_REST_Response(
				[
					'success' => true,
					'cache' => false,
					'data' => $results,
				],
				200
			);
		}
		return new \WP_REST_Response(
			[
				'success' => true,
				'cache' => true,
				'data' => json_decode($cache_data),
			],
			200
		);
	}

	public function get_item($request) 
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
	public function create_item($request)
	{
		delete_transient(BETTERLINKS_CACHE_LINKS_NAME);
		$request = $request->get_params();
		if(isset($request['params']['short_url'])){
			$resutls = \BetterLinks\Helper::DB()
			->table('betterlinks')
			->where('short_url', '=', $request['params']['short_url'])->get();
			if(count($resutls) === 0){ 
				\BetterLinks\Helper::DB()->transaction(function ($qb) use ($request) {

					$lookFor = array_combine(array_keys($this->links_schema()), array_keys($this->links_schema()));
					$params = array_intersect_key($request['params'], $lookFor);
					$params['link_author'] = get_current_user_id();
					$id = $qb->table('betterlinks')->insert(apply_filters('betterlinks/api/params', $params));
					if (BETTERLINKS_EXISTS_LINKS_JSON) {
						$params['ID'] = $id;
						$this->insert_json_into_file(trailingslashit(BETTERLINKS_UPLOAD_DIR_PATH) . 'links.json', $params);
					}
					$this->terms_insert($qb, $id, $request['params']);
					$_SESSION['link_ID'] = $id;
				});
				$response = array_merge($request['params'], [
					'ID' => strval($_SESSION['link_ID']),
				]);
				unset($_SESSION['link_ID']);
				return new \WP_REST_Response(
					[
						'success' => true,
						'data' => $response,
					],
					200
				);
			}
		}
		return new \WP_REST_Response(
			[
				'success' => false,
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
	public function update_item($request)
	{
		delete_transient(BETTERLINKS_CACHE_LINKS_NAME);
		$request = $request->get_params();
		\BetterLinks\Helper::DB()->transaction(function ($qb) use ($request) {
			$lookFor = array_combine(array_keys($this->links_schema()), array_keys($this->links_schema()));
			$params = array_intersect_key($request['params'], $lookFor);
			$old_short_url = isset($request['params']['old_short_url']) ? $request['params']['old_short_url'] : '';
			if(BETTERLINKS_EXISTS_LINKS_JSON){
				$this->update_json_into_file(trailingslashit(BETTERLINKS_UPLOAD_DIR_PATH) . 'links.json', $params, $old_short_url);
			}
			$qb->table('betterlinks')
				->where('ID', $params['ID'])
				->update(apply_filters('betterlinks/api/params', $params));
			$this->terms_insert($qb, $params['ID'], $request['params'], true);
		});
		return new \WP_REST_Response(
			[
				'success' => true,
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
	public function delete_item($request)
	{
		$request = $request->get_params();
		delete_transient(BETTERLINKS_CACHE_LINKS_NAME);

		\BetterLinks\Helper::DB()
			->table('betterlinks')
			->where('id', '=', $request['id'])
			->delete();

		\BetterLinks\Helper::DB()
			->table('betterlinks_clicks')
			->where('link_id', '=', $request['id'])
			->delete();

		\BetterLinks\Helper::DB()
			->table('betterlinks_terms_relationships')
			->where('link_id', '=', $request['id'])
			->delete();
		if(BETTERLINKS_EXISTS_LINKS_JSON){
			$this->delete_json_into_file(trailingslashit(BETTERLINKS_UPLOAD_DIR_PATH) . 'links.json', $request['short_url']);
		}
		return new \WP_REST_Response(
			[
				'success' => true,
				'data' => [
					'term_id' => $request['term_id'],
					'ID' => $request['id'],
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

	public function terms_insert($qb, $link_id, $request, $is_update = false)
	{
		$term_data = [];
		// store tags relation data
		if (isset($request['cat_id']) && !empty($request['cat_id'])) {
			$term_data[] = [
				'term_id' => $request['cat_id'],
				'link_id' => $link_id,
			];
		}
		if (isset($request['tags_id']) && is_array($request['tags_id'])) {
			$newTagsList = [];
			foreach ($request['tags_id'] as $key => $value) {
				if (is_numeric($value)) {
					$term_data[] = [
						'term_id' => $value,
						'link_id' => $link_id,
					];
				} else {
					$newTagsList[] = [
						'term_name' => $value,
						'term_slug' => $value,
						'term_type' => 'tags',
					];
				}
			}
			// insert new tags
			if (count($newTagsList) > 0) {
				// stop duplicate tags insert
				foreach ($newTagsList as $item) {
					$terms = $qb
						->table('betterlinks_terms')
						->where('term_slug', '=', $item['term_slug'])
						->get();
					if (count($terms) > 0) {
						$terms = current($terms);
						$term_data[] = [
							'term_id' => $terms->ID,
							'link_id' => $link_id,
						];
					} else {
						$terms = $qb->table('betterlinks_terms')->insert([
							[
								'term_name' => $item['term_name'],
								'term_slug' => $item['term_slug'],
								'term_type' => 'tags',
							],
						]);
						$term_id = current($terms);
						$term_data[] = [
							'term_id' => $term_id,
							'link_id' => $link_id,
						];
					}
				}
			}
		}
		if ($is_update) {
			$qb->table('betterlinks_terms_relationships')
				->where('link_id', '=', $request['ID'])
				->delete();
		}
		$qb->table('betterlinks_terms_relationships')->insert($term_data);
	}
}
