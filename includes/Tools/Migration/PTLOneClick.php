<?php
namespace BetterLinks\Tools\Migration;

use BetterLinks\Interfaces\ImportOneClickInterface;

class PTLOneClick extends BaseCSV implements ImportOneClickInterface
{
    public function run_importer($type)
    {
        $resutls = [];
        $prettylinks = get_transient('betterlinks_migration_data_prettylinks');
        foreach ($type as $item) {
            if (isset($prettylinks[$item]) && count($prettylinks[$item]) > 0) {
                if ($item === 'links') {
                    $resutls[] = $this->process_links_data($prettylinks[$item]);
                } elseif ($item === 'clicks') {
                    $resutls[] = $this->process_clicks_data($prettylinks[$item]);
                }
            }
        }
        return  $resutls;
    }
    public function process_links_data($data)
    {
        $author_id = get_current_user_id();
        $message = [];
        foreach ($data as $key => $item) {
            // skip csv header row
            if (empty($item['name']) || $item['name'] == 1) {
                continue;
            }
            
            $slug = \BetterLinks\Helper::make_slug($item['name']);
            $link = apply_filters('betterlinks/tools/migration/ptl_one_click_import_link_arg', [
                    'link_author' => $author_id,
                    'link_date' => $item['created_at'],
                    'link_date_gmt' => $item['created_at'],
                    'link_title' => $item['name'],
                    'link_slug' => $slug,
                    'link_note' => '',
                    'link_status' => 'publish',
                    'nofollow' => isset($item['nofollow']) && $item['nofollow'] == 1 ? $item['nofollow'] : '',
                    'sponsored' => isset($item['sponsored']) && $item['sponsored'] == 1 ? $item['sponsored'] : '',
                    'track_me' => isset($item['track_me']) && $item['track_me'] == 1 ? $item['track_me'] : '',
                    'param_forwarding' => isset($item['param_forwarding']) && $item['param_forwarding'] == 1 ? $item['param_forwarding'] : '',
                    'param_struct' => '',
                    'redirect_type' => isset($item['redirect_type']) ? $item['redirect_type'] : '',
                    'target_url' => isset($item['url']) ? $item['url'] : '',
                    'short_url' => isset($item['slug']) ? rtrim($item['slug'], '/') : '',
                    'link_order' => 0,
                    'link_modified' => isset($item['last_updated_at']) ? $item['last_updated_at'] : '',
                    'link_modified_gmt' => isset($item['last_updated_at']) ? $item['last_updated_at'] : '',
                ], $item);

            $link_id = \BetterLinks\Helper::insert_link($link);
            if ($link_id) {
                $keywords = $this->get_keywords($item['id'], '');
                if (!empty($keywords)) {
                    $keywords = wp_list_pluck($keywords, 'text');
                    $keywords = implode(',', $keywords);
                    $this->insert_keywords($link_id, $keywords);
                }
                if (isset($item['link_cpt_id']) && !empty($item['link_cpt_id'])) {
                    $term = get_the_terms($item['link_cpt_id'], 'pretty-link-category');
                    $term = !empty($term) && is_array($term) ? current($term)->name : 'uncategorized';
                    $terms_ids = \BetterLinks\Helper::insert_category_terms([$term]);
                    if (count($terms_ids) > 0) {
                        foreach ($terms_ids as $term_id) {
                            \BetterLinks\Helper::insert_terms_relationships($term_id, $link_id);
                        }
                    }
                }
                $message[] = 'Imported Successfully "' . $item['name'] . '"';
            } else {
                $message[] = 'import failed "' . $item['name'] . '" already exists';
            }
        }
        return [
            'links' => $message,
        ];
    }

    public function process_clicks_data($data)
    {
        $message = [];
        foreach ($data as $key => $item) {
            // skip csv header row
            if (!isset($item['uri'])) {
                continue;
            }

            $link = \BetterLinks\Helper::get_link_by_short_url(\ltrim($item['uri'], '/'));
            if (count($link) > 0) {
                $click = [
                    'link_id' => $link[0]['ID'],
                    'ip' => $item['ip'],
                    'browser' => $item['browser'],
                    'os' => $item['os'],
                    'referer' => $item['referer'],
                    'host' => $item['host'],
                    'uri' => $item['uri'],
                    'click_count' => '',
                    'visitor_id' => $item['vuid'],
                    'click_order' => '',
                    'created_at' => $item['created_at'],
                    'created_at_gmt' => $item['created_at'],
                ];
                $is_insert = \BetterLinks\Helper::insert_click($click);
                if ($is_insert) {
                    $message[] = 'Imported Successfully "' . $item['uri'] . '"';
                }
            }
        }
        return [
            'clicks' => $message,
        ];
    }
    public function get_keywords($link_id)
    {
        global $wpdb;
        $query = $wpdb->prepare(
            "
                SELECT text
                FROM {$wpdb->prefix}prli_keywords AS kw
                WHERE kw.link_id=%d
            ",
            $link_id
        );
        $resutls = $wpdb->get_results($query);
        if (!empty($resutls)) {
            return  $resutls;
        }
        return;
    }
}
