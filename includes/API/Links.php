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
            if(!isset($results[$item->cat_id])){
                $results[$item->cat_id] = array(
                    'term_name' => $item->term_name,
                    'term_slug' => $item->term_slug,
                    'term_type' => $item->term_type,
                );
                if($item->ID !== null){
                    $results[$item->cat_id]['lists'][] = $item;
                } else {
                    $results[$item->cat_id]['lists'] =  [];
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
    public function get_value($request)
    {
        global $wpdb;
        $prefix = $wpdb->prefix;
        $query = \BetterLinks\Helper::DB();
        $results = $query->query("SELECT 
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
            {$prefix}betterlinks.short_url
        FROM {$prefix}betterlinks_terms
        LEFT JOIN  {$prefix}betterlinks_terms_relationships ON {$prefix}betterlinks_terms.ID = {$prefix}betterlinks_terms_relationships.term_id
        LEFT JOIN  {$prefix}betterlinks ON {$prefix}betterlinks.ID = {$prefix}betterlinks_terms_relationships.link_id
        WHERE {$prefix}betterlinks_terms.term_type = 'category'
        ")->get();
        return new \WP_REST_Response(array(
            'success' => is_bool($results),
            'data' => $this->parse_response($results)
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
        $request = $request->get_params();    
        \BetterLinks\Helper::DB()->transaction(function ($qb) use($request) {
            $term_data = [];
            $lookFor = array_combine(array_keys($this->links_schema()), array_keys($this->links_schema()));
            $params = array_intersect_key($request['params'], $lookFor);
            $this->insert_json_into_file(trailingslashit( BETTERLINKS_UPLOAD_DIR_PATH ) . 'links.json', $params);
            $id = $qb->table('betterlinks')->insert($params);
            // store tags relation data
            if(isset($request['params']['cat_id']) && !empty($request['params']['cat_id'])){
                $term_data[] = [
                    'term_id' => $request['params']['cat_id'],
                    'link_id'  => $id
                ];
            }
            if(isset($request['params']['tags_id']) && is_array($request['params']['tags_id'])){
                $newTagsList = [];
                foreach($request['params']['tags_id'] as $key => $value){
                    if(is_numeric($value)){
                        $term_data[] = [
                            'term_id' =>  $value,
                            'link_id'  => $id
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
                if(count($newTagsList) > 0){
                    $tagsList = $qb->table('betterlinks_terms')->insert($newTagsList);
                    foreach($tagsList as $tagsItem){
                        $term_data[] = [
                            'term_id' =>  $tagsItem,
                            'link_id'  => $id
                        ];
                    }
                }
            }
            $qb->table('betterlinks_terms_relationships')->insert($term_data);
            $_SESSION["link_ID"] = $id;
        });
        $response = array_merge($request['params'], array('ID' => strval($_SESSION["link_ID"])));
        unset($_SESSION["link_ID"]);
        return new \WP_REST_Response(array(
            'success'   => true,
            'data'     => $response
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
        $request = $request->get_params();    
        \BetterLinks\Helper::DB()->transaction(function ($qb) use($request) {
            $term_data = [];
            $lookFor = array_combine(array_keys($this->links_schema()), array_keys($this->links_schema()));
            $params = array_intersect_key($request['params'], $lookFor);
            $this->update_json_into_file(trailingslashit( BETTERLINKS_UPLOAD_DIR_PATH ) . 'links.json', $params);
            $id = $qb->table('betterlinks')->where('ID', $params['ID'])->update($params);
            // store tags relation data
            if(isset($request['params']['cat_id']) && !empty($request['params']['cat_id'])){
                $term_data[] = [
                    'term_id' => (isset($request['params']['cat_id']) ? $request['params']['cat_id'] : 1),
                    'link_id'  => (isset($params['ID']) ? $params['ID'] : $id)
                ];
            }
            if(isset($request['params']['tags_id']) && is_array($request['params']['tags_id'])){
                $newTagsList = [];
                foreach($request['params']['tags_id'] as $key => $value){
                    if(is_numeric($value)){
                        $term_data[] = [
                            'term_id' =>  $value,
                            'link_id'  => (isset($params['ID']) ? $params['ID'] : $id)
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
                if(count($newTagsList) > 0){
                    $tagsList = $qb->table('betterlinks_terms')->insert($newTagsList);
                    foreach($tagsList as $tagsItem){
                        $term_data[] = [
                            'term_id' =>  $tagsItem,
                            'link_id'  => (isset($params['ID']) ? $params['ID'] : $id)
                        ];
                    }
                }
            }
            $qb->table('betterlinks_terms_relationships')->where('link_id', '=', $request['params']['ID'])->delete();
            $qb->table('betterlinks_terms_relationships')->insert($term_data);
        });
        return new \WP_REST_Response(array(
            'success'   => true,
            'data'     => $request['params']
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
        \BetterLinks\Helper::DB()->table('betterlinks')->where('id', '=', $request['ID'])->delete();
        $this->delete_json_into_file(trailingslashit( BETTERLINKS_UPLOAD_DIR_PATH ) . 'links.json', $request['short_url']);
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
