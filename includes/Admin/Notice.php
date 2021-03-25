<?php

namespace BetterLinks\Admin;

class Notice
{
	public $pagenow;
	public function __construct()
	{
		$this->prettylinks_notice();
		$this->simple_301_redirects_notice();
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
				if(!isset($_GET['post_type']) || (isset($_GET['post_type']) && $_GET['post_type'] !== 'pretty-link')){ 
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
				if(!isset($_GET['page']) || (isset($_GET['page']) && $_GET['page'] !== '301options')){
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
                <a href="<?php echo esc_url(admin_url('admin.php?page=betterlinks-settings&migration=prettylinks')); ?>" class="button button-primary"><?php _e('Start Migration','betterlinks'); ?></a>
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
		$nonce = wp_create_nonce('wp_rest'); ?>
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
