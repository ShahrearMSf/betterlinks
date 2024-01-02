<?php
namespace BetterLinks\Traits;

trait Terms
{
    public function prepare_all_tags($tags) {
        global $wpdb;
        $prefix = $wpdb->prefix;
        $analytic = get_option('betterlinks_analytics_data');
        $analytic = $analytic ? json_decode($analytic, true) : [];
        
        $query = "select tl.id, c.link_id from {$prefix}betterlinks_clicks as c right join 
            (select t.id, tr.link_id from {$prefix}betterlinks_terms as t 
            left join {$prefix}betterlinks_terms_relationships as tr on t.id=tr.term_id where t.term_type='tags') as tl 
            on c.link_id=tl.link_id where c.link_id!='' group by c.link_id, id";

        $results = $wpdb->get_results($query, ARRAY_A);



        foreach ($tags as $tvalue) {
            $tvalue['analytic'] = [
                'link_count' => 0,
                'ip' => 0
            ];
            foreach ($results as $lvalue) {
                if( $tvalue['id'] == $lvalue['id'] ) {
                    // error_log(json_encode($analytic[$lvalue['link_id']]));
                    $tvalue['analytic']['link_count'] += $analytic[$lvalue['link_id']]['link_count'];
                    $tvalue['analytic']['ip'] += $analytic[$lvalue['link_id']]['ip'];
                }
            }
            error_log( json_encode($tvalue) );
        }

        // error_log(json_encode($analytic));

        // return $results;
    }

    public function get_all_tags() {
        global $wpdb;
        $query = "SELECT id, term_name, term_slug, link_count from {$wpdb->prefix}betterlinks_terms as t left join (select term_id, count(term_id) as link_count from {$wpdb->prefix}betterlinks_terms_relationships group by term_id) as tr on t.id=tr.term_id where t.term_type='tags'";
		return $wpdb->get_results($query, ARRAY_A);
    }

    public function get_all_terms_data($args)
    {
        if (isset($args['ID'])) {
            $results = \BetterLinks\Helper::get_terms_by_link_ID_and_term_type($args['ID'], $args['term_type']);
        } else {
            $results = \BetterLinks\Helper::get_terms_all_data();
        }
        return $results;
    }
    public function create_term($args)
    {
        $term_id = \BetterLinks\Helper::insert_term($args);
        if ($term_id) {
            $args['ID'] = $term_id;
            $args['lists'] = [];
            return $args;
        }
        return [];
    }
    public function update_term($args)
    {
        \BetterLinks\Helper::insert_term([
            'ID' => $args['cat_id'],
            'term_name' => $args['cat_name'],
            'term_slug' => $args['cat_slug'],
            'term_type' => 'category'
        ], true);
        return $args;
    }
    public function update_tag($args)
    {
        \BetterLinks\Helper::insert_term([
            'ID' => $args['ID'],
            'term_name' => $args['term_name'],
            'term_slug' => $args['term_slug'],
            'term_type' => 'tags'
        ], true);
        // $args['id'] = $args['ID'];
        return $args;
    }
    public function delete_term($args)
    {
        if (isset($args['cat_id']) && $args['cat_id'] != 1) {
            \BetterLinks\Helper::delete_term_and_update_term_relationships($args['cat_id']);
        }
        if ( isset($args['tag_id']) &&  '' !== $args['tag_id'] ) {
            \BetterLinks\Helper::delete_term_and_update_term_relationships($args['tag_id']);
        }
    }
}
