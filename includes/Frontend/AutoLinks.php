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
        $keywords = $this->get_keywords();
        foreach ($keywords as $item) {
            if (empty($item['keywords']) && empty($item['link_id'])) {
                continue;
            }
            $tags = str_replace(',', '|', $item['keywords']);
            $link = current(\BetterLinks\Helper::get_link_by_ID($item['link_id']));
            $short_url = \BetterLinks\Helper::generate_short_url($link['short_url']);
            // step 1: added placeholder
            $content = preg_replace_callback(
                '/\b('.$tags.')\b/iu',
                array($this, 'replace_keyword_by_placeholder'),
                $content,
                2
            );
            // step 2: replace placeholer to link
            $content = preg_replace('/(\[alk\])/iu', '<a href='.$short_url.'>', $content);
            $content = preg_replace('/(\[\/alk\])/iu', "</a>", $content);
        }
        return $content;
    }
    public function replace_keyword_by_placeholder($match)
    {
        return '[alk]' . $match[0] . '[/alk]';
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
}
