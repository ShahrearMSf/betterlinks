<?php

namespace BetterLinks\Admin;

use BetterLinks\Cron;

class Ajax
{
    public function __construct()
    {
        add_action('wp_ajax_betterlinks/admin/get_prettylinks_data', [$this, 'get_prettylinks_data']);
        add_action('wp_ajax_betterlinks/admin/run_prettylinks_migration', [$this, 'run_prettylinks_migration']);
        add_action('wp_ajax_betterlinks/admin/migration_prettylinks_notice_hide', [$this, 'migration_prettylinks_notice_hide']);
        add_action('wp_ajax_betterlinks/admin/deactive_prettylinks', [$this, 'deactive_prettylinks']);
        add_action('wp_ajax_betterlinks/admin/write_json_links', [$this, 'write_json_links']);
        add_action('wp_ajax_betterlinks/admin/write_json_clicks', [$this, 'write_json_clicks']);
        add_action('wp_ajax_betterlinks/admin/analytics', [$this, 'analytics']);
        add_action('wp_ajax_betterlinks/admin/short_url_unique_checker', [$this, 'short_url_unique_checker']);
        add_action('wp_ajax_betterlinks/admin/cat_slug_unique_checker', [$this, 'cat_slug_unique_checker']);
        add_action('wp_ajax_betterlinks/admin/get_simple301redirects_data', [$this, 'get_simple301redirects_data']);
        add_action('wp_ajax_betterlinks/admin/run_simple301redirects_migration', [$this, 'run_simple301redirects_migration']);
        add_action('wp_ajax_betterlinks/admin/migration_simple301redirects_notice_hide', [$this, 'migration_simple301redirects_notice_hide']);
        add_action('wp_ajax_betterlinks/admin/deactive_simple301redirects', [$this, 'deactive_simple301redirects']);
        add_action('wp_ajax_betterlinks/admin/search_clicks_data', [$this, 'search_clicks_data']);
        add_action('wp_ajax_betterlinks/admin/links_reorder', [$this, 'links_reorder']);
        add_action('wp_ajax_betterlinks/admin/links_move_reorder', [$this, 'links_move_reorder']);
        add_action('wp_ajax_betterlinks/admin/get_links_by_short_url', [$this, 'get_links_by_short_url']);
        // API Fallbck Ajax
        add_action('wp_ajax_betterlinks/admin/get_all_links', [$this, 'get_all_links']);
    }

    public function get_prettylinks_data()
    {
        check_ajax_referer('betterlinks_admin_nonce', 'security');
        if (! current_user_can('manage_options')) {
            wp_die();
        }
        $query = \BetterLinks\Helper::DB();
        $links = $query->table('prli_links')->get();
        $clicks = $query->table('prli_clicks')->get();
        set_transient('betterlinks_migration_data_prettylinks', ['links' => $links, 'clicks' => $clicks], 60 * 5);
        wp_send_json_success(['links' => $links, 'clicks' => $clicks]);
        wp_die();
    }

    public function run_prettylinks_migration()
    {
        check_ajax_referer('betterlinks_admin_nonce', 'security');
        if (! current_user_can('manage_options')) {
            wp_die();
        }
        try {
            $type = isset($_POST['type']) ? sanitize_text_field($_POST['type']) : '';
            $type = explode(',', $type);
            $prettylinks = get_transient('betterlinks_migration_data_prettylinks');
            $DB = \BetterLinks\Helper::DB();
            $migrator = new \BetterLinks\Tools\Migration\PTLOneClick($DB);
            $resutls = [];
            foreach ($type as $item) {
                if (isset($prettylinks[$item]) && count($prettylinks[$item]) > 0) {
                    if ($item === 'links') {
                        $resutls[] = $migrator->process_links_data($prettylinks[$item]);
                    } elseif ($item === 'clicks') {
                        $resutls[] = $migrator->process_clicks_data($prettylinks[$item]);
                    }
                }
            }
            \BetterLinks\Helper::create_cron_jobs_for_json_links();
            \BetterLinks\Helper::clear_query_cache();
            \BetterLinks\Helper::create_cron_jobs_for_analytics();
            update_option('betterlinks_notice_ptl_migrate', true);
            wp_send_json_success($resutls);
            wp_die();
        } catch (\Throwable $th) {
            wp_send_json_error($th->getMessage());
            wp_die();
        }
    }

