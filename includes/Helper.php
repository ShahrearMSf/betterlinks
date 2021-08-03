<?php
namespace BetterLinks;

class Helper
{
    public static function DB()
    {
        static $BLDATA;
        if (!$BLDATA) {
            global $wpdb;
            $connection = new Query\Connection($wpdb, [
                'prefix' => $wpdb->prefix,
            ]);
            $BLDATA = new Query\QueryBuilder\QueryBuilderHandler($connection);
        }
        return $BLDATA;
    }

    public static function get_links()
    {
        if (BETTERLINKS_EXISTS_LINKS_JSON) {
            $data = json_decode(file_get_contents(BETTERLINKS_UPLOAD_DIR_PATH . '/links.json'), true);
            if (empty($data)) {
                $cron = new Cron();
                $cron->write_json_links();
                return json_decode(file_get_contents(BETTERLINKS_UPLOAD_DIR_PATH . '/links.json'), true);
            }
            return $data;
        }
    }

    public static function get_link_from_json_file($short_url)
    {
        global $betterlinks;
        if (isset($betterlinks['links'][$short_url])) {
            return $betterlinks['links'][$short_url];
        }
        if (isset($betterlinks['wildcards_is_active']) && $betterlinks['wildcards_is_active']) {
            if (isset($betterlinks['wildcards']) && count($betterlinks['wildcards']) > 0) {
                foreach ($betterlinks['wildcards'] as $key => $item) {
                    $postion = strpos($key, '/*');
                    if ($postion !== false) {
                        if (substr($key, 0, $postion) == substr($short_url, 0, $postion)) {
                            $target_postion = strpos($item['target_url'], '/*');
                            if ($target_postion !== false) {
                                $target_url = str_replace('/*', substr($short_url, $postion), $item['target_url']);
                                $item['target_url'] = $target_url;
                                return $item;
                            }
                            return $item;
                        }
                    }
                }
            }
        }
        return;
    }

    public static function get_menu_items()
    {
        $menu_items = [
            BETTERLINKS_PLUGIN_SLUG => [
                'title' => __('Manage Links', 'betterlinks'),
                'capability' => 'manage_options',
            ],
            BETTERLINKS_PLUGIN_SLUG . '-analytics' => [
                'title' => __('Analytics', 'betterlinks'),
                'capability' => 'manage_options',
            ],
            BETTERLINKS_PLUGIN_SLUG . '-settings' => [
                'title' => __('Settings', 'betterlinks'),
                'capability' => 'manage_options',
            ],
        ];
        return apply_filters('betterlinks/helper/menu_items', $menu_items);
    }

    /**
     * Check Supported Post type for admin page and plugin main settings page
     *
     * @return bool
     */

    public static function plugin_page_hook_suffix($hook)
    {
        if ($hook == 'toplevel_page_' . BETTERLINKS_PLUGIN_SLUG) {
            return true;
        } else {
            foreach (self::get_menu_items() as $key => $value) {
                if ($hook == BETTERLINKS_PLUGIN_SLUG . '_page_' . $key) {
                    return true;
                }
            }
        }
        return false;
    }

    public static function make_slug($str)
    {
        if (empty($str)) {
            return;
        }
        if ($str !== mb_convert_encoding(mb_convert_encoding($str, 'UTF-32', 'UTF-8'), 'UTF-8', 'UTF-32')) {
            $str = mb_convert_encoding($str, 'UTF-8', mb_detect_encoding($str));
        }
        $str = htmlentities($str, ENT_NOQUOTES, 'UTF-8');
        $str = preg_replace('`&([a-z]{1,2})(acute|uml|circ|grave|ring|cedil|slash|tilde|caron|lig);`i', '\\1', $str);
        $str = html_entity_decode($str, ENT_NOQUOTES, 'UTF-8');
        $str = preg_replace(['`[^a-z0-9]`i', '`[-]+`'], '-', $str);
        $str = strtolower(trim($str, '-'));
        $str = substr($str, 0, 100);
        return $str;
    }

    public static function link_exists($title, $slug = '')
    {
        global $wpdb;

        $link_title = wp_unslash(sanitize_post_field('link_title', $title, 0, 'db'));
        $short_url = wp_unslash(sanitize_post_field('short_url', $slug, 0, 'db'));
        $betterlinks = $wpdb->prefix . 'betterlinks';
        $query = "SELECT link_title, short_url FROM  $betterlinks WHERE ";
        $args = [];

        if (!empty($title)) {
            $query .= ' link_title = %s';
            $args[] = $link_title;
        }

        if (!empty($slug)) {
            $query .= ' AND short_url = %s';
            $args[] = $short_url;
        }

        if (!empty($args)) {
            $results = $wpdb->get_var($wpdb->prepare($query, $args));
            if (!empty($results)) {
                return true;
            }
            return;
        }
        return;
    }
    public static function term_exists($slug)
    {
        global $wpdb;

        $term_slug = wp_unslash(sanitize_post_field('term_slug', $slug, 0, 'db'));
        $betterlinks = $wpdb->prefix . 'betterlinks_terms';
        $query = "SELECT term_slug FROM  $betterlinks WHERE ";
        $args = [];

        if (!empty($slug)) {
            $query .= ' term_slug = %s';
            $args[] = $term_slug;
        }

        if (!empty($args)) {
            $results = $wpdb->get_var($wpdb->prepare($query, $args));
            if (!empty($results)) {
                return true;
            }
            return;
        }
        return;
    }
    public static function click_exists($ID)
    {
        global $wpdb;
        $click_ID = wp_unslash(sanitize_post_field('ID', $ID, 0, 'db'));
        $betterlinks = $wpdb->prefix . 'betterlinks_clicks';
        $query = "SELECT ID FROM  $betterlinks WHERE ";
        $args = [];

        if (!empty($click_ID)) {
            $query .= ' ID = %d';
            $args[] = $click_ID;
        }

        if (!empty($args)) {
            $results = $wpdb->get_var($wpdb->prepare($query, $args));
            if (!empty($results)) {
                return true;
            }
            return;
        }
        return;
    }

