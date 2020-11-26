<?php 
namespace BETTERLINKS;

class Admin {
    public function __construct()
    {
        $this->add_menu();
    }
    public function add_menu(){
        new Admin\Menu();
    }
}