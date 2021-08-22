<?php

namespace BetterLinks\Admin;

class Notice
{
    public $pagenow;
    public function __construct()
    {
        $this->review_notice();
        $this->prettylinks_notice();
        $this->simple_301_redirects_notice();
    }
    public function review_notice()
    {
        $notice = new WPDev\WPDevNotice(BETTERLINKS_PLUGIN_BASENAME, BETTERLINKS_VERSION);

        /**
         * Current Notice End Time.
         * Notice will dismiss in 3 days if user does nothing.
         */
        $notice->cne_time = '3 Day';
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
                    'link' => 'https://wpdeveloper.net/support',
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
    public function prettylinks_notice()
    {
        if (defined('PRLI_VERSION') && !get_option('betterlinks_notice_ptl_migrate')) {
            global $pagenow;
            $this->pagenow = $pagenow;
            if (!get_option('betterlinks_hide_notice_ptl_migrate')) {
                add_action('admin_notices', [$this, 'prettylinks_migration_notice']);
                add_action('admin_print_footer_scripts', [$this, 'admin_notice_scripts']);
            } elseif ($pagenow === 'admin.php') {
                add_action('admin_notices', [$this, 'prettylinks_migration_notice']);
                add_action('admin_print_footer_scripts', [$this, 'admin_notice_scripts']);
            }
        } elseif (defined('PRLI_VERSION') && get_option('betterlinks_notice_ptl_migrate')) {
            global $pagenow;
            $this->pagenow = $pagenow;
            if (!get_option('betterlinks_hide_notice_ptl_deactive')) {
                if (!isset($_GET['post_type']) || (isset($_GET['post_type']) && $_GET['post_type'] !== 'pretty-link')) {
                    add_action('admin_notices', [$this, 'prettylinks_deactive_notice']);
                }
                add_action('admin_print_footer_scripts', [$this, 'admin_notice_scripts']);
            }
        }
    }

    public function simple_301_redirects_notice()
    {
        global $pagenow;
        $this->pagenow = $pagenow;
        if (defined('SIMPLE301REDIRECTS_VERSION') && !get_option('betterlinks_notice_s301r_migrate')) {
            if (!get_option('betterlinks_hide_notice_s301r_migrate')) {
                add_action('admin_notices', [$this, 'simple301redirects_migration_notice']);
                add_action('admin_print_footer_scripts', [$this, 'admin_notice_scripts']);
            }
        } elseif (defined('SIMPLE301REDIRECTS_VERSION') && get_option('betterlinks_notice_s301r_migrate')) {
            if (!get_option('betterlinks_hide_notice_s301r_deactive')) {
                if (!isset($_GET['page']) || (isset($_GET['page']) && $_GET['page'] !== '301options')) {
                    add_action('admin_notices', [$this, 'simple301redirects_deactive_notice']);
                }
                add_action('admin_print_footer_scripts', [$this, 'admin_notice_scripts']);
            }
        }
    }

    public function prettylinks_migration_notice()
    {
        ?>
        <div class="notice notice-info betterlinks-notice-pt-migrate <?php echo $this->pagenow !== 'admin.php' ? 'is-dismissible' : ''; ?>">
            <p>
                <?php _e('Whoops! You are already using Pretty Links on your website. To migrate your Pretty Links data to BetterLinks, click here.', 'betterlinks'); ?>
                <a href="<?php echo esc_url(admin_url('admin.php?page=betterlinks-settings&migration=prettylinks')); ?>" class="button button-primary"><?php _e('Start Migration', 'betterlinks'); ?></a>
            </p>
        </div>
        <?php
    }
    public function prettylinks_deactive_notice()
    {
        ?>
        <div class="notice notice-error betterlinks-notice-deactive-prettylinks <?php echo $this->pagenow !== 'admin.php' ? 'is-dismissible' : ''; ?>">
            <p>
                <?php _e('All Pretty Links have been successfully migrated to BetterLinks. You can now safely deactivate Pretty Links on your website.', 'betterlinks'); ?>
                <a href="#" class="button button-primary deactive"><?php _e('Deactivate Pretty Links', 'betterlinks'); ?></a>
            </p>
        </div>
        <?php
    }

    public function simple301redirects_migration_notice()
    {
        ?>
        <div class="notice notice-info betterlinks-notice-simple301redirects-migrate <?php echo $this->pagenow !== 'admin.php' ? 'is-dismissible' : ''; ?>">
            <p>
                <?php _e('Whoops! You are already using Simple 301 Redirects on your website. To migrate your Simple 301 Redirects data to BetterLinks, click here.', 'betterlinks'); ?>
                <a href="<?php echo esc_url(admin_url('admin.php?page=betterlinks-settings&migration=simple301redirects')); ?>" class="button button-primary"><?php _e(
            'Start Migration',
            'betterlinks'
        ); ?></a>
            </p>
        </div>
        <?php
    }
    public function simple301redirects_deactive_notice()
    {
        ?>
        <div class="notice notice-error betterlinks-notice-deactive-simple301redirects <?php echo $this->pagenow !== 'admin.php' ? 'is-dismissible' : ''; ?>">
            <p>
                <?php _e('All Simple 301 Redirects have been successfully migrated to BetterLinks. You can now safely deactivate Simple 301 Redirects on your website.', 'betterlinks'); ?>
                <a href="#" class="button button-primary deactive"><?php _e('Deactivate Simple 301 Redirects', 'betterlinks'); ?></a>
            </p>
        </div>
        <?php
    }

    public function admin_notice_scripts()
    {
        $nonce = wp_create_nonce('betterlinks_admin_nonce'); ?>
		<script type='text/javascript'>
		jQuery( document ).ready(function() {
			jQuery('.betterlinks-notice-deactive-prettylinks a.deactive').on('click', function(e){
				e.preventDefault();
				jQuery.post(ajaxurl, {
					'action': 'betterlinks/admin/deactive_prettylinks',
					'security': "<?php echo $nonce; ?>"
				}, function(response) {
					if(response.success){
						location.reload(true); 
					}
				});
			})
			
			jQuery('.betterlinks-notice-deactive-prettylinks button.notice-dismiss').on('click', function(){
				jQuery.post(ajaxurl, {
					'action': 'betterlinks/admin/migration_prettylinks_notice_hide',
					'security': "<?php echo $nonce; ?>",
					'type': 'deactive'
				}, function(response) {});
			})
			jQuery('.betterlinks-notice-pt-migrate button.notice-dismiss').on('click', function(){
				jQuery.post(ajaxurl, {
					'action': 'betterlinks/admin/migration_prettylinks_notice_hide',
					'security': "<?php echo $nonce; ?>",
					'type': 'migrate'
				}, function(response) {});
			})

			jQuery('.betterlinks-notice-deactive-simple301redirects a.deactive').on('click', function(e){
				e.preventDefault();
				jQuery.post(ajaxurl, {
					'action': 'betterlinks/admin/deactive_simple301redirects',
					'security': "<?php echo $nonce; ?>"
				}, function(response) {
					if(response.success){
						location.reload(true); 
					}
				});
			})
			jQuery('.betterlinks-notice-deactive-simple301redirects button.notice-dismiss').on('click', function(){
				jQuery.post(ajaxurl, {
					'action': 'betterlinks/admin/migration_simple301redirects_notice_hide',
					'security': "<?php echo $nonce; ?>",
					'type': 'deactive'
				}, function(response) {});
			})
			jQuery('.betterlinks-notice-simple301redirects-migrate button.notice-dismiss').on('click', function(){
				jQuery.post(ajaxurl, {
					'action': 'betterlinks/admin/migration_simple301redirects_notice_hide',
					'security': "<?php echo $nonce; ?>",
					'type': 'migrate'
				}, function(response) {});
			})
		});
		</script>
		<?php
    }
}
