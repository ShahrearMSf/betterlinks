<?php
namespace BetterLinks\Traits;

trait ArgumentSchema {
    public function links_schema(){
        return array(
            'ID' => array(
                'type' => 'integer',
                'sanitize_callback' => 'absint'
            ),
            'link_author' => array(
                'type' => 'integer',
                'sanitize_callback' => 'absint'
            ),
            'link_date' => array(
                'type'   => 'string',
                'format' => 'date-time'
            ),
            'link_title' => array(
                'type'   => 'string',
                'sanitize_callback' => 'sanitize_text_field'
            ),
            'link_slug' => array(
                'type'   => 'string',
                'sanitize_callback' => 'sanitize_text_field'
            ),
            'link_note' => array(
                'type'   => 'string',
                'sanitize_callback' => 'sanitize_text_field'
            ),
            'link_status' => array(
                'type'   => 'string',
                'sanitize_callback' => 'sanitize_text_field'
            ),
            'nofollow' => array(
                'type'   => 'integer',
                'sanitize_callback' => 'absint'
            ),
            'sponsored' => array(
                'type'   => 'integer',
                'sanitize_callback' => 'absint'
            ),
            'track_me' => array(
                'type'   => 'integer',
                'sanitize_callback' => 'absint'
            ),
            'param_forwarding' => array(
                'type'   => 'string',
                'sanitize_callback' => 'sanitize_text_field'
            ),
            'param_struct' => array(
                'type'   => 'string',
                'sanitize_callback' => 'sanitize_text_field'
            ),
            'redirect_type' => array(
                'type'   => 'string',
                'sanitize_callback' => 'sanitize_text_field'
            ),
            'target_url' => array(
                'type'   => 'string',
                'sanitize_callback' => 'esc_url_raw'
            ),
            'short_url' => array(
                'type'   => 'string',
                'sanitize_callback' => 'esc_url_raw'
            ),
            'link_modified' => array(
                'type'   => 'string',
                'format' => 'date-time'
            ),
        );
    }
    public function terms_schema(){
        return array(
            'ID' => array(
                'type' => 'integer',
                'sanitize_callback' => 'absint'
            ),
            'term_name' => array(
                'type'   => 'string',
                'sanitize_callback' => 'sanitize_text_field'
            ),
            'term_slug' => array(
                'type'   => 'string',
                'sanitize_callback' => 'sanitize_text_field'
            ),
            'term_type' => array(
                'type'   => 'string',
                'sanitize_callback' => 'sanitize_text_field'
            )
        );
    }
    public function get_links_schema(){

        return array_merge(
            $this->links_schema(),
            array(
                'limit' => array(
                    'type' => 'integer',
                    'default'   => 5,
                    'sanitize_callback' => 'absint'
                )
            ), 
            $this->terms_schema()
        );
    }

    public function get_terms_schema(){
        return $this->terms_schema();
    }
}