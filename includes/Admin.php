<?php 
namespace BetterLinks;

class Admin {
    public function __construct()
    {
        $this->add_menu();
    }
    public function add_menu(){
        new Admin\Menu();
    }
}