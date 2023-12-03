<?php
namespace BetterLinks\Traits;

trait Clicks
{
    public function get_clicks_data($from, $to)
    {
        $results = \BetterLinks\Helper::get_clicks_by_date($from, $to);
        return $results;
    }
    public function get_analytics_graph_data($from, $to) {
        global $wpdb;
		$query =  "SELECT id,link_id,ip,created_at FROM {$wpdb->prefix}betterlinks_clicks 
                        WHERE created_at 
                    BETWEEN '{$from} 00:00:00' AND '{$to} 00:00:00' ORDER BY created_at DESC";
		$results = $wpdb->get_results($query, ARRAY_A);
        return $results;
    }
    public function get_analytics_unique_list( $from, $to ) {
        global $wpdb;
        $prefix = $wpdb->prefix;
        $query = "SELECT id as link_id, link_title, short_url, target_url FROM {$prefix}betterlinks l 
        RIGHT JOIN (SELECT distinct link_id from {$prefix}betterlinks_clicks) c ON c.link_id=l.id ORDER BY l.id DESC;";

        $results = $wpdb->get_results( $query, ARRAY_A );
        return $results;
    }

    public function get_individual_analytics_clicks( $id, $from, $to ) {
        global $wpdb;
        $query = "SELECT * FROM {$wpdb->prefix}betterlinks_clicks WHERE link_id={$id} AND created_at BETWEEN '{$from} 00:00:00' AND '{$to} 23:59:59'";

        return $wpdb->get_results( $query, ARRAY_A );
    }
}
