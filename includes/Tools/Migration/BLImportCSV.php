<?php
namespace BetterLinks\Tools\Migration;

use BetterLinks\Interfaces\ImportCsvInterface;

class BLImportCSV implements ImportCsvInterface
{
    private $link_header = [];

    public function start_importing($csv)
    {
        $link_message = [];
        $click_message = [];
        $count = 0;
        while (($item = fgetcsv($csv)) !== false) {
            if ($count === 0) {
                $this->link_header = $item;
                $count++;
                continue;
            }
            $item = array_combine($this->link_header, $item);
            $item = \BetterLinks\Helper::sanitize_text_or_array_field($item);
            // clicks data import
            if (is_array($item) && count($item) === 12) {
                $is_insert = $this->insert_click_data($item);
                if ($is_insert) {
                    $click_message[] = 'Imported Successfully "' . $item['short_url'] . '"';
                } else {
                    $click_message[] = 'import failed "' . $item['short_url'] . '" already exists';
                }
            } elseif (is_array($item) && count($item) === 24) {
                $is_insert = $this->insert_link_data($item);
                if ($is_insert) {
                    $link_message[] = 'Imported Successfully "' . $item['short_url'] . '"';
                } else {
                    $link_message[] = 'import failed "' . $item['short_url'] . '" already exists';
                }
            }
        }
        return ['links' => $link_message, 'clicks' => $click_message];
    }

    public function insert_link_data($item)
    {
        if (!empty($item['link_title']) && !empty($item['short_url'])) {
            $link_id = \BetterLinks\Helper::insert_link($item);
            if ($link_id) {
                $tags = \BetterLinks\Helper::insert_tags_terms((!empty($item['tags']) ? explode(',', $item['tags']) : []));
                $category = \BetterLinks\Helper::insert_category_terms((!empty($item['category']) ? explode(',', $item['category']) : ['uncategorized']));
                $all_terms = array_merge($tags, $category);
                if (count($all_terms) > 0) {
                    foreach ($all_terms as $term) {
                        \BetterLinks\Helper::insert_terms_relationships($term, $link_id);
                    }
                }
            }
            return $link_id;
        }
        return;
    }

    public function insert_click_data($item)
    {
        if (!empty($item['short_url'])) {
            $link_id = \BetterLinks\Helper::insert_click($item);
            return $link_id;
        }
        return;
    }
}