    public function migration_prettylinks_notice_hide()
    {
        check_ajax_referer('betterlinks_admin_nonce', 'security');
        if (! current_user_can('manage_options')) {
            wp_die();
        }
        $type = isset($_POST['type']) ? sanitize_text_field($_POST['type']) : '';
        if ($type == 'deactive') {
            update_option('betterlinks_hide_notice_ptl_deactive', true);
        } elseif ($type == 'migrate') {
            update_option('betterlinks_hide_notice_ptl_migrate', true);
        }
        wp_die();
    }
    public function deactive_prettylinks()
    {
        check_ajax_referer('betterlinks_admin_nonce', 'security');
        if (! current_user_can('manage_options')) {
            wp_die();
        }
        $deactivate = deactivate_plugins('pretty-link/pretty-link.php');
        wp_send_json_success($deactivate);
        wp_die();
    }
    public function write_json_links()
    {
        check_ajax_referer('betterlinks_admin_nonce', 'security');
        if (apply_filters('betterlinks/admin/current_user_can_edit_settings', current_user_can('manage_options'))) {
            $Cron = new Cron();
            $resutls = $Cron->write_json_links();
            wp_send_json_success($resutls);
            wp_die();
        }
        wp_die();
    }
    public function write_json_clicks()
    {
        check_ajax_referer('betterlinks_admin_nonce', 'security');
        if (apply_filters('betterlinks/admin/current_user_can_edit_settings', current_user_can('manage_options')) && !BETTERLINKS_EXISTS_CLICKS_JSON) {
            $emptyContent = '{}';
            $file_handle = @fopen(trailingslashit(BETTERLINKS_UPLOAD_DIR_PATH) . 'clicks.json', 'wb');
            if ($file_handle) {
                fwrite($file_handle, $emptyContent);
                fclose($file_handle);
            }
            wp_send_json_success(true);
            wp_die();
        }
        wp_send_json_error(false);
        wp_die();
    }
    public function analytics()
    {
        check_ajax_referer('betterlinks_admin_nonce', 'security');
        if (apply_filters('betterlinks/admin/current_user_can_edit_settings', current_user_can('manage_options'))) {
            $Cron = new Cron();
            $resutls = $Cron->analytics();
            wp_send_json_success($resutls);
            wp_die();
        }
        wp_die();
    }
    public function short_url_unique_checker()
    {
        check_ajax_referer('betterlinks_admin_nonce', 'security');
        if (! current_user_can('manage_options')) {
            wp_die();
        }
        $ID = isset($_POST['ID']) ? sanitize_text_field($_POST['ID']) : '';
        $slug = isset($_POST['slug']) ? sanitize_text_field($_POST['slug']) : '';
        $alreadyExists = false;
        $resutls = [];
        if (!empty($slug)) {
            $query = \BetterLinks\Helper::DB()
                ->table('betterlinks')
                ->where('short_url', '=', $slug);
            $resutls = $query->get();
            if (count($resutls) > 0) {
                $alreadyExists = true;
                $resutls = current($resutls);
                if ($resutls->ID == $ID) {
                    $alreadyExists = false;
                }
            }
        }
        wp_send_json_success($alreadyExists);
        wp_die();
    }
    public function cat_slug_unique_checker()
    {
        check_ajax_referer('betterlinks_admin_nonce', 'security');
        if (! current_user_can('manage_options')) {
            wp_die();
        }
        $ID = isset($_POST['ID']) ? sanitize_text_field($_POST['ID']) : '';
        $slug = isset($_POST['slug']) ? sanitize_text_field($_POST['slug']) : '';
        $alreadyExists = false;
        $resutls = [];
        if (!empty($slug)) {
            $query = \BetterLinks\Helper::DB()
                ->table('betterlinks_terms')
                ->where('term_slug', '=', $slug);
            $resutls = $query->get();
            if (count($resutls) > 0) {
                $alreadyExists = true;
                $resutls = current($resutls);
                if ($resutls->ID == $ID) {
                    $alreadyExists = false;
                }
            }
        }
        wp_send_json_success($alreadyExists);
        wp_die();
    }
    public function get_simple301redirects_data()
    {
        check_ajax_referer('betterlinks_admin_nonce', 'security');
        if (! current_user_can('manage_options')) {
            wp_die();
        }
        $links = get_option('301_redirects');
        wp_send_json_success($links);
        wp_die();
    }
    public function run_simple301redirects_migration()
    {
        check_ajax_referer('betterlinks_admin_nonce', 'security');
        if (! current_user_can('manage_options')) {
            wp_die();
        }
        try {
            $simple_301_redirects = get_option('301_redirects');
            $DB = \BetterLinks\Helper::DB();
            $migrator = new \BetterLinks\Tools\Migration\S301ROneClick($DB);
            $resutls = $migrator->process_links_data(array_reverse($simple_301_redirects));
            \BetterLinks\Helper::create_cron_jobs_for_json_links();
            \BetterLinks\Helper::clear_query_cache();
            update_option('betterlinks_notice_s301r_migrate', true);
            wp_send_json_success($resutls);
            wp_die();
        } catch (\Throwable $th) {
            wp_send_json_error($th->getMessage());
            wp_die();
        }
    }
    public function migration_simple301redirects_notice_hide()
    {
        check_ajax_referer('betterlinks_admin_nonce', 'security');
        if (! current_user_can('manage_options')) {
            wp_die();
        }
        $type = isset($_POST['type']) ? sanitize_text_field($_POST['type']) : '';
        if ($type == 'deactive') {
            update_option('betterlinks_hide_notice_s301r_deactive', true);
        } elseif ($type == 'migrate') {
            update_option('betterlinks_notice_s301r_migrate', true);
        }
        wp_die();
    }
    public function deactive_simple301redirects()
    {
        check_ajax_referer('betterlinks_admin_nonce', 'security');
        if (! current_user_can('manage_options')) {
            wp_die();
        }
        $deactivate = deactivate_plugins('simple-301-redirects/wp-simple-301-redirects.php');
        wp_send_json_success($deactivate);
        wp_die();
    }
    public function search_clicks_data()
    {
        check_ajax_referer('betterlinks_admin_nonce', 'security');
        if (! current_user_can('manage_options')) {
            wp_die();
        }
        $title = isset($_GET['title']) ? sanitize_text_field($_GET['title']) : '';
        global $wpdb;
        $prefix = $wpdb->prefix;
        $query = \BetterLinks\Helper::DB();
        $results = $query
            ->query(
                "SELECT CLICKS.ID as 
        click_ID, link_id, browser, created_at, referer, short_url, target_url, ip, {$prefix}betterlinks.link_title,
        (select count(id) from {$prefix}betterlinks_clicks where CLICKS.ip = {$prefix}betterlinks_clicks.ip group by ip) as IPCOUNT
		from {$prefix}betterlinks_clicks as CLICKS left join {$prefix}betterlinks on {$prefix}betterlinks.id = CLICKS.link_id WHERE {$prefix}betterlinks.link_title LIKE '%$title%'  group by CLICKS.id ORDER BY CLICKS.created_at DESC"
            )
            ->get();
        
        wp_send_json_success($results);
        wp_die();
    }
    public function links_reorder()
    {
        check_ajax_referer('betterlinks_admin_nonce', 'security');
        if (! current_user_can('manage_options')) {
            wp_die();
        }
        $links = (isset($_POST['links']) ? explode(',', sanitize_text_field($_POST['links'])) : []);
        $DB = \BetterLinks\Helper::DB();
        if (count($links) > 0) {
            foreach ($links as $key => $value) {
                $DB->table('betterlinks')->where('ID', $value)->update(['link_order' => $key]);
            }
        }
        wp_send_json_success([]);
        wp_die();
    }
    public function links_move_reorder()
    {
        check_ajax_referer('betterlinks_admin_nonce', 'security');
        if (! current_user_can('manage_options')) {
            wp_die();
        }
        $source = (isset($_POST['source']) ? explode(',', sanitize_text_field($_POST['source'])) : []);
        $destination = (isset($_POST['destination']) ? explode(',', sanitize_text_field($_POST['destination'])) : []);
        $DB = \BetterLinks\Helper::DB();
        if (count($source) > 0) {
            foreach ($source as $key => $value) {
                $DB->table('betterlinks')->where('ID', $value)->update(['link_order' => $key]);
            }
        }
        if (count($destination) > 0) {
            foreach ($destination as $key => $value) {
                $DB->table('betterlinks')->where('ID', $value)->update(['link_order' => $key]);
            }
        }
        wp_send_json_success([]);
        wp_die();
    }
    public function get_links_by_short_url()
    {
        check_ajax_referer('betterlinks_admin_nonce', 'security');
        if (! current_user_can('manage_options')) {
            wp_die();
        }
        $short_url = (isset($_POST['short_url']) ? sanitize_text_field($_POST['short_url']) : '');
        global $wpdb;
        $prefix = $wpdb->prefix;
        $query = \BetterLinks\Helper::DB();
        $results = $query
            ->query(
                "SELECT 
				{$prefix}betterlinks.ID, 
				{$prefix}betterlinks.link_title,
				{$prefix}betterlinks.link_slug,
				{$prefix}betterlinks.link_note,
				{$prefix}betterlinks.link_status,
				{$prefix}betterlinks.nofollow,
				{$prefix}betterlinks.sponsored,
				{$prefix}betterlinks.track_me,
				{$prefix}betterlinks.param_forwarding,
				{$prefix}betterlinks.param_struct,
				{$prefix}betterlinks.redirect_type,
				{$prefix}betterlinks.target_url,
				{$prefix}betterlinks.short_url,
				{$prefix}betterlinks.link_date,
				{$prefix}betterlinks.wildcards,
				{$prefix}betterlinks.expire,
				{$prefix}betterlinks_terms_relationships.term_id
			FROM {$prefix}betterlinks
			LEFT JOIN  {$prefix}betterlinks_terms_relationships ON {$prefix}betterlinks_terms_relationships.link_id = {$prefix}betterlinks.ID
			WHERE {$prefix}betterlinks.short_url = '{$short_url}'"
            )->get();
        wp_send_json_success(is_array($results) ? current($results) : false);
        wp_die();
    }

