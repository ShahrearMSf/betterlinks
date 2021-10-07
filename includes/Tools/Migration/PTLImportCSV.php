<?php
namespace BetterLinks\Tools\Migration;

class PTLImportCSV
{
    public function process_links_data($data)
    {
        $categories = [];
        $author_id = get_current_user_id();
        $message = [];
        foreach ($data as $key => $item) {
            /*
            Link Header
            (
                [0] => id [1] => url [2] => slug [3] => name [4] => redirect_type [5] => track_me
                [6] => nofollow [7] => sponsored [8] => param_forwarding [9] => google_tracking
                [10] => delay [11] => created_at [12] => last_updated_at [13] => link_categories
                [14] => link_tags [15] => keywords
            )
            */
            // skip csv header row
            if ($key === 0 || empty($item[3]) || $item[3] == 1) {
                continue;
            }

            $slug = \BetterLinks\Helper::make_slug($item[3]);
            $link = apply_filters('betterlinks/tools/migration/ptl_csv_import_link_arg', [
                'link_author' => $author_id,
                'link_date' => $item[11],
                'link_date_gmt' => $item[11],
                'link_title' => $item[3],
                'link_slug' => $slug,
                'link_note' => '',
                'link_status' => 'publish',
                'nofollow' => isset($item[6]) && $item[6] == 1 ? $item[6] : '',
                'sponsored' => isset($item[7]) && $item[7] == 1 ? $item[7] : '',
                'track_me' => isset($item[5]) && $item[5] == 1 ? $item[5] : '',
                'param_forwarding' => isset($item[8]) && $item[8] == 1 ? $item[8] : '',
                'param_struct' => '',
                'redirect_type' => isset($item[4]) ? $item[4] : '',
                'target_url' => isset($item[1]) ? $item[1] : '',
                'short_url' => isset($item[2]) ? $item[2] : '',
                'link_order' => 0,
                'link_modified' => isset($item[12]) ? $item[12] : '',
                'link_modified_gmt' => isset($item[12]) ? $item[12] : '',
            ]);
            $link_id = \BetterLinks\Helper::insert_link($link);

            if ($link_id) {
                $categories = [];
                if (isset($item[13]) && !empty($item[13])) {
                    $categories[$item[2]] = $item[13];
                } else {
                    $categories[$item[2]] = 'uncategorized';
                }
                $terms_ids = \BetterLinks\Helper::insert_category_terms($categories);
                if (count($terms_ids) > 0) {
                    foreach ($terms_ids as $term_id) {
                        \BetterLinks\Helper::insert_terms_relationships($term_id, $link_id);
                    }
                }
                
                $message[] = 'Imported Successfully "' . $item[3] . '"';
            } else {
                $message[] = 'import failed "' . $item[3] . '" already exists';
            }
        }

        return [
            'links' => $message
        ];
    }

    public function process_clicks_data($data)
    {
        $message = [];
        foreach ($data as $key => $item) {
            /*
            Clicks Header
            (
                [0] => Browser [1] => Browser Version [2] => Platform
                [3] => IP [4] => Visitor ID [5] => Timestamp
                [6] => Host [7] => URI [8] => Referrer [9] => Link
            )
            */
            // skip csv header row
            if ($key === 0 && !isset($item[7])) {
                continue;
            }

            $item = \BetterLinks\Helper::sanitize_text_or_array_field($item);

            $link = \BetterLinks\Helper::get_link_by_short_url(\ltrim($item[7], '/'));
            if (count($link) > 0) {
                $click = [
                    'link_id' => $link[0]->ID,
                    'ip' => $item[3],
                    'browser' => $item[0],
                    'os' => $item[2],
                    'referer' => $item[8],
                    'host' => $item[6],
                    'uri' => $item[7],
                    'click_count' => '',
                    'visitor_id' => $item[4],
                    'click_order' => '',
                    'created_at' => $item[5],
                    'created_at_gmt' => $item[5],
                ];
                $is_insert = \BetterLinks\Helper::insert_click($click);
                if ($is_insert) {
                    $message[] = 'Imported Successfully "' . $item[7] . '"';
                }
            }
        }
        return [
            'clicks' => $message,
        ];
    }
}
