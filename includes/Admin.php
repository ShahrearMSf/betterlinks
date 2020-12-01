<?php 
namespace BetterLinks;

class Admin {
    public function __construct()
    {
        $this->add_menu();
        $this->add_scripts();
    }
    public function add_menu(){
        new Admin\Menu();
    }
    public function add_scripts(){
        new Admin\Assets();
    }
}