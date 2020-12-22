<?php
namespace BetterLinks;
class API {
    public function __construct()
    {
        $this->load_links_rest_API();
        $this->load_terms_rest_API();
        $this->load_clicks_rest_API();
    }
    public function load_links_rest_API(){
        new API\Links();
    }
    public function load_terms_rest_API(){
        new API\Terms();
    }
    public function load_clicks_rest_API(){
        new API\Clicks();
    }
}