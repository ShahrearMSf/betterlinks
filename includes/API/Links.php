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
        add_action('rest_api_init', array($this, 'register_routes'));
    }

    /**
     * Register the routes for the objects of the controller.
     */
    public function register_routes()
    {
        $endpoint = '/links/';
        register_rest_route($this->namespace, $endpoint, array(
            array(
                'methods'               => \WP_REST_Server::READABLE,
                'callback'              => array($this, 'get_value'),
                'permission_callback'   => array($this, 'permissions_check'),
                'args'                  => $this->get_links_schema(),
            ),
        ));

        register_rest_route($this->namespace, $endpoint, array(
            array(
                'methods'               => \WP_REST_Server::CREATABLE,
                'callback'              => array($this, 'update_value'),
                'permission_callback'   => array($this, 'permissions_check'),
                'args'                  => $this->get_links_schema(),
            ),
        ));

        register_rest_route($this->namespace, $endpoint, array(
            array(
                'methods'               => \WP_REST_Server::EDITABLE,
                'callback'              => array($this, 'update_value'),
                'permission_callback'   => array($this, 'permissions_check'),
                'args'                  => $this->get_links_schema(),
            ),
        ));

        register_rest_route($this->namespace, $endpoint, array(
            array(
                'methods'               => \WP_REST_Server::DELETABLE,
                'callback'              => array($this, 'delete_value'),
                'permission_callback'   => array($this, 'permissions_check'),
                'args'                  => $this->get_links_schema(),
            ),
        ));
    }

    public function parse_response($items){
        $results = [];
        foreach($items as $item){
            if(!isset($results[$item->term_id])){
                $results[$item->term_id] = array(
                    'term_name' => $item->term_name,
                    'term_type' => $item->term_type,
                );
                $results[$item->term_id]['lists'][] = $item;
                
            } else {
                $results[$item->term_id]['lists'][] = $item;
            }
        }
        return $results;
    }

    /**
     * Get wpsp
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Request
     */
    public function get_value($request)
    {
        $query = \BetterLinks\Helper::DB();
        // $query = $query->table('better_links')->join('better_terms', 'better_links.term_id', '=', 'better_terms.ID')->where('term_type', '=', 'category')->get();

        $query = $query->table('better_terms')->join('better_links', 'better_terms.ID', '=', 'better_links.term_id')->where('term_type', '=', 'category')->get();
        return new \WP_REST_Response(array(
            'success' => true,
            'data' => $this->parse_response($query)
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
        $updated = update_option($this->settings_name, $request->get_param('wpspSetting'));

        return new \WP_REST_Response(array(
            'success'   => $updated,
            'value'     => $request->get_param('wpspSetting')
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
        $deleted = delete_option($this->settings_name);

        return new \WP_REST_Response(array(
            'success'   => $deleted,
            'value'     => ''
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
