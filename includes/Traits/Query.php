<?php
namespace BetterLinks\Traits;

trait Query
{
    public static function insert_link($item, $is_update = false)
    {
        global $wpdb;
        $defaults = apply_filters('betterlinks/insert_link_default_args', array(
            'link_author' => get_current_user_id(),
            'link_date' => current_time('mysql'),
            'link_date_gmt' => current_time('mysql', 1),
            'link_title' => '',
            'link_slug' => '',
            'link_note' => '',
            'link_status' => 'publish',
            'nofollow' => '',
            'sponsored' => '',
            'track_me' => '',
            'param_forwarding' => '',
            'param_struct' => '',
            'redirect_type' => '',
            'target_url' => '',
            'short_url' => '',
            'link_order' => '',
            'link_modified' => current_time('mysql'),
            'link_modified_gmt' => current_time('mysql', 1),
            'wildcards' => '',
            'expire' => '',
            'dynamic_redirect' => '',
        ));
        $item = wp_parse_args($item, $defaults);
        if ($is_update) {
            $wpdb->update(
                "{$wpdb->prefix}betterlinks",
                array(
                    'link_author' => $item['link_author'],'link_title' => $item['link_title'],'link_slug' => $item['link_slug'],'link_note' => $item['link_note'],'link_status' => $item['link_status'],'nofollow' => $item['nofollow'],'sponsored' => $item['sponsored'],'track_me' => $item['track_me'],'param_forwarding' => $item['param_forwarding'],'param_struct' => $item['param_struct'],'redirect_type' => $item['redirect_type'],'target_url' => $item['target_url'],'short_url' => $item['short_url'],'link_order' => $item['link_order'],'link_modified' => $item['link_modified'],'link_modified_gmt' => $item['link_modified_gmt'],'wildcards' => $item['wildcards'],'expire' => $item['expire'],'dynamic_redirect' => $item['dynamic_redirect']
                ),
                array( 'ID' => $item['ID'] ),
                array(
                    '%d', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%d', '%s', '%s'
                ),
                array( '%d' )
            );
            return $item['ID'];
        } else {
            $betterlinks = self::get_link_by_short_url($item['short_url']);
            if (count($betterlinks) === 0) {
                $wpdb->query(
                    $wpdb->prepare(
                        "INSERT INTO {$wpdb->prefix}betterlinks ( 
                        link_author,link_date,link_date_gmt,link_title,link_slug,link_note,link_status,nofollow,sponsored,track_me,param_forwarding,param_struct,redirect_type,target_url,short_url,link_order,link_modified,link_modified_gmt,wildcards,expire,dynamic_redirect 
                    ) VALUES ( %d, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %d, %s, %s )",
                        array(
                        $item['link_author'],$item['link_date'],$item['link_date_gmt'],$item['link_title'],$item['link_slug'],$item['link_note'],$item['link_status'],$item['nofollow'],$item['sponsored'],$item['track_me'],$item['param_forwarding'],$item['param_struct'],$item['redirect_type'],$item['target_url'],$item['short_url'],$item['link_order'],$item['link_modified'],$item['link_modified_gmt'],$item['wildcards'],$item['expire'],$item['dynamic_redirect']
                    )
                    )
                );
                return $wpdb->insert_id;
            }
        }
        return;
    }
    public static function delete_link($ID)
    {
        global $wpdb;
        $wpdb->delete("{$wpdb->prefix}betterlinks", array( 'ID' => $ID ), array( '%d' ));
        $wpdb->delete("{$wpdb->prefix}betterlinks_clicks", array( 'link_id' => $ID ), array( '%d' ));
        $wpdb->delete("{$wpdb->prefix}betterlinks_terms_relationships", array( 'link_id' => $ID ), array( '%d' ));
    }
    public static function get_prepare_all_links()
    {
        global $wpdb;
        $prefix = $wpdb->prefix;
        $analytic = get_option('betterlinks_analytics_data');
        $analytic = $analytic ? json_decode($analytic, true) : [];
        $results = $wpdb->get_results("SELECT 
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
            WHERE {$prefix}betterlinks_terms.term_type = 'category' ORDER BY {$prefix}betterlinks.link_order ASC", OBJECT);
        $results = \BetterLinks\Helper::parse_link_response($results, $analytic);
        return $results;
    }
    public static function get_link_by_short_url($short_url)
    {
        global $wpdb;
        $link = $wpdb->get_results(
            $wpdb->prepare("SELECT ID, short_url FROM {$wpdb->prefix}betterlinks WHERE short_url=%s", $short_url),
            ARRAY_A
        );
        return $link;
    }
    public static function get_link_by_ID($ID)
    {
        global $wpdb;
        $link = $wpdb->get_results(
            $wpdb->prepare("SELECT ID, short_url FROM {$wpdb->prefix}betterlinks WHERE ID=%d", $ID),
            ARRAY_A
        );
        return $link;
    }

    /**
     * Get All BetterLinks Uploads Links JSON File
     *
     * @return array
     */
    public static function get_links_for_json()
    {
        global $wpdb;
        $prefix = $wpdb->prefix;
        $formattedArray = [];
        $items = $wpdb->get_results("SELECT ID,redirect_type,short_url,link_slug,link_status,target_url,nofollow,sponsored,param_forwarding,track_me,wildcards,expire,dynamic_redirect FROM {$prefix}betterlinks");
        $options = json_decode(get_option(BETTERLINKS_LINKS_OPTION_NAME));
        if (!empty($options)) {
            $formattedArray['wildcards_is_active'] = $options->wildcards;
            $formattedArray['disablebotclicks'] = $options->disablebotclicks;
            $formattedArray['force_https'] = $options->force_https;
        }
        if (is_array($items) && count($items) > 0) {
            foreach ($items as $item) {
                if ($item->wildcards == true) {
                    $formattedArray['wildcards'][$item->short_url] = $item;
                } else {
                    $formattedArray['links'][$item->short_url] = $item;
                }
            }
        }
        return $formattedArray;
    }

    public static function insert_terms($item, $is_update = false)
    {
        global $wpdb;
        if ($is_update) {
            $wpdb->update(
                "{$wpdb->prefix}betterlinks_terms",
                array(
                    'term_name' => $item['term_name'],'term_slug' => $item['term_slug'],'term_type' => $item['term_type']
                ),
                array( 'ID' => $item['ID'] ),
                array(
                    '%s', '%s', '%s'
                ),
                array( '%d' )
            );
            return  $item['ID'];
        } else {
            $terms = $wpdb->get_results(
                $wpdb->prepare("SELECT ID, term_slug FROM {$wpdb->prefix}betterlinks_terms WHERE term_slug=%s", $item['term_slug']),
                ARRAY_A
            );
            if (count($terms) === 0) {
                $wpdb->query(
                    $wpdb->prepare(
                        "INSERT INTO {$wpdb->prefix}betterlinks_terms ( term_name, term_slug, term_type ) VALUES ( %s, %s, %s )",
                        array($item['term_name'],$item['term_slug'], $item['term_type'])
                    )
                );
                return $wpdb->insert_id;
            } elseif (isset(current($terms)['ID'])) {
                return current($terms)['ID'];
            }
        }
        return;
    }
    public static function insert_tags_terms($tags)
    {
        $terms_ids = [];
        if (is_array($tags) && count($tags) > 0) {
            foreach ($tags as $tag) {
                $insert_id = self::insert_terms([
                    'term_name' => $tag,
                    'term_slug' => \BetterLinks\Helper::make_slug($tag),
                    'term_type' => 'tags'
                ]);
                if ($insert_id) {
                    $terms_ids[] = $insert_id;
                }
            }
        }
        return $terms_ids;
    }

    public static function insert_category_terms($categories)
    {
        $terms_ids = [];
        if (is_array($categories) && count($categories) > 0) {
            foreach ($categories as $category) {
                $insert_id = self::insert_terms([
                    'term_name' => $category,
                    'term_slug' => \BetterLinks\Helper::make_slug($category),
                    'term_type' => 'category'
                ]);
                if ($insert_id) {
                    $terms_ids[] = $insert_id;
                }
            }
        }
        return $terms_ids;
    }
    public static function insert_terms_relationships($term_id, $link_id)
    {
        global $wpdb;
        $wpdb->query(
            $wpdb->prepare(
                "INSERT INTO {$wpdb->prefix}betterlinks_terms_relationships ( term_id, link_id ) VALUES ( %d, %d )",
                array($term_id,$link_id)
            )
        );
        return $wpdb->insert_id;
    }

    /**
    * Delete term and update Term relationship to uncategorized
    *
    * @param term_id
    * @return boolean
    */
    public static function delete_term_and_update_term_relationships($term_id)
    {
        global $wpdb;
        $wpdb->query("START TRANSACTION");
        $is_delete = $wpdb->delete($wpdb->prefix . 'betterlinks_terms', array( 'ID' => $term_id ), array( '%d' ));
        if ($is_delete) {
            $term = self::get_term_by_slug('uncategorized');
            if (count($term) > 0) {
                $wpdb->update(
                    "{$wpdb->prefix}betterlinks_terms_relationships",
                    array(
                        'term_id' => current($term)['ID']
                    ),
                    array( 'term_id' => $term_id ),
                    array(
                        '%d',
                    ),
                    array( '%d' )
                );
            }
        }
        $wpdb->query("COMMIT");
        return $is_delete;
    }

    public static function insert_terms_and_terms_relationship($link_id, $request, $is_update = false)
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
            $is_delete = $wpdb->delete($wpdb->prefix . 'betterlinks_terms_relationships', array( 'link_id' => $link_id ), array( '%d' ));
            if ($is_delete) {
                foreach ($term_data as $term) {
                    \BetterLinks\Helper::insert_terms_relationships($term['term_id'], $term['link_id']);
                }
            }
        } else {
            foreach ($term_data as $term) {
                \BetterLinks\Helper::insert_terms_relationships($term['term_id'], $term['link_id']);
            }
        }
    }
    
    public static function get_term_by_slug($slug)
    {
        global $wpdb;
        $link = $wpdb->get_results(
            $wpdb->prepare("SELECT * FROM {$wpdb->prefix}betterlinks_terms WHERE term_slug=%s", $slug),
            ARRAY_A
        );
        return $link;
    }

    public static function insert_click($item)
    {
        global $wpdb;
        $betterlinks = [];
        if (isset($item['short_url'])) {
            $betterlinks = self::get_link_by_short_url($item['short_url']);
        } elseif (isset($item['link_id'])) {
            $betterlinks = self::get_link_by_ID($item['link_id']);
        }
        if (isset(current($betterlinks)['ID'])) {
            $wpdb->query(
                $wpdb->prepare(
                    "INSERT INTO {$wpdb->prefix}betterlinks_clicks ( 
                        link_id, ip, browser, os, referer, host, uri, click_count, visitor_id, click_order, created_at, created_at_gmt
                    ) VALUES ( %d, %s, %s, %s, %s, %s, %s, %d, %s, %d, %s, %s )",
                    array(
                        current($betterlinks)['ID'],$item['ip'],$item['browser'],$item['os'],$item['referer'], $item['host'],$item['uri'],$item['click_count'],$item['visitor_id'],$item['click_order'],$item['created_at'],$item['created_at_gmt']
                    )
                )
            );
            return $wpdb->insert_id;
        }
        return;
    }

    public static function get_links_analytics()
    {
        global $wpdb;
        $prefix = $wpdb->prefix;
        $results = $wpdb->get_results(
            "SELECT DISTINCT link_id, ip,
			(select count(ip) from {$prefix}betterlinks_clicks WHERE CLICKS.ip = {$prefix}betterlinks_clicks.ip  group by ip) as IPCOUNT,
			(select count(link_id) from {$prefix}betterlinks_clicks WHERE CLICKS.link_id = {$prefix}betterlinks_clicks.link_id group by link_id) as LINKCOUNT
			from {$prefix}betterlinks_clicks as CLICKS group by CLICKS.id",
            ARRAY_A
        );
        return $results;
    }

    public static function get_thirstyaffiliates_links()
    {
        $thirstylinks = get_posts(array(
            'posts_per_page' => -1,
            'post_type'      => 'thirstylink',
            'post_status'    => 'publish',
        ));
        $response = [];
        foreach ($thirstylinks as $thirstylink) {
            $term =  wp_get_post_terms($thirstylink->ID, 'thirstylink-category', array( 'fields' => 'names' ));
            $nofollow = get_post_meta($thirstylink->ID, '_ta_no_follow', true);
            $nofollow = ($nofollow == 'global' ? get_option('ta_no_follow', true) : $nofollow);
            $redirect_type = get_post_meta($thirstylink->ID, '_ta_redirect_type', true);
            $redirect_type = ($redirect_type == 'global' ? get_option('ta_link_redirect_type', true) : $redirect_type);
            $param_forwarding = get_post_meta($thirstylink->ID, '_ta_pass_query_str', true);
            $param_forwarding = ($param_forwarding == 'global' ? get_option('ta_pass_query_str', true) : $param_forwarding);
            $response[] = [
                'link_title' => $thirstylink->post_title,
                'link_slug' => $thirstylink->post_name,
                'short_url' => \BetterLinks\Helper::force_relative_url(get_the_permalink($thirstylink->ID)),
                'link_author' => $thirstylink->post_author,
                'link_date' => $thirstylink->post_date,
                'link_date_gmt' => $thirstylink->post_date_gmt,
                'nofollow'  => ($nofollow == 'yes' ? 1 : 0),
                'redirect_type'  => $redirect_type,
                'param_forwarding' => ($param_forwarding == 'yes' ? 1 : 0),
                'target_url' => get_post_meta($thirstylink->ID, '_ta_destination_url', true),
                'link_modified' => $thirstylink->post_modified,
                'link_modified_gmt' => $thirstylink->post_modified_gmt,
                'terms'  => $term
            ];
        }
        return $response;
    }
}
