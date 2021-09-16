<?php
namespace BetterLinks\Traits;

trait Terms
{
    public function get_all_terms_data($args)
    {
        global $wpdb;
        $prefix = $wpdb->prefix;
        $query = \BetterLinks\Helper::DB();
        if (isset($args['ID'])) {
            $results = $query
                ->query(
                    "SELECT 
            {$prefix}betterlinks_terms.ID as term_id, 
            {$prefix}betterlinks_terms.term_name, 
            {$prefix}betterlinks_terms.term_slug,
            {$prefix}betterlinks_terms.term_type
            FROM {$prefix}betterlinks_terms
            LEFT JOIN  {$prefix}betterlinks_terms_relationships ON {$prefix}betterlinks_terms.ID = {$prefix}betterlinks_terms_relationships.term_id
            LEFT JOIN  {$prefix}betterlinks ON {$prefix}betterlinks.ID = {$prefix}betterlinks_terms_relationships.link_id
            WHERE {$prefix}betterlinks_terms_relationships.link_id = {$args['ID']} 
            AND {$prefix}betterlinks_terms.term_type = '{$args['term_type']}'
            "
                )
                ->get();
        } else {
            $results = $query->table('betterlinks_terms')->get();
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
    public function delete_term($args)
    {
        if ($args['cat_id'] != 1) {
            \BetterLinks\Helper::delete_term_and_update_term_relationships($args['cat_id']);
        }
    }
}
