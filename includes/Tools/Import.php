<?php
namespace BetterLinks\Tools;

use Error;

class Import
{
    private $DB;
    private $term_IDs = [];
    private $link_IDs = [];
    private $link_header = [];
    public function __construct()
    {
        add_action('admin_init', [$this, 'import_data']);
        add_action('wp_ajax_betterlinks/tools/get_import_info', [$this, 'get_import_info']);
    }
    public function import_data()
    {
        $page = isset($_GET['page']) ? $_GET['page'] : '';
        $import = isset($_GET['import']) ? $_GET['import'] : false;
        if ($page === 'betterlinks-settings' && $import == true) {
            \BetterLinks\Helper::clear_query_cache();
            $this->DB = \BetterLinks\Helper::DB();
            if (!empty($_FILES['upload_file']['tmp_name'])) {
                if ($_POST['mode'] == 'default') {
                    $fileContent = fopen($_FILES['upload_file']['tmp_name'], "r");
                    if (!empty($fileContent)) {
                        $results = $this->process_data($fileContent);
                        set_transient('betterlinks_import_info', json_encode($results), 60 * 60 * 5);
                    }
                } elseif ($_POST['mode'] == 'prettylinks') {
                    $csv = array_map('str_getcsv', file($_FILES['upload_file']['tmp_name'], FILE_SKIP_EMPTY_LINES));
                    if (is_array($csv) && count($csv) > 0) {
                        $PrettyLinks = new Migration\PTLImportCSV($this->DB);
                        if (isset($csv[0][0]) && $csv[0][0] === 'Browser') {
                            // import clicks data
                            $results = $PrettyLinks->process_clicks_data($csv);
                        } else {
                            // import link data
                            $results = $PrettyLinks->process_links_data($csv);
                        }
                        set_transient('betterlinks_import_info', json_encode($results), 60 * 60 * 5);
                    }
                } elseif ($_POST['mode'] == 'simple301redirects') {
                    $fileContent = json_decode(file_get_contents($_FILES['upload_file']['tmp_name']), true);
                    $migrator = new \BetterLinks\Tools\Migration\S301ROneClick($this->DB);
                    $results = $migrator->process_links_data(array_reverse($fileContent));
                    if (!empty($results)) {
                        set_transient('betterlinks_import_info', json_encode($results), 60 * 60 * 5);
                    }
                }
            }
            \BetterLinks\Helper::create_cron_jobs_for_json_links();
            \BetterLinks\Helper::create_cron_jobs_for_analytics();
        }
    }
    public function process_data($csv)
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

    public function prepare_data_before_insert()
    {
    }

    public function insert_link_data($item)
    {
        if (!empty($item['link_title']) && !empty($item['short_url'])) {
            $link_id = \BetterLinks\Helper::insert_links($item);
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
            $link_id = \BetterLinks\Helper::insert_clicks($item);
            return $link_id;
        }
        return;
    }


    public function terms_relationships_data_insert($data)
    {
        $terms = [];
        $message = [];
        foreach ($data as $item) {
            if (isset($this->link_IDs[$item['link_id']])) {
                $item['link_id'] = $this->link_IDs[$item['link_id']];
            }
            if (isset($this->term_IDs[$item['term_id']])) {
                $item['term_id'] = $this->term_IDs[$item['term_id']];
            }
            $terms[] = $item;
        }
        if (count($terms) > 0) {
            $this->DB->table('betterlinks_terms_relationships')->insert($terms);
        }
        return $message;
    }

    public function get_import_info()
    {
        check_ajax_referer('wp_rest', 'security');
        $results = json_encode([]);
        if (get_transient('betterlinks_import_info')) {
            \BetterLinks\Helper::clear_query_cache();
            \BetterLinks\Helper::create_cron_jobs_for_json_links();
            $results = get_transient('betterlinks_import_info');
            delete_transient('betterlinks_import_info');
        }
        wp_send_json_success($results);
        wp_die();
    }
}