    public static function create_cron_jobs_for_json_links()
    {
        wp_clear_scheduled_hook('betterlinks/write_json_links');
        wp_schedule_single_event(time() + 5, 'betterlinks/write_json_links');
    }

    public static function create_cron_jobs_for_analytics()
    {
        wp_clear_scheduled_hook('betterlinks/analytics');
        wp_schedule_single_event(time() + 5, 'betterlinks/analytics');
    }

    public static function clear_query_cache()
    {
        delete_transient(BETTERLINKS_CACHE_LINKS_NAME);
    }
    public static function json_link_formatter($data)
    {
        return [
            'ID' => $data['ID'],
            'link_slug' => $data['link_slug'],
            'link_status' => (isset($data['link_status']) ? $data['link_status'] : 'publish'),
            'short_url' => $data['short_url'],
            'redirect_type' => (isset($data['redirect_type']) ? $data['redirect_type'] : '307'),
            'target_url' => $data['target_url'],
            'nofollow' => (isset($data['nofollow']) ? $data['nofollow'] : false),
            'sponsored' => (isset($data['sponsored']) ? $data['sponsored'] : false),
            'param_forwarding' => (isset($data['param_forwarding']) ? $data['param_forwarding'] : false),
            'track_me' => (isset($data['track_me']) ? $data['track_me'] : false),
            'wildcards' => (isset($data['wildcards']) ? $data['wildcards'] : false),
            'expire' => (isset($data['expire']) ? $data['expire'] : null),
            'dynamic_redirect' => (isset($data['dynamic_redirect']) ? $data['dynamic_redirect'] : null)
        ];
    }
    public static function insert_json_into_file($file, $data)
    {
        $existingData = file_get_contents($file);
        $existingData = json_decode($existingData, true);
        if ($data['wildcards']) {
            $tempArray = $existingData['wildcards'];
            $tempArray[$data['short_url']] = self::json_link_formatter($data);
            $existingData['wildcards'] = $tempArray;
        } else {
            $tempArray = $existingData['links'];
            $tempArray[$data['short_url']] = self::json_link_formatter($data);
            $existingData['links'] = $tempArray;
        }
        return file_put_contents($file, json_encode($existingData));
    }
    public static function update_json_into_file($file, $data, $old_short_url = '')
    {
        $existingData = file_get_contents($file);
        $existingData = json_decode($existingData, true);
        if ($data['wildcards']) {
            $tempArray = $existingData['wildcards'];
            if (is_array($tempArray) && isset($data['short_url'])) {
                if (!empty($old_short_url) && isset($tempArray[$old_short_url])) {
                    unset($tempArray[$old_short_url]);
                }
                $tempArray[$data['short_url']] = self::json_link_formatter($data);
                $existingData['wildcards'] = $tempArray;
                return file_put_contents($file, json_encode($existingData));
            }
        } else {
            $tempArray = $existingData['links'];
            if (is_array($tempArray) && isset($data['short_url'])) {
                if (!empty($old_short_url) && isset($tempArray[$old_short_url])) {
                    unset($tempArray[$old_short_url]);
                }
                $tempArray[$data['short_url']] = self::json_link_formatter($data);
                $existingData['links'] = $tempArray;
                return file_put_contents($file, json_encode($existingData));
            }
        }
        return;
    }
    public static function delete_json_into_file($file, $short_url)
    {
        $existingData = file_get_contents($file);
        $existingData = json_decode($existingData, true);
        if (isset($existingData['wildcards'][$short_url])) {
            $tempArray = $existingData['wildcards'];
            if (is_array($tempArray)) {
                unset($tempArray[$short_url]);
                $existingData['wildcards'] = $tempArray;
                return file_put_contents($file, json_encode($existingData));
            }
        } elseif (isset($existingData['links'][$short_url])) {
            $tempArray = $existingData['links'];
            if (is_array($tempArray)) {
                unset($tempArray[$short_url]);
                $existingData['links'] = $tempArray;
                return file_put_contents($file, json_encode($existingData));
            }
        }
        return;
    }
    public static function is_exists_short_url($short_url)
    {
        $resutls = \BetterLinks\Helper::DB()
                ->table('betterlinks')
                ->where('short_url', '=', $short_url)->get();
        if (count($resutls) > 0) {
            return true;
        }
        return false;
    }

    public static function sanitize_text_or_array_field($array_or_string)
    {
        if (is_string($array_or_string)) {
            $array_or_string = sanitize_text_field($array_or_string);
        } elseif (is_array($array_or_string)) {
            foreach ($array_or_string as $key => &$value) {
                if (is_array($value)) {
                    $value = self::sanitize_text_or_array_field($value);
                } else {
                    $value = sanitize_text_field($value);
                }
            }
        }
        return $array_or_string;
    }
}
