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
}
