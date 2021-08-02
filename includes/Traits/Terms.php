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
        if (isset($args['term_slug'])) {
            $resutls = \BetterLinks\Helper::DB()
                ->table('betterlinks_terms')
                ->where('term_slug', '=', $args['term_slug'])->get();
            if (count($resutls) === 0) {
                $id = \BetterLinks\Helper::DB()
                    ->table('betterlinks_terms')
                    ->insert($args);
                $args['ID'] = $id;
                $args['lists'] = [];
                return $args;
            }
        }
        return [];
    }
    public function update_term($args)
    {
        \BetterLinks\Helper::DB()
            ->table('betterlinks_terms')
            ->where('ID', $args['cat_id'])
            ->update([
                'term_name' => $args['cat_name'],
                'term_slug' => $args['cat_slug'],
            ]);
        return $args;
    }
    public function delete_term($args)
    {
        \BetterLinks\Helper::DB()->transaction(function ($qb) use ($args) {
            if ($args['cat_id'] != 1) {
                $qb->table('betterlinks_terms')
                    ->where('id', '=', $args['cat_id'])
                    ->delete();

                $term = current(
                    $qb
                        ->table('betterlinks_terms')
                        ->where('term_slug', '=', 'uncategorized')
                        ->get()
                );

                $qb->table('betterlinks_terms_relationships')
                    ->where('term_id', '=', $args['cat_id'])
                    ->update(['term_id' => $term->ID]);
            }
        });
    }
}
