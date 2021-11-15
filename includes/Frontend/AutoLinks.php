<?php
namespace BetterLinks\Frontend;

class AutoLinks
{
    public static function init()
    {
        $self = new self();
        add_filter('the_content', [$self, 'add_autolinks']);
    }
    public function add_autolinks($content)
    {
        if (! is_singular() || is_attachment() || is_feed()) {
            return $content;
        }
        // post type
        $ID = get_the_ID();
        $post_type = get_post_type($ID);
        $post_category = wp_get_post_terms($ID, 'category', array( 'fields' => 'names' ));
        $post_tags = wp_get_post_terms($ID, 'post_tag', array( 'fields' => 'names' ));


        $keywords = $this->get_keywords();
        foreach ($keywords as $item) {
            // check keyword and link id not empty
            if (empty($item['keywords']) && empty($item['link_id'])) {
                continue;
            }
            // check post type
            if (!empty($item['post_type']) && !in_array($post_type, $item['post_type'])) {
                continue;
            }
            // check category
            if (!empty($item['category']) && count(array_intersect($post_category, $item['category'])) === 0) {
                continue;
            }
            // check tags
            if (!empty($item['tags']) && count(array_intersect($post_tags, $item['tags'])) === 0) {
                continue;
            }
            
            $tags = str_replace(',', '|', $item['keywords']);
            $link = current(\BetterLinks\Helper::get_link_by_ID($item['link_id']));
            $short_url = \BetterLinks\Helper::generate_short_url($link['short_url']);
            $search_mode = 'iu';
            if ($item['case_sensitive'] == true) {
                $search_mode = 'u';
            }
            $attribute = $this->get_link_attributes($item);

            $keyword_before = (!empty($item['keyword_before']) ? $item['keyword_before'] : '');
            $keyword_after = (!empty($item['keyword_after']) ? $item['keyword_after'] : '');
            $left_boundary = (!empty($item['left_boundary']) ? $this->get_boundary($item['left_boundary']) : '');
            $right_boundary = (!empty($item['right_boundary']) ? $this->get_boundary($item['right_boundary']) : '');
            $limit = (int) (!empty($item['limit']) ? $item['limit'] : 100);

            // step 1: added placeholder
            $content = preg_replace_callback(
                '/\b('.$keyword_before.')('.$left_boundary.')('.$tags.')('.$right_boundary.')('.$keyword_after.')\b/' . $search_mode,
                array($this, 'replace_keyword_by_placeholder'),
                $content,
                $limit
            );
            // step 2: replace placeholer to link
            $content = preg_replace('/(\[alk\])/iu', '<a href='.$short_url.' '.$attribute.'>', $content);
            $content = preg_replace('/(\[\/alk\])/iu', "</a>", $content);
        }
        return $content;
    }
    public function replace_keyword_by_placeholder($match)
    {
        return $match[1] . $match[2] . '[alk]' . $match[3] . '[/alk]' . $match[4] . $match[5];
    }

    public function get_keywords()
    {
        $keywords = \BetterLinks\Helper::get_keywords();
        $keywords = $this->prepare_keywords($keywords);
        return $keywords;
    }

    public function prepare_keywords($keywords)
    {
        if (is_array($keywords)) {
            foreach ($keywords as $key => &$value) {
                $temp = json_decode($value, true);
                $tags = $this->keywords_to_tags_generator($temp['keywords']);
                $temp['keywords'] = $tags;
                $value = $temp;
            }
        }
        return $keywords;
    }

    public function keywords_to_tags_generator($string)
    {
        $string = preg_replace('/\s+/', '', $string);
        $string = preg_replace('/\,+/', '|', $string);
        return $string;
    }
    public function get_boundary($data)
    {
        $boundary = '';
        switch ($data) {
            case 'generic':
                $boundary = '\b';
                break;

            case 'whitespace':
                $boundary = '\b \b';
                break;

            case 'comma':
                $boundary = ',';
                break;

            case 'point':
                $boundary = '\.';
                break;

            case 'none':
                $boundary = '';
                break;
        }
        return $boundary;
    }
    public function get_link_attributes($item)
    {
        $attribute = '';
        if ($item['open_new_tab'] == true) {
            $attribute .= ' target="_blank"';
        }
        if ($item['use_no_follow'] == true) {
            $attribute .= ' rel="nofollow"';
        }
        return $attribute;
    }
}
