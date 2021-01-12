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
                'type'   => 'string',
                'sanitize_callback' => 'sanitize_text_field'
            ),
            'sponsored' => array(
                'type'   => 'string',
                'sanitize_callback' => 'sanitize_text_field'
            ),
            'track_me' => array(
                'type'   => 'string',
                'sanitize_callback' => 'sanitize_text_field'
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
                'sanitize_callback' => 'sanitize_text_field'
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
    public function clicks_schema(){
        return array(
            'ID' => array(
                'type' => 'integer',
                'sanitize_callback' => 'absint'
            ),
            'link_id' => array(
                'type' => 'integer',
                'sanitize_callback' => 'absint'
            ),
            'ip' => array(
                'type' => 'string',
                'sanitize_callback' => 'sanitize_text_field'
            ),
            'browser' => array(
                'type' => 'string',
                'sanitize_callback' => 'sanitize_text_field'
            ),
            'os' => array(
                'type' => 'string',
                'sanitize_callback' => 'sanitize_text_field'
            ),
            'referer' => array(
                'type' => 'string',
                'sanitize_callback' => 'sanitize_text_field'
            ),
            'host' => array(
                'type' => 'string',
                'sanitize_callback' => 'sanitize_text_field'
            ),
            'uri' => array(
                'type' => 'string',
                'sanitize_callback' => 'sanitize_text_field'
            ),
            'click_count' => array(
                'type' => 'integer',
                'sanitize_callback' => 'absint'
            ),
            'visitor_id' => array(
                'type'   => 'string',
                'sanitize_callback' => 'sanitize_text_field'
            ),
            'term_type' => array(
                'type'   => 'string',
                'sanitize_callback' => 'sanitize_text_field'
            ),
            'click_order' => array(
                'type' => 'integer',
                'sanitize_callback' => 'absint'
            )
        );
    }
    public function get_clicks_schema(){
        return $this->clicks_schema();
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