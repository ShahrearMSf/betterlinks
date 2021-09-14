<?php
namespace BetterLinks\Tools\Migration;

class ThirstyAffiliatesOneClick extends Base
{
    public function run_import($data)
    {
        $links = [];
        $categories = [];
        $author_id = get_current_user_id();
        $catMessage = [];
        $message = [];

        $now = current_time('mysql');
        $now_gmt = current_time('mysql', 1);
        $betterlinks_links = json_decode(get_option('betterlinks_links'));
        if (is_array($data) && count($data) > 0) {
            foreach ($data as $item) {
                $message[] = 'Imported Successfully "' . $item->short_url . '"';
            }
        }
        return [
            'links' => $message
        ];
    }
}
