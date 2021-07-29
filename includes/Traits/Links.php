<?php
namespace BetterLinks\Traits;

trait Links
{
    public function parse_response($items, $analytic)
    {
        $results = [];
        foreach ($items as $item) {
            //insert analytic data
            if (isset($analytic[$item->ID])) {
                $item->analytic = $analytic[$item->ID];
            }

            // formatting response
            if (!isset($results[$item->cat_id])) {
                $results[$item->cat_id] = [
                    'term_name' => $item->term_name,
                    'term_slug' => $item->term_slug,
                    'term_type' => $item->term_type,
                ];
                if ($item->ID !== null) {
                    $results[$item->cat_id]['lists'][] = $item;
                } else {
                    $results[$item->cat_id]['lists'] = [];
                }
            } else {
                $results[$item->cat_id]['lists'][] = $item;
            }
        }
        return $results;
    }
    public function get_all_links_data()
    {
        global $wpdb;
        $prefix = $wpdb->prefix;
        $query = \BetterLinks\Helper::DB();
        $analytic = get_option('betterlinks_analytics_data');
        $analytic = $analytic ? json_decode($analytic, true) : [];
        $results = $query
                ->query(
                    "SELECT 
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
				{$prefix}betterlinks.short_url,
				{$prefix}betterlinks.link_date,
				{$prefix}betterlinks.wildcards,
				{$prefix}betterlinks.expire,
				{$prefix}betterlinks.dynamic_redirect
			FROM {$prefix}betterlinks_terms
			LEFT JOIN  {$prefix}betterlinks_terms_relationships ON {$prefix}betterlinks_terms.ID = {$prefix}betterlinks_terms_relationships.term_id
			LEFT JOIN  {$prefix}betterlinks ON {$prefix}betterlinks.ID = {$prefix}betterlinks_terms_relationships.link_id
			WHERE {$prefix}betterlinks_terms.term_type = 'category' ORDER BY {$prefix}betterlinks.link_order ASC"
                )
                ->get();

        return $this->parse_response($results, $analytic);
    }
    public function insert_link($arg)
    {
        if (isset($arg['short_url']) && ! \BetterLinks\Helper::is_exists_short_url($arg['short_url'])) {
            $resutls = \BetterLinks\Helper::DB()
            ->table('betterlinks')
            ->where('short_url', '=', $arg['short_url'])->get();
            if (count($resutls) === 0) {
                \BetterLinks\Helper::DB()->transaction(function ($qb) use ($arg) {
                    $lookFor = array_combine(array_keys($this->links_schema()), array_keys($this->links_schema()));
                    $params = array_intersect_key($arg, $lookFor);
                    $params['link_author'] = get_current_user_id();
                    $id = $qb->table('betterlinks')->insert(apply_filters('betterlinks/api/params', $params));
                    if (BETTERLINKS_EXISTS_LINKS_JSON) {
                        $params['ID'] = $id;
                        \BetterLinks\Helper::insert_json_into_file(trailingslashit(BETTERLINKS_UPLOAD_DIR_PATH) . 'links.json', $params);
                    }
                    $this->terms_insert($qb, $id, $arg);
                    $_SESSION['link_ID'] = $id;
                });
                $response = array_merge($arg, [
                    'ID' => strval($_SESSION['link_ID']),
                ]);
                unset($_SESSION['link_ID']);
                return $response;
            }
        }
        return false;
    }
}
