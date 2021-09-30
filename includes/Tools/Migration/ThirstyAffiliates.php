<?php
namespace BetterLinks\Tools\Migration;

class ThirstyAffiliates
{
    private $link_header = [];
    public function run_import($data)
    {
        $message = [];
        if (is_array($data) && count($data) > 0) {
            foreach ($data as $item) {
                if (!empty($item['link_title']) && !empty($item['short_url'])) {
                    $link_id = \BetterLinks\Helper::insert_link($item);
                    if ($link_id) {
                        $terms_ids = \BetterLinks\Helper::insert_category_terms($item['terms']);
                        if (count($terms_ids) > 0) {
                            foreach ($terms_ids as $term_id) {
                                \BetterLinks\Helper::insert_terms_relationships($term_id, $link_id);
                            }
                        }
                        $message[] = 'Imported Successfully "' . $item['short_url'] . '"';
                    } else {
                        $message[] = 'Imported Failed "' . $item['short_url'] . '" already exists.';
                    }
                }
            }
        }
        return [
            'links' => $message
        ];
    }

    public function prepare_csv_data_to_import($csv)
    {
        $results = [];
        $count = 0;
        $betterlinks_links = json_decode(get_option('betterlinks_links', '{}'), true);
        while (($item = fgetcsv($csv)) !== false) {
            if ($count === 0) {
                $count++;
                continue;
            }
            // link status
            $link_status = 'publish';
            $now = time();
            if ($now < strtotime($item[14])) {
                $link_status = 'scheduled';
            }
            if ($now > strtotime($item[14])) {
                $link_status = 'draft';
            }
            // expire
            $expire = [];
            if (!empty($item[14])) {
                $expire = [
                    'status' => 1,
                    'type'   => 'date',
                    'date'  => $item[14],
                ];
            }
            if (!empty($item[13])) {
                $expire['redirect_status'] = 1;
                $expire['redirect_url'] = $item[13];
            }


            $results[] = [
                'link_title'    =>  $item[0],
                'link_slug'     =>  $item[2],
                'link_status'   => $link_status,
                'nofollow'  => ($item[16] == 'global' ? $betterlinks_links['nofollow'] : $item[16]),
                'sponsored'  => $betterlinks_links['sponsored'],
                'track_me'  => $betterlinks_links['track_me'],
                'param_forwarding'  => ($item[17] == 'global' ? $betterlinks_links['param_forwarding'] : $item[17]),
                'redirect_type'  => ($item[18] == 'global' ? $betterlinks_links['redirect_type'] : $item[18]),
                'target_url'  => $item[1],
                'short_url'  => (isset($betterlinks_link['prefix']) && !empty($betterlinks_link['prefix']) ? $betterlinks_link['prefix'] . '/' . $item[2] : $item[2]),
                'expire'  => json_encode($expire),
                'terms'  => explode(',', $item[3]),
            ];
        }
        return $results;
    }
}
