<?php
namespace BetterLinks\Tools\Migration;

use BetterLinks\Interfaces\ImportOneClickInterface;

class PTLOneClick extends BaseCSV implements ImportOneClickInterface
{

    protected $links_batch;
    protected $clicks_batch;

    public function __construct()
    {
        global $wpdb;
        $this->wpdb = $wpdb;
        $this->links_batch = 0;
        $this->clicks_batch = \BetterLinks\Helper::btl_get_option("btl_prettylink_migration_links_batch_pointer");
    }

    public function run_importer($type)
    {
        foreach ($type as $item) {
            if ($item === 'links') {
                $this->recursively_import_links();
            } elseif ($item === 'clicks') {
                $this->recursively_import_clicks();
            }
        }
    }

    public function recursively_import_links()
    {
        $links = \BetterLinks\Helper::get_prettylinks_links($this->links_batch);
        $count_links = is_array($links) ? count($links) : 0;
        if($count_links > 0){
            $this->process_links_data($links);
            $this->links_batch = $this->links_batch + $count_links;
            update_option("btl_prettylink_migration_links_batch_pointer", $this->links_batch, false);
            $this->recursively_import_links();
        }
    }

    public function recursively_import_clicks()
    {
        $batch_pointer = absint($this->clicks_batch);
        $clicks = \BetterLinks\Helper::get_prettylinks_clicks($batch_pointer);
        $count_clicks = is_array($clicks) ? count($clicks) : 0;

        if($count_clicks > 0 && $batch_pointer < 10000000){
            $this->process_clicks_data($clicks)->recursively_import_clicks();
        }
    }

    public function process_links_data($data)
    {
        $author_id = get_current_user_id();
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
                    'short_url' => isset($item['slug']) ? trim($item['slug'], '/') : '',
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
                $curr_link_data = [
                    "item" => $item,
                    "timezone" => get_option("gmt_offset"),
                    "time_hour_minutes" => date('H:i'),
                ];
                update_option("btl_migration_prettylinks_last_successful_link", $curr_link_data, false);
            } else {
                $curr_link_data = [
                    "item" => $item,
                    "timezone" => get_option("gmt_offset"),
                    "time_hour_minutes" => date('H:i'),
                ];
                update_option("btl_migration_prettylinks_last_failed_link", $curr_link_data, false);

                $ptl_failed_links = get_option("btl_failed_migration_prettylinks_links", []);
                array_push($ptl_failed_links, $item["id"]);
                update_option("btl_migration_prettylinks_failed_links", $ptl_failed_links, false);
            }
        }
    }

    public function insert_clicks( $click_id ){
        global $wpdb;
        $item = $wpdb->get_row(
            "SELECT * FROM {$wpdb->prefix}prli_clicks WHERE id = $click_id LIMIT 1",
            ARRAY_A
        );

        if ( empty( $item ) || empty( $item['uri'] ) ) {
            return true;
        }

        $link = \BetterLinks\Helper::get_link_by_short_url(\trim($item['uri'], '/'));

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
                $curr_click_data = [
                    "item" => $item,
                    "timezone" => get_option("gmt_offset"),
                    "time_hour_minutes" => date('H:i'),
                ];
                \BetterLinks\Helper::btl_update_option("btl_migration_prettylinks_last_successful_click", $curr_click_data);
                return true;
            }else{
                $failed_clicks = \BetterLinks\Helper::btl_get_option("btl_failed_migration_prettylinks_clicks_not_inserted");
                if(in_array($item["id"], $failed_clicks)){
                    return true;
                }
                array_push($failed_clicks, $item["id"]);
                \BetterLinks\Helper::btl_update_option("btl_failed_migration_prettylinks_clicks_not_inserted", $failed_clicks);
                return false;
            }
        }else{
            $failed_clicks = \BetterLinks\Helper::btl_get_option("btl_failed_migration_prettylinks_clicks_link_pay_nai_for_the_uri");
            array_push($failed_clicks, $item["id"]);
            \BetterLinks\Helper::btl_update_option("btl_failed_migration_prettylinks_clicks_link_pay_nai_for_the_uri", $failed_clicks);
        }

        return true;
    }

    public function process_clicks_data($clicks)
    {
        foreach ($clicks as $key => $item) {
            // skip csv header row
            if (!isset($item['uri'])) {
                $failed_clicks = \BetterLinks\Helper::btl_get_option("btl_failed_migration_prettylinks_clicks_uri_nai");
                array_push($failed_clicks, $item["id"]);
                \BetterLinks\Helper::btl_update_option("btl_failed_migration_prettylinks_clicks_uri_nai", $failed_clicks);
                continue;
            }

            $link = \BetterLinks\Helper::get_link_by_short_url(\trim($item['uri'], '/'));

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
                    $curr_click_data = [
                        "item" => $item,
                        "timezone" => get_option("gmt_offset"),
                        "time_hour_minutes" => date('H:i'),
                    ];
                    \BetterLinks\Helper::btl_update_option("btl_migration_prettylinks_last_successful_click", $curr_click_data);
                }else{
                    $failed_clicks = \BetterLinks\Helper::btl_get_option("btl_failed_migration_prettylinks_clicks_not_inserted");
                    array_push($failed_clicks, $item["id"]);
                    \BetterLinks\Helper::btl_update_option("btl_failed_migration_prettylinks_clicks_not_inserted", $failed_clicks);
                }
            }else{
                $failed_clicks = \BetterLinks\Helper::btl_get_option("btl_failed_migration_prettylinks_clicks_link_pay_nai_for_the_uri");
                array_push($failed_clicks, $item["id"]);
                \BetterLinks\Helper::btl_update_option("btl_failed_migration_prettylinks_clicks_link_pay_nai_for_the_uri", $failed_clicks);
            }
        }
        $this->clicks_batch = $this->clicks_batch + count($clicks);

        \BetterLinks\Helper::btl_update_option("btl_prettylink_migration_links_batch_pointer", $this->clicks_batch);
        return $this;


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
