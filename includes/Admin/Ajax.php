<?php

namespace BetterLinks\Admin;

class Ajax {
    public function __construct()
    {
        add_action( 'wp_ajax_betterlinks/admin/get_prettylinks_data', array($this, 'get_prettylinks_data') );
        add_action( 'wp_ajax_betterlinks/admin/run_prettylinks_migration', array($this, 'run_prettylinks_migration') );
    }

    public function get_prettylinks_data(){
        $query = \BetterLinks\Helper::DB();
        $links = $query->table('prli_links')->get();
        $clicks = $query->table('prli_clicks')->get();
        set_transient( 'betterlinks_migration_data_prettylinks', array('links' => $links, 'clicks' => $clicks), 60*5 );
        wp_send_json_success(array('links' => $links, 'clicks' => $clicks));
        wp_die();
    }

    public function run_prettylinks_migration(){
        $type = (isset($_POST['type']) ? $_POST['type'] : '');
        $type = explode(',', $type);
        $prettylinks = get_transient('betterlinks_migration_data_prettylinks');
        $DB = \BetterLinks\Helper::DB();
        $migrator = new \BetterLinks\Tools\Migration\PrettyLinksDB($DB);
        $resutls = [];
        foreach($type as $item){
            if($item === 'links'){
                $resutls[] = $migrator->process_links_data($prettylinks[$item]);
            } 
            else if($item === 'clicks'){
                $resutls[] = $migrator->process_clicks_data($prettylinks[$item]);
            }
        }
        update_option('betterlink_notice_ptl_migrate', true);
        wp_send_json_success($resutls);
        wp_die();
    }

}