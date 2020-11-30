<?php
namespace BetterLinks;
class API {
    public function __construct()
    {
        $this->load_links_rest_API();
    }
    public function load_links_rest_API(){
        new API\Links();
    }
}