    public function get_all_links()
    {
        check_ajax_referer('betterlinks_admin_nonce', 'security');
        if (! apply_filters('betterlinks/api/links_get_items_permissions_check', current_user_can('manage_options'))) {
            wp_die();
        }

        $cache_data = get_transient(BETTERLINKS_CACHE_LINKS_NAME);
        if (empty($cache_data) || !json_decode($cache_data, true)) {
            global $wpdb;
            $prefix = $wpdb->prefix;
            $query = \BetterLinks\Helper::DB();
            $analytic = get_option('betterlinks_analytics_data');
            $analytic = $analytic ? json_decode($analytic, true) : [];
            $results = $query
                ->query(
                    "SELECT 
				{$prefix}betterlinks_terms.ID as cat_id, 
				{$prefix}betterlinks_terms.term_name, 
				{$prefix}betterlinks_terms.term_slug,
				{$prefix}betterlinks_terms.term_type, 
				{$prefix}betterlinks.ID, 
				{$prefix}betterlinks.link_title,
				{$prefix}betterlinks.link_slug,
				{$prefix}betterlinks.link_note,
				{$prefix}betterlinks.link_status,
				{$prefix}betterlinks.nofollow,
				{$prefix}betterlinks.sponsored,
				{$prefix}betterlinks.track_me,
				{$prefix}betterlinks.param_forwarding,
				{$prefix}betterlinks.param_struct,
				{$prefix}betterlinks.redirect_type,
				{$prefix}betterlinks.target_url,
				{$prefix}betterlinks.short_url,
				{$prefix}betterlinks.link_date,
				{$prefix}betterlinks.wildcards,
				{$prefix}betterlinks.expire,
				{$prefix}betterlinks.dynamic_redirect
			FROM {$prefix}betterlinks_terms
			LEFT JOIN  {$prefix}betterlinks_terms_relationships ON {$prefix}betterlinks_terms.ID = {$prefix}betterlinks_terms_relationships.term_id
			LEFT JOIN  {$prefix}betterlinks ON {$prefix}betterlinks.ID = {$prefix}betterlinks_terms_relationships.link_id
			WHERE {$prefix}betterlinks_terms.term_type = 'category' ORDER BY {$prefix}betterlinks.link_order ASC"
                )
                ->get();

            $results = $this->parse_response($results, $analytic);
            set_transient(BETTERLINKS_CACHE_LINKS_NAME, json_encode($results));
            
            return wp_send_json_success(
                [
                    'success' => true,
                    'cache' => false,
                    'data' => $results,
                ],
                200
            );
            wp_die();
        }
        return wp_send_json_success(
            [
                'success' => true,
                'cache' => true,
                'data' => json_decode($cache_data),
            ],
            200
        );
        wp_die();
    }

    public function parse_response($items, $analytic)
    {
        $results = [];
        foreach ($items as $item) {
            //insert analytic data
            if (isset($analytic[$item->ID])) {
                $item->analytic = $analytic[$item->ID];
            }

            // formatting response
            if (!isset($results[$item->cat_id])) {
                $results[$item->cat_id] = [
                    'term_name' => $item->term_name,
                    'term_slug' => $item->term_slug,
                    'term_type' => $item->term_type,
                ];
                if ($item->ID !== null) {
                    $results[$item->cat_id]['lists'][] = $item;
                } else {
                    $results[$item->cat_id]['lists'] = [];
                }
            } else {
                $results[$item->cat_id]['lists'][] = $item;
            }
        }
        return $results;
    }
}
