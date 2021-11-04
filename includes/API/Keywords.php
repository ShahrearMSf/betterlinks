<?php
namespace BetterLinks\API;

use BetterLinks\Traits\ArgumentSchema;

class Keywords extends Controller
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
        $endpoint = '/keywords/';
        register_rest_route($this->namespace, $endpoint, [
            [
                'methods' => \WP_REST_Server::READABLE,
                'callback' => [$this, 'get_items'],
                'permission_callback' => [$this, 'get_items_permissions_check'],
                'args' => $this->get_keywords_schema(),
            ],
        ]);

        register_rest_route($this->namespace, $endpoint, [
            [
                'methods' => \WP_REST_Server::CREATABLE,
                'callback' => [$this, 'create_item'],
                'permission_callback' => [$this, 'create_item_permissions_check'],
                'args' => $this->get_keywords_schema(),
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
                    'args' => $this->get_keywords_schema(),
                ),
                array(
                    'methods'             => \WP_REST_Server::EDITABLE,
                    'callback'            => array( $this, 'update_item' ),
                    'permission_callback' => [$this, 'update_item_permissions_check'],
                    'args' => $this->get_keywords_schema(),
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

    /**
     * Get keywords
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Request
     */
    public function get_items($request)
    {
        $results = \BetterLinks\Helper::get_keywords();
        return new \WP_REST_Response(
            [
                'success' => true,
                'data' => $results,
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
     * Create OR Update keywords meta
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Request
     */
    public function create_item($request)
    {
        $request = $request->get_params();
        $data = \BetterLinks\Helper::sanitize_text_or_array_field($request['params']);
        $params = $request['params'];
        $data = $this->prepare_item_for_db($params);
        $link_id = (isset($data['link_id']) ? $data['link_id'] : 0);
        $is_insert = \BetterLinks\Helper::add_link_meta($link_id, 'keywords', $data);
        if ($is_insert) {
            return new \WP_REST_Response(
                [
                    'success' => true,
                    'data' => $data,
                ],
                200
            );
        }
        return new \WP_REST_Response(
            [
                'success' => false,
                'data' => [],
            ],
            200
        );
    }

    /**
     * Create OR Update keywords
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Request
     */
    public function update_item($request)
    {
        $request = $request->get_params();
        $data = \BetterLinks\Helper::sanitize_text_or_array_field($request['params']);
        $params = $request['params'];
        $data = $this->prepare_item_for_db($params);
        $link_id = (isset($data['link_id']) ? $data['link_id'] : 0);
        $is_update = \BetterLinks\Helper::update_link_meta($link_id, 'keywords', $data);
        if ($is_update) {
            return new \WP_REST_Response(
                [
                    'success' => true,
                    'data' => $data,
                ],
                200
            );
        }
        return new \WP_REST_Response(
            [
                'success' => false,
                'data' => [],
            ],
            200
        );
    }

    /**
     * Delete keywords
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Request
     */
    public function delete_item($request)
    {
        return new \WP_REST_Response(
            [
                'success' => true,
                'data' => [],
            ],
            200
        );
    }

    public function prepare_item_for_db($params)
    {
        return [
            'keywords' => (isset($params['keywords']) ? sanitize_text_field($params['keywords']) : ''),
            'link_id' => (isset($params['chooseLink']) ? intval(sanitize_text_field($params['chooseLink'])) : ''),
            'post_type' => (isset($params['postType']) ? array_map('sanitize_text_field', $params['postType']) : ''),
            'category' => (isset($params['category']) ? array_map('sanitize_text_field', $params['category']) : ''),
            'tags' => (isset($params['tags']) ? array_map('sanitize_text_field', $params['tags']) : ''),
            'open_new_tab' => (isset($params['openNewTab']) ? intval(sanitize_text_field($params['openNewTab'])) : '') ,
            'use_no_follow' => (isset($params['useNoFollow']) ? intval(sanitize_text_field($params['useNoFollow'])) : '') ,
            'case_sensitive' => (isset($params['caseSensitive']) ? intval(sanitize_text_field($params['caseSensitive'])) : ''),
            'left_boundary' => (isset($params['leftBoundary']) ? sanitize_text_field($params['leftBoundary']) : ''),
            'right_boundary' => (isset($params['rightBoundary']) ? sanitize_text_field($params['rightBoundary']) : ''),
            'keyword_before' => (isset($params['keywordBefore']) ? sanitize_text_field($params['keywordBefore']) : ''),
            'limit' => (isset($params['limit']) ? intval(sanitize_text_field($params['limit'])) : ''),
            'priority' => (isset($params['priority']) ? intval(sanitize_text_field($params['priority'])) : ''),
            'keyword_after' => (isset($params['keywordAfter']) ?sanitize_text_field($params['keywordAfter']) : ''),
        ];
    }

    /**
     * Check if a given request has access to update a setting
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|bool
     */
    public function get_items_permissions_check($request)
    {
        return apply_filters('betterlinks/api/keywords_get_items_permissions_check', current_user_can('manage_options'));
    }

    /**
     * Check if a given request has access to update a setting
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|bool
     */
    public function create_item_permissions_check($request)
    {
        return apply_filters('betterlinks/api/keywords_create_item_permissions_check', current_user_can('manage_options'));
    }

    /**
     * Check if a given request has access to update a setting
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|bool
     */
    public function update_item_permissions_check($request)
    {
        return apply_filters('betterlinks/api/keywords_update_item_permissions_check', current_user_can('manage_options'));
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
