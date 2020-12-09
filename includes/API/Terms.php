<?php
namespace BetterLinks\API;

use BetterLinks\Traits\ArgumentSchema;


class Terms extends Controller {
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
        $endpoint = '/terms/';
        register_rest_route($this->namespace, $endpoint, array(
            array(
                'methods'               => \WP_REST_Server::READABLE,
                'callback'              => array($this, 'get_value'),
                'permission_callback'   => array($this, 'permissions_check'),
                'args'                  => $this->get_terms_schema(),
            ),
        ));

        register_rest_route($this->namespace, $endpoint, array(
            array(
                'methods'               => \WP_REST_Server::CREATABLE,
                'callback'              => array($this, 'create_value'),
                'permission_callback'   => array($this, 'permissions_check'),
                'args'                  => $this->get_terms_schema(),
            ),
        ));

        register_rest_route($this->namespace, $endpoint, array(
            array(
                'methods'               => \WP_REST_Server::EDITABLE,
                'callback'              => array($this, 'update_value'),
                'permission_callback'   => array($this, 'permissions_check'),
                'args'                  => $this->get_terms_schema(),
            ),
        ));

        register_rest_route($this->namespace, $endpoint, array(
            array(
                'methods'               => \WP_REST_Server::DELETABLE,
                'callback'              => array($this, 'delete_value'),
                'permission_callback'   => array($this, 'permissions_check'),
                'args'                  => $this->get_terms_schema(),
            ),
        ));
    }


    /**
     * Get wpsp
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Request
     */
    public function get_value($request)
    {
        return new \WP_REST_Response(array(
            'success' => true,
            'data' => []
        ), 200);
    }

    /**
     * Create OR Update wpsp
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Request
     */
    public function create_value($request)
    {
        $request = $request->get_params();    
        $id = \BetterLinks\Helper::DB()->table('better_terms')->insert($request['params']);
        $request['params']['ID'] = $id;
        $request['params']['lists'] = [];
        return new \WP_REST_Response(array(
            'success'   => is_bool($id),
            'data'     => $request['params']
        ), 200);
    }

    /**
     * Create OR Update wpsp
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Request
     */
    public function update_value($request)
    {
        $request = $request->get_params();    
        $id = \BetterLinks\Helper::DB()->table('better_terms')->insert($request['params']);
        $request['params']['ID'] = $id;
        $request['params']['lists'] = [];
        return new \WP_REST_Response(array(
            'success'   => is_bool($id),
            'data'     => $request['params']
        ), 200);
    }

    /**
     * Delete wpsp
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Request
     */
    public function delete_value($request)
    {
       
        \BetterLinks\Helper::DB()->table('better_links')->where('id', '=', $request['ID'])->delete();
        return new \WP_REST_Response(array(
            'success'   => true,
            'data'     => [
                'term_id' => $request['term_id'],
                'ID' => $request['ID'],
            ]
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