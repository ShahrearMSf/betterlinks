<?php

namespace BetterLinks\Admin\Notice;

use BetterLinks\Abstracts\MigrationNotice;

class PrettyLinks extends MigrationNotice
{
    public static $pagenow;
    public static function init()
    {
        $self = new self();
        if (defined('PRLI_VERSION') && !get_option('betterlinks_notice_ptl_migrate')) {
            global $pagenow;
            $self::$pagenow = $pagenow;
            if (!get_option('betterlinks_hide_notice_ptl_migrate') || $pagenow === 'admin.php') {
                if(get_option('betterlinks_notice_ptl_migration_running_in_background')){
                    add_action('admin_notices', [$self, 'migration_running_notice']);
                }else{
                    add_action('admin_notices', [$self, 'migration_notice']);
                }
                add_action('admin_print_footer_scripts', [$self, 'admin_scripts']);
            } 
        } elseif (defined('PRLI_VERSION') && get_option('betterlinks_notice_ptl_migrate')) {
            global $pagenow;
            $self::$pagenow = $pagenow;
            if (!get_option('betterlinks_hide_notice_ptl_deactive')) {
                if (!isset($_GET['post_type']) || (isset($_GET['post_type']) && $_GET['post_type'] !== 'pretty-link')) {
                    add_action('admin_notices', [$self, 'deactive_notice']);
                }
                add_action('admin_print_footer_scripts', [$self, 'admin_scripts']);
            }
        }
    }

    public function migration_running_notice()
    {
        // todo: get the total successful links & clicks count here
        ?>
        <div class="notice notice-info betterlinks-notice-pt-migrate <?php echo self::$pagenow !== 'admin.php' ? 'is-dismissible' : ''; ?>">
            <p>
                <?php _e('Migration of your Pretty Links data to BetterLinks running in background...', 'betterlinks'); ?>
            </p>
        </div>
        <?php
    }

    public function migration_notice()
    {
        ?>
        <div class="notice notice-info betterlinks-notice-pt-migrate <?php echo self::$pagenow !== 'admin.php' ? 'is-dismissible' : ''; ?>">
            <p>
                <?php _e('Whoops! You are already using Pretty Links on your website. To migrate your Pretty Links data to BetterLinks, click here.', 'betterlinks'); ?>
                <a href="<?php echo esc_url(admin_url('admin.php?page=betterlinks-settings&migration=prettylinks')); ?>" class="button button-primary"><?php _e('Start Migration', 'betterlinks'); ?></a>
            </p>
        </div>
        <?php
    }
    public function deactive_notice()
    {
        ?>
        <div class="notice notice-error betterlinks-notice-deactive-prettylinks <?php echo self::$pagenow !== 'admin.php' ? 'is-dismissible' : ''; ?>">
            <p>
                <?php _e('All Pretty Links have been successfully migrated to BetterLinks. You can now safely deactivate Pretty Links on your website.', 'betterlinks'); ?>
                <a href="#" class="button button-primary deactive"><?php _e('Deactivate Pretty Links', 'betterlinks'); ?></a>
            </p>
        </div>
        <?php
    }

    public function admin_scripts()
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
                    // 
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
		});
		</script>
		<?php
    }
}
