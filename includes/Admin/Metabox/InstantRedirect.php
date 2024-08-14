<?php
namespace BetterLinks\Admin\Metabox;

use BetterLinks\Admin\Metabox;

class InstantRedirect {
    private $metabox;

    public function __construct(){
        $this->metabox = new Metabox();
    }

    public function add_instant_redirect($post_type, $post) {
        if(!$this->metabox->is_using_gutenberg_block()) {
            add_meta_box('betterlinks-instant_redirect', __('BetterLinks Instant Redirect', 'betterlinks'), [$this, 'instant_redirect'], $post_type, 'side', 'core');
        }
    }

    public function instant_redirect(){
        // include_once BETTERLINKS
    }
}