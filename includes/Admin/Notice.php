<?php

namespace BetterLinks\Admin;

class Notice
{
    public function __construct()
    {
        $this->review_notice();
        Notice\PrettyLinks::init();
        Notice\Simple301::init();
        Notice\ThirstyAffiliates::init();
    }
    public function review_notice()
    {
        $notice = new WPDev\WPDevNotice(BETTERLINKS_PLUGIN_BASENAME, BETTERLINKS_VERSION);

        /**
         * Current Notice End Time.
         * Notice will dismiss in 3 days if user does nothing.
         */
        $notice->cne_time = '7 Day';
        /**
         * Current Notice Maybe Later Time.
         * Notice will show again in 7 days
         */
        $notice->maybe_later_time = '7 Day';

        $notice->text_domain = 'betterlinks';

        $scheme = (parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY)) ? '&' : '?';
        $url = $_SERVER['REQUEST_URI'] . $scheme;
        $notice->links = [
            'review' => array(
                'later' => array(
                    'link' => 'https://wordpress.org/plugins/betterlinks/#reviews',
                    'target' => '_blank',
                    'label' => __('Ok, you deserve it!', 'betterlinks'),
                    'icon_class' => 'dashicons dashicons-external',
                ),
                'allready' => array(
                    'link' => $url,
                    'label' => __('I already did', 'betterlinks'),
                    'icon_class' => 'dashicons dashicons-smiley',
                    'data_args' => [
                        'dismiss' => true,
                    ],
                ),
                'maybe_later' => array(
                    'link' => $url,
                    'label' => __('Maybe Later', 'betterlinks'),
                    'icon_class' => 'dashicons dashicons-calendar-alt',
                    'data_args' => [
                        'later' => true,
                    ],
                ),
                'support' => array(
                    'link' => 'https://wpdeveloper.com/support',
                    'label' => __('I need help', 'betterlinks'),
                    'icon_class' => 'dashicons dashicons-sos',
                ),
                'never_show_again' => array(
                    'link' => $url,
                    'label' => __('Never show again', 'betterlinks'),
                    'icon_class' => 'dashicons dashicons-dismiss',
                    'data_args' => [
                        'dismiss' => true,
                    ],
                ),
            ),
        ];

        /**
         * This is review message and thumbnail.
         */
        global $betterlinks;
        $current_user = wp_get_current_user();
        $total_links = (is_array($betterlinks) && isset($betterlinks['links']) ? count($betterlinks['links']) : 0);
        $notice->message('review', '<p>'.esc_html__('Howdy, ', 'betterlinks') . $current_user->user_login . esc_html__('! 👋 You have created ', 'betterlinks'). $total_links.' '.esc_html__('Shortened URLs so far 🎉 If you are enjoying using BetterLinks, feel free to leave a 5* Review on the WordPress Forum.', 'betterlinks').'</p>');
        $notice->thumbnail('review', plugins_url('assets/images/logo-large.svg', BETTERLINKS_PLUGIN_BASENAME));
        
        $notice->options_args = array(
            'notice_will_show' => [
                'opt_in' => $notice->timestamp,
                'upsale' => $notice->makeTime($notice->timestamp, '7 Day'),
                'review' => $notice->makeTime($notice->timestamp, '3 Day'), // after 3 days
            ],
        );
        // main notice init
        $notice->init();
    }
}
