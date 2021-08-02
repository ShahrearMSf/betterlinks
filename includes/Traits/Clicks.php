<?php
namespace BetterLinks\Traits;

trait Clicks
{
    public function get_clicks_data($from, $to)
    {
        global $wpdb;
        $prefix = $wpdb->prefix;
        $query = \BetterLinks\Helper::DB();
        $results = $query
            ->query(
                "SELECT CLICKS.ID as 
        click_ID, link_id, browser, created_at, referer, short_url, target_url, ip, {$prefix}betterlinks.link_title,
        (select count(id) from {$prefix}betterlinks_clicks where CLICKS.ip = {$prefix}betterlinks_clicks.ip group by ip) as IPCOUNT
		from {$prefix}betterlinks_clicks as CLICKS left join {$prefix}betterlinks on {$prefix}betterlinks.id = CLICKS.link_id WHERE created_at BETWEEN '{$from} 00:00:00' AND '{$to} 23:59:00' group by CLICKS.id ORDER BY CLICKS.created_at DESC"
            )
            ->get();
        return $results;
    }
}
