<?php
namespace BetterLinks\Tools\Migration;

class ThirstyAffiliatesOneClick extends Base
{
    public function run_import($data)
    {
        $message = [];
        $betterlinks_links = json_decode(get_option('betterlinks_links'));
        if (is_array($data) && count($data) > 0) {
            foreach ($data as $item) {
                if (!empty($item['link_title']) && !empty($item['short_url'])) {
                    $link_id = \BetterLinks\Helper::insert_link($item);
                    if ($link_id) {
                        $category = $this->insert_category_terms($item['terms']);
                        if (count($category) > 0) {
                            foreach ($category as $term) {
                                \BetterLinks\Helper::insert_terms_relationships($term, $link_id);
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
}
