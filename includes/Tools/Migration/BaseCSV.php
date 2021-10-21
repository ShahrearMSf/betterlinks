<?php
namespace BetterLinks\Tools\Migration;

class BaseCSV
{
    public function insert_link($item)
    {
        if (!isset($item['short_url'])) {
            return;
        }
        $link = \BetterLinks\Helper::get_link_by_short_url($item['short_url']);
        $link_id = 0;
        if (count($link) > 0) {
            $item['ID'] = current($link)['ID'];
            $link_id = \BetterLinks\Helper::insert_link($item, true);
            \BetterLinks\Helper::remove_terms_relationships_by_link_ID($link_id);
        } else {
            $link_id = \BetterLinks\Helper::insert_link($item);
        }
        $tags = \BetterLinks\Helper::insert_tags_terms((!empty($item['tags']) ? explode(',', $item['tags']) : []));
        $category = \BetterLinks\Helper::insert_category_terms((!empty($item['category']) ? explode(',', $item['category']) : ['uncategorized']));
        $all_terms = array_merge($tags, $category);
        if (count($all_terms) > 0 && $link_id > 0) {
            foreach ($all_terms as $term) {
                \BetterLinks\Helper::insert_terms_relationships($term, $link_id);
            }
        }
        return $link_id;
    }
}
