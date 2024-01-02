<?php
namespace BetterLinks\Traits;

trait Terms
{
    public function tags_analytic() {

        $analytic = get_option('btl_tags_analytics', []);
        if( count( $analytic ) > 0 ) {
            return $analytic;
        }
        global $wpdb;
        $prefix = $wpdb->prefix;
        
        $query = "select t.id as tag_id,tr.link_id, count(tr.link_id) as total_click from {$prefix}betterlinks_terms t left join {$prefix}betterlinks_terms_relationships tr on t.id=tr.term_id left join {$prefix}betterlinks_clicks c on tr.link_id=c.link_id where term_type='tags' group by tag_id,tr.link_id;";
        $total_clicks = $wpdb->get_results($query, ARRAY_A);

        $prepare_total_clicks = [];
        foreach ($total_clicks as $value) {
            if( isset( $prepare_total_clicks[$value['tag_id']] ) ) {
                $prepare_total_clicks[$value['tag_id']] += $value['total_click'];
                continue;
            }
            $prepare_total_clicks[$value['tag_id']] = $value['total_click'];
        }

        $query = "select t.id as tag_id, count(c.ip) as unique_clicks from {$prefix}betterlinks_terms t left join {$prefix}betterlinks_terms_relationships tr on t.id=tr.term_id left join {$prefix}betterlinks_clicks c on tr.link_id=c.link_id where term_type='tags' group by tag_id, c.ip;";
        $unique_clicks =  $wpdb->get_results($query, ARRAY_A);

        $prepare_unique_clicks = [];

        foreach ($unique_clicks as $value) {
            if( isset($prepare_unique_clicks[$value['tag_id']]) ){
                $prepare_unique_clicks[$value['tag_id']] += 1;
                continue;
            }
            $prepare_unique_clicks[$value['tag_id']] = 1;
        }

        $analytic = array(
            'total_clicks' => $prepare_total_clicks,
            'unique_clicks' => $prepare_unique_clicks
        );
        update_option('btl_tags_analytics', $analytic);
        return $analytic;
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
