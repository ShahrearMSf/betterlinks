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
        add_action('rest_api_init', array($this, 'register_routes'));
    }

    /**
     * Register the routes for the objects of the controller.
     */
    public function register_routes()
    {
        $endpoint = '/clicks/';
        register_rest_route($this->namespace, $endpoint, array(
            array(
                'methods'               => \WP_REST_Server::READABLE,
                'callback'              => array($this, 'get_value'),
                'permission_callback'   => array($this, 'permissions_check'),
                'args'                  => $this->get_clicks_schema(),
            ),
        ));

        register_rest_route($this->namespace, $endpoint, array(
            array(
                'methods'               => \WP_REST_Server::CREATABLE,
                'callback'              => array($this, 'create_value'),
                'permission_callback'   => array($this, 'permissions_check'),
                'args'                  => $this->get_clicks_schema(),
            ),
        ));

        register_rest_route($this->namespace, $endpoint, array(
            array(
                'methods'               => \WP_REST_Server::EDITABLE,
                'callback'              => array($this, 'update_value'),
                'permission_callback'   => array($this, 'permissions_check'),
                'args'                  => $this->get_clicks_schema(),
            ),
        ));

        register_rest_route($this->namespace, $endpoint, array(
            array(
                'methods'               => \WP_REST_Server::DELETABLE,
                'callback'              => array($this, 'delete_value'),
                'permission_callback'   => array($this, 'permissions_check'),
                'args'                  => $this->get_clicks_schema(),
            ),
        ));
    }

    

    /**
     * Get betterlinks
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Request
     */
    public function get_value($request)
    {
        global $wpdb;
        $prefix = $wpdb->prefix;
        $query = \BetterLinks\Helper::DB();
        $results = $query->query("SELECT {$prefix}betterlinks_clicks.ID as click_ID, link_id, browser, created_at, referer, short_url, target_url, ip,(select count(id) from {$prefix}betterlinks_clicks group by ip) as IPCOUNT from {$prefix}betterlinks_clicks left join {$prefix}betterlinks on {$prefix}betterlinks.id = {$prefix}betterlinks_clicks.link_id group by {$prefix}betterlinks_clicks.id")->get();
        return new \WP_REST_Response(array(
            'success' => true,
            'data' => $results
        ), 200);
    }

    /**
     * Create OR Update betterlinks
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Request
     */
    public function create_value($request)
    {
        return new \WP_REST_Response(array(
            'success'   => false,
            'data'     => []
        ), 200);
    }

    /**
     * Create OR Update betterlinks
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Request
     */
    public function update_value($request)
    {
        return new \WP_REST_Response(array(
            'success'   => false,
            'data'     => []
        ), 200);
    }

    /**
     * Delete betterlinks
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Request
     */
    public function delete_value($request)
    {
        return new \WP_REST_Response(array(
            'success'   => false,
            'data'     => []
        ), 200);
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
