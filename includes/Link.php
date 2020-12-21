<?php
namespace BetterLinks;

use BetterLinks\Link\Utils;

class Link extends Utils {
    public function __construct()
    {
        if(!is_admin() && $_SERVER["REQUEST_METHOD"] == 'GET') {
            add_action('init', array($this, 'run_redirect'), 1);
        }
    }
    public function run_redirect(){
        $request_uri = stripslashes(rawurldecode($_SERVER['REQUEST_URI']));
        $request_uri = trim($request_uri, '/');
        // check slug is available or not
        $data = $this->get_slug_raw($request_uri);
        error_log(print_r($data, true));
        if($data){
            $this->dispatch_redirect($data);
        }
    }
}