<?php
namespace BetterLinks\Traits;

trait Clicks {

	public function get_clicks_data( $from, $to ) {
		$results = \BetterLinks\Helper::get_clicks_by_date( $from, $to );
		return $results;
	}
	public function get_analytics_graph_data( $from, $to ) {
		global $wpdb;
		$query = "SELECT count(id) as click_count, DATE(created_at) as c_date FROM {$wpdb->prefix}betterlinks_clicks 
            WHERE created_at  BETWEEN '{$from} 00:00:00' AND '{$to} 23:59:59' GROUP BY c_date ORDER BY c_date DESC";

		$total_counts = $wpdb->get_results( $query, ARRAY_A );

		$query         = "SELECT count(ip) as uniq_count, T1.c_date from ( SELECT ip, DATE( created_at ) as c_date FROM {$wpdb->prefix}betterlinks_clicks 
            WHERE created_at  BETWEEN '{$from} 00:00:00' AND '{$to} 23:59:59' GROUP BY `ip`, `c_date` ) as T1 GROUP BY T1.c_date ORDER BY T1.c_date DESC";
		$unique_counts = $wpdb->get_results( $wpdb->prepare( $query ), ARRAY_A );
		return array(
			'total_count'  => $total_counts,
			'unique_count' => $unique_counts,
		);
	}
	public function get_analytics_unique_list( $from, $to ) {
		global $wpdb;
		$prefix = $wpdb->prefix;
		$query  = "SELECT id as link_id, link_title, short_url, target_url FROM {$prefix}betterlinks l 
        RIGHT JOIN (SELECT distinct link_id from {$prefix}betterlinks_clicks) c ON c.link_id=l.id ORDER BY l.id DESC;";

		$results = $wpdb->get_results( $query, ARRAY_A );
		return $results;
	}

	public function get_individual_analytics_clicks( $id, $from, $to ) {
		global $wpdb;
		$query = "SELECT * FROM {$wpdb->prefix}betterlinks_clicks WHERE link_id={$id} AND created_at BETWEEN '{$from} 00:00:00' AND '{$to} 23:59:59'";

		return $wpdb->get_results( $query, ARRAY_A );
	}
	public function get_individual_graph_data( $id, $from, $to ) {
		global $wpdb;
		$query = "SELECT count(ip) as uniq_count, T1.c_date from ( SELECT ip, DATE( created_at ) as c_date FROM {$wpdb->prefix}betterlinks_clicks 
        WHERE link_id={$id} and created_at  BETWEEN '{$from} 00:00:00' AND '{$to} 23:59:59' GROUP BY `ip`, `c_date` ) as T1 GROUP BY T1.c_date ORDER BY T1.c_date DESC";

		$unique_clicks = $wpdb->get_results( $query, ARRAY_A );

		$query = "SELECT count(id) as click_count, DATE(created_at) as c_date FROM {$wpdb->prefix}betterlinks_clicks 
        WHERE link_id={$id} and created_at  BETWEEN '{$from} 00:00:00' AND '{$to} 23:59:59' GROUP BY c_date ORDER BY c_date DESC";

		$total_clicks = $wpdb->get_results( $query, ARRAY_A );

		return array(
			'total_count'  => $total_clicks,
			'unique_count' => $unique_clicks,
		);
	}
	public function get_individual_link_details( $id ) {
		global $wpdb;

		$query = "SELECT link_title, short_url, target_url FROM {$wpdb->prefix}betterlinks where id={$id}";
		return $wpdb->get_row( $query );
	}
}
