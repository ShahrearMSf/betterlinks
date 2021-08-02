<?php
namespace BetterLinks\API;

use BetterLinks\Traits\ArgumentSchema;

class Links extends Controller
{
    use ArgumentSchema;
    use \BetterLinks\Traits\Links;
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
                'permission_callback' => [$this, 'get_items_permissions_check'],
                'args' => $this->get_links_schema(),
            ],
        ]);

        register_rest_route($this->namespace, $endpoint, [
            [
                'methods' => \WP_REST_Server::CREATABLE,
                'callback' => [$this, 'create_item'],
                'permission_callback' => [$this, 'create_item_permissions_check'],
                'args' => $this->get_links_schema(),
            ],
        ]);

        register_rest_route(
            $this->namespace,
            $endpoint . '(?P<id>[\d]+)',
            array(
                'args'   => array(
                    'id' => array(
                        'description' => __('Unique identifier for the object.'),
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
                    'permission_callback' => [$this, 'update_item_permissions_check'],
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
                            'description' => __('Whether to bypass Trash and force deletion.'),
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
        if (empty($cache_data) || !json_decode($cache_data, true)) {
            $results = $this->get_all_links_data();
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
        $results = $this->insert_link($request['params']);
        if ($results) {
            return new \WP_REST_Response(
                [
                    'success' => true,
                    'data' => $results,
                ],
                200
            );
        }
        return new \WP_REST_Response(
            [
                'success' => false,
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
    public function update_item($request)
    {
        delete_transient(BETTERLINKS_CACHE_LINKS_NAME);
        $request = $request->get_params();
        $this->update_link($request['params']);
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
        $this->delete_link($request);
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
    public function get_items_permissions_check($request)
    {
        return apply_filters('betterlinks/api/links_get_items_permissions_check', current_user_can('manage_options'));
    }

    /**
     * Check if a given request has access to update a setting
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|bool
     */
    public function create_item_permissions_check($request)
    {
        return apply_filters('betterlinks/api/links_create_item_permissions_check', current_user_can('manage_options'));
    }

    /**
     * Check if a given request has access to update a setting
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|bool
     */
    public function update_item_permissions_check($request)
    {
        return apply_filters('betterlinks/api/links_update_item_permissions_check', current_user_can('manage_options'));
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
