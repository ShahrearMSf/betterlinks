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
    public function sanitize_links_data($POST)
    {
        $data = [];
        foreach ($this->get_links_schema() as $key => $schema) {
            if (isset($POST[$key])) {
                if (isset($schema['sanitize_callback'])) {
                    $data[$key] = $schema['sanitize_callback']($POST[$key]);
                } elseif (isset($schema['format']) && $schema['format'] == 'date-time') {
                    $data[$key] = sanitize_text_field($POST[$key]);
                } elseif (isset($schema['type']) && $schema['type'] === 'object') {
                    $tempData = (is_array($POST[$key]) ? $POST[$key] : json_decode(html_entity_decode(stripslashes($POST[$key])), true));
                    $tempSanitizeData = [];
                    if (isset($schema['properties']) && is_array($tempData)) {
                        foreach ($schema['properties'] as $innerKey => $innerSchema) {
                            if ($innerSchema['type'] === 'integer' || $innerSchema['type'] === 'string') {
                                if (isset($innerSchema['sanitize_callback'])) {
                                    $tempSanitizeData[$innerKey] = $innerSchema['sanitize_callback']($tempData[$innerKey]);
                                } elseif (isset($innerSchema['format']) && $innerSchema['format'] == 'date-time') {
                                    $tempSanitizeData[$innerKey] = sanitize_text_field($tempData[$innerKey]);
                                }
                            } elseif ($innerSchema['type'] === 'array') {
                                $tempTwoSanitizeData = [];
                                if (isset($tempData['value']) && is_array($tempData['value'])) {
                                    foreach ($tempData['value'] as $valueItem) {
                                        $value = [];
                                        if (is_array($valueItem)) {
                                            foreach ($valueItem as $childValueKey => $childValueItem) {
                                                $value[$childValueKey] = \BetterLinks\Helper::sanitize_text_or_array_field($childValueItem);
                                            }
                                        }
                                        $tempTwoSanitizeData[] = $value;
                                    }
                                }
                                $tempSanitizeData[$innerKey] = $tempTwoSanitizeData;
                            } elseif ($innerSchema['type'] === 'object') {
                                $tempThreeSanitizeData = [];
                                if (isset($tempData['extra']) && is_array($tempData['extra'])) {
                                    foreach ($tempData['extra'] as $extraKey => $extraItem) {
                                        $tempThreeSanitizeData[$extraKey] = sanitize_text_field($extraItem);
                                    }
                                }
                                $tempSanitizeData[$innerKey] = $tempThreeSanitizeData;
                            }
                        }
                    }
                    $data[$key] = $tempSanitizeData;
                } elseif ($key === 'tags_id') {
                    $tags = (is_array($POST[$key]) ? $POST[$key] : json_decode(html_entity_decode(stripslashes($POST[$key])), true));
                    $data[$key] = \BetterLinks\Helper::sanitize_text_or_array_field($tags);
                }
            }
        }
        return $data;
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
    public function terms_insert($link_id, $request, $is_update = false)
    {
        global $wpdb;
        $term_data = [];
        $newTermList = [];
        // store tags relation data
        if (isset($request['cat_id']) && !empty($request['cat_id'])) {
            if (is_numeric($request['cat_id'])) {
                $term_data[] = [
                    'term_id' => $request['cat_id'],
                    'link_id' => $link_id,
                ];
            } else {
                $newTermList[] = [
                    'term_name' => $request['cat_id'],
                    'term_slug' => $request['cat_id'],
                    'term_type' => 'category',
                ];
            }
        }
        if (isset($request['tags_id']) && is_array($request['tags_id'])) {
            foreach ($request['tags_id'] as $key => $value) {
                if (is_numeric($value)) {
                    $term_data[] = [
                        'term_id' => $value,
                        'link_id' => $link_id,
                    ];
                } else {
                    $newTermList[] = [
                        'term_name' => $value,
                        'term_slug' => $value,
                        'term_type' => 'tags',
                    ];
                }
            }
        }

        // insert new tags or category
        if (count($newTermList) > 0) {
            foreach ($newTermList as $item) {
                $term_id = \BetterLinks\Helper::insert_terms($item);
                $term_data[] = [
                    'term_id' => $term_id,
                    'link_id' => $link_id,
                ];
            }
        }
        // make term and link relation
        // delete term relation
        if ($is_update) {
            $wpdb->delete($wpdb->prefix . 'betterlinks_terms_relationships', array( 'ID' => $link_id ), array( '%d' ));
        }
        foreach ($term_data as $term) {
            \BetterLinks\Helper::insert_terms_relationships($term['term_id'], $term['link_id']);
        }
    }
    public function insert_link($arg)
    {
        if (isset($arg['short_url']) && ! \BetterLinks\Helper::is_exists_short_url($arg['short_url'])) {
            // Start Transaction
            global $wpdb;
            $wpdb->query("START TRANSACTION");
            $lookFor = array_combine(array_keys($this->links_schema()), array_keys($this->links_schema()));
            $params = array_intersect_key($arg, $lookFor);
            // insert link
            $id = \BetterLinks\Helper::insert_links(apply_filters('betterlinks/api/params', $params));
            if (BETTERLINKS_EXISTS_LINKS_JSON) {
                $params['ID'] = $id;
                \BetterLinks\Helper::insert_json_into_file(trailingslashit(BETTERLINKS_UPLOAD_DIR_PATH) . 'links.json', $params);
            }
            $this->terms_insert($id, $arg);
            $wpdb->query("COMMIT");
            $response = array_merge($arg, [
                    'ID' => strval($id),
                ]);
            return $response;
        }
        return false;
    }
    public function update_link($arg)
    {
        // Start Transaction
        global $wpdb;
        $wpdb->query("START TRANSACTION");
        $lookFor = array_combine(array_keys($this->links_schema()), array_keys($this->links_schema()));
        $params = array_intersect_key($arg, $lookFor);
        $old_short_url = isset($arg['old_short_url']) ? $arg['old_short_url'] : '';
        if (BETTERLINKS_EXISTS_LINKS_JSON) {
            \BetterLinks\Helper::update_json_into_file(trailingslashit(BETTERLINKS_UPLOAD_DIR_PATH) . 'links.json', $params, $old_short_url);
        }
        // update link
        $id = \BetterLinks\Helper::insert_links(apply_filters('betterlinks/api/params', $params), true);
        $this->terms_insert($id, $arg, true);
        $wpdb->query("COMMIT");
    }
    public function delete_link($args)
    {
        \BetterLinks\Helper::DB()
        ->table('betterlinks')
        ->where('id', '=', $args['ID'])
        ->delete();

        \BetterLinks\Helper::DB()
        ->table('betterlinks_clicks')
        ->where('link_id', '=', $args['ID'])
        ->delete();

        \BetterLinks\Helper::DB()
        ->table('betterlinks_terms_relationships')
        ->where('link_id', '=', $args['ID'])
        ->delete();
        if (BETTERLINKS_EXISTS_LINKS_JSON) {
            \BetterLinks\Helper::delete_json_into_file(trailingslashit(BETTERLINKS_UPLOAD_DIR_PATH) . 'links.json', $args['short_url']);
        }
        return true;
    }
}
