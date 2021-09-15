<?php
namespace BetterLinks\Traits;

trait Query
{
    public static function insert_links($item)
    {
        global $wpdb;
        $betterlinks = $wpdb->get_results(
            $wpdb->prepare("SELECT short_url FROM {$wpdb->prefix}betterlinks WHERE short_url=%s", $item['short_url']),
            ARRAY_A
        );
        if (count($betterlinks) === 0) {
            $defaults = array(
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
            );
            $item = wp_parse_args($item, $defaults);
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
        return;
    }
    public static function insert_terms($item)
    {
        global $wpdb;
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
        return;
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

    public static function insert_tags_terms($tags)
    {
        $terms_ids = [];
        if (is_array($tags) && count($tags) > 0) {
            foreach ($tags as $tag) {
                $insert_id = \BetterLinks\Helper::insert_terms([
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
                $insert_id = \BetterLinks\Helper::insert_terms([
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

    public static function insert_clicks($item)
    {
        global $wpdb;
        $betterlinks = $wpdb->get_results(
            $wpdb->prepare("SELECT ID, short_url FROM {$wpdb->prefix}betterlinks WHERE short_url=%s", $item['short_url']),
            ARRAY_A
        );
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
