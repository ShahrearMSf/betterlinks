<?php
namespace BetterLinks\Tools;

class Export
{
    private $wpdb_prefix;
    private $DB;
    public function __construct()
    {
        add_action('admin_init', [$this, 'export_data']);
    }
    public function export_data()
    {
        $page = isset($_GET['page']) ? $_GET['page'] : '';
        $export = isset($_GET['export']) ? $_GET['export'] : false;
        if ($page === 'betterlinks-settings' && $export == true) {
            $links = $this->get_links();
            $results = [array_keys($links[0])];
            $results = array_merge($results, $links);
            $filename = 'betterlinks.' . date('Y-m-d') . '.csv';
            $this->array_to_csv_download(
                $results, // this array is going to be the second row
                $filename
            );
            exit();
        }
    }
    public function array_to_csv_download($array, $filename = "export.csv", $delimiter=";")
    {
        header('Content-Type: application/csv');
        header('Content-Disposition: attachment; filename="'.$filename.'";');
        $f = fopen('php://output', 'w');
        foreach ($array as $line) {
            fputcsv($f, $line, $delimiter);
        }
    }

    public function process_data($type)
    {
        global $wpdb;
        $this->wpdb_prefix = $wpdb->prefix;
        $this->DB = \BetterLinks\Helper::DB();
        $content = [];
        // if ($type == 'all') {
        //     $content['links'] = $this->get_links();
        //     $content['terms'] = $this->get_terms();
        //     $content['terms_relationships'] = $this->get_terms_relationships();
        //     $content['clicks'] = $this->get_clicks();
        // } elseif ($type == 'links') {
        //     $content['links'] = $this->get_links();
        //     $content['terms'] = $this->get_terms();
        //     $content['terms_relationships'] = $this->get_terms_relationships();
        // } elseif ($type == 'clicks') {
        //     $content['clicks'] = $this->get_clicks();
        // }
        // $content = $this->get_links();
        return apply_filters('betterlinks/tools/export_content', $content);
    }

    public function get_links()
    {
        global $wpdb;
        $links = $wpdb->get_results("SELECT * FROM {$wpdb->prefix}betterlinks", ARRAY_A);
        $results = [];
        if (is_array($links) && count($links) > 0) {
            foreach ($links as $link) {
                $terms = $this->get_terms_from_link_id($link['ID']);
                $results[] = array_merge($link, $terms);
            }
        }
        return $results;
    }

    public function get_terms_from_link_id($link_id = 0)
    {
        global $wpdb;
        $category = [];
        $tags = [];
        $terms = $wpdb->get_results("SELECT *  FROM {$wpdb->prefix}betterlinks_terms  LEFT JOIN  {$wpdb->prefix}betterlinks_terms_relationships ON {$wpdb->prefix}betterlinks_terms.ID = {$wpdb->prefix}betterlinks_terms_relationships.term_id WHERE {$wpdb->prefix}betterlinks_terms_relationships.link_id = {$link_id}", ARRAY_A);
        if (is_array($terms) && count($terms) > 0) {
            foreach ($terms as $term) {
                if ($term['term_type'] == 'category') {
                    $category[] = $term['term_slug'];
                } elseif ($term['term_type'] == 'tags') {
                    $tags[] = $term['term_slug'];
                }
            }
        }
        return [
            'tags' => (count($tags) > 0 ? implode(',', $tags) : ''),
            'category' => (count($category) > 0 ? implode(',', $category) : ''),
        ];
    }


    public function get_clicks()
    {
        return $this->DB->query("SELECT * from {$this->wpdb_prefix}betterlinks_clicks")->get();
    }
    public function get_terms()
    {
        return $this->DB->query("SELECT * from {$this->wpdb_prefix}betterlinks_terms")->get();
    }
    public function get_terms_relationships()
    {
        return $this->DB->query("SELECT term_id, link_id from {$this->wpdb_prefix}betterlinks_terms_relationships")->get();
    }
}
