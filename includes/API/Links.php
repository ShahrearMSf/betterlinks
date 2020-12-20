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
                'callback'              => array($this, 'create_value'),
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
            if(!isset($results[$item->term_ID])){
                $results[$item->term_ID] = array(
                    'term_name' => $item->term_name,
                    'term_slug' => $item->term_slug,
                    'term_type' => $item->term_type,
                );
                if($item->ID !== null){
                    $results[$item->term_ID]['lists'][] = $item;
                } else {
                    $results[$item->term_ID]['lists'] =  [];
                }
            } else {
                $results[$item->term_ID]['lists'][] = $item;
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
        global $wpdb;
        $prefix = $wpdb->prefix;
        $query = \BetterLinks\Helper::DB();
        $results = $query->query("SELECT 
            {$prefix}better_terms.ID as term_ID, 
            {$prefix}better_terms.term_name, 
            {$prefix}better_terms.term_slug,
            {$prefix}better_terms.term_type, 
            {$prefix}better_links.ID, 
            {$prefix}better_links.link_title,
            {$prefix}better_links.link_slug,
            {$prefix}better_links.link_note,
            {$prefix}better_links.link_status,
            {$prefix}better_links.nofollow,
            {$prefix}better_links.sponsored,
            {$prefix}better_links.track_me,
            {$prefix}better_links.param_forwarding,
            {$prefix}better_links.param_struct,
            {$prefix}better_links.redirect_type,
            {$prefix}better_links.target_url,
            {$prefix}better_links.short_url
        FROM {$prefix}better_terms
        LEFT JOIN  {$prefix}better_terms_relationships ON {$prefix}better_terms.ID = {$prefix}better_terms_relationships.term_id
        LEFT JOIN  {$prefix}better_links ON {$prefix}better_links.ID = {$prefix}better_terms_relationships.link_id
        WHERE {$prefix}better_terms.term_type = 'category'
        ")->get();
        return new \WP_REST_Response(array(
            'success' => is_bool($results),
            'data' => $this->parse_response($results)
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
        \BetterLinks\Helper::DB()->transaction(function ($qb) use($request) {
            $term_data = [];
            $lookFor = array_combine(array_keys($this->links_schema()), array_keys($this->links_schema()));
            $params = array_intersect_key($request['params'], $lookFor);
            $id = $qb->table('better_links')->insert($params);
            // store tags relation data
            if(isset($request['params']['cat_id']) && !empty($request['params']['cat_id'])){
                $term_data[] = [
                    'term_id' => $request['params']['cat_id'],
                    'link_id'  => $id
                ];
            }
            if(isset($request['params']['tags_id']) && is_array($request['params']['tags_id'])){
                foreach($request['params']['tags_id'] as $key => $value){
                    $term_data[] = [
                        'term_id' =>  $value,
                        'link_id'  => $id
                    ];
                }
            }
            $qb->table('better_terms_relationships')->insert($term_data);
        });
        return new \WP_REST_Response(array(
            'success'   => true,
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
        \BetterLinks\Helper::DB()->transaction(function ($qb) use($request) {
            $term_data = [];
            $lookFor = array_combine(array_keys($this->links_schema()), array_keys($this->links_schema()));
            $params = array_intersect_key($request['params'], $lookFor);
            $id = $qb->table('better_links')->where('ID', $params['ID'])->update($params);
            // store tags relation data
            if(isset($request['params']['cat_id']) && !empty($request['params']['cat_id'])){
                $term_data[] = [
                    'term_id' => $request['params']['cat_id'],
                    'link_id'  => (isset($params['ID']) ? $params['ID'] : $id)
                ];
            }
            if(isset($request['params']['tags_id']) && is_array($request['params']['tags_id'])){
                foreach($request['params']['tags_id'] as $key => $value){
                    $term_data[] = [
                        'term_id' =>  $value,
                        'link_id'  => (isset($params['ID']) ? $params['ID'] : $id)
                    ];
                }
            }
            $qb->table('better_terms_relationships')->where('link_id', '=', $request['params']['ID'])->delete();
            $qb->table('better_terms_relationships')->insert($term_data);
        });
        return new \WP_REST_Response(array(
            'success'   => true,
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
