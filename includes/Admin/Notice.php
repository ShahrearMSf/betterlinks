<?php

namespace BetterLinks\Admin;

class Notice
{
	public $pagenow;
	public function __construct()
	{
		$this->dispatch_migration_notice();
	}
	public function dispatch_migration_notice()
	{
		if (defined('PRLI_VERSION') && !get_option('betterlink_notice_ptl_migrate')) {
			global $pagenow;
			$this->pagenow = $pagenow;
			if(!get_option('betterlink_hide_notice_ptl_migrate')){
				add_action('admin_notices', [$this, 'prettylinks_migration_notice']);
				add_action('admin_print_footer_scripts', [$this, 'admin_notice_scripts']);
			}else if($pagenow === 'admin.php'){
				add_action('admin_notices', [$this, 'prettylinks_migration_notice']);
				add_action('admin_print_footer_scripts', [$this, 'admin_notice_scripts']);
			}
		} else if(defined('PRLI_VERSION') && get_option('betterlink_notice_ptl_migrate')){
			global $pagenow;
			$this->pagenow = $pagenow;
			if(!get_option('betterlink_hide_notice_ptl_deactive')){
				add_action('admin_notices', [$this, 'prettylinks_deactive_notice']);
				add_action('admin_print_footer_scripts', [$this, 'admin_notice_scripts']);
			}else if($pagenow === 'admin.php'){
				add_action('admin_notices', [$this, 'prettylinks_deactive_notice']);
				add_action('admin_print_footer_scripts', [$this, 'admin_notice_scripts']);
			}
		}
	}

	public function prettylinks_migration_notice()
	{
		?>
        <div class="notice notice-info betterlinks-notice-pt-migrate <?php echo ( $this->pagenow !== 'admin.php' ? 'is-dismissible' : ''); ?>">
            <p>
                <?php _e('Whoops! You are already using Pretty Links on your website. To migrate your Pretty Links data to BetterLinks, click here.', 'betterlinks'); ?>
                <a href="<?php echo esc_url(admin_url('admin.php?page=betterlinks-settings&migration=true')); ?>" class="button button-primary"><?php _e('Start Migration','betterlinks'); ?></a>
            </p>
        </div>
        <?php
	}
	public function prettylinks_deactive_notice()
	{
		?>
        <div class="notice notice-error betterlinks-notice-deactive-prettylinks <?php echo ( $this->pagenow !== 'admin.php' ? 'is-dismissible' : ''); ?>">
            <p>
                <?php _e('All Pretty Links has been successfully migrated to BetterLinks. You can now safely deactivate Pretty Links on your website.', 'betterlinks'); ?>
                <a href="#" class="button button-primary deactive"><?php _e('Deactivate Pretty Links','betterlinks'); ?></a>
            </p>
        </div>
        <?php
	}
	public function admin_notice_scripts(){
		$nonce = wp_create_nonce( 'wp_rest' );
	?>
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
					'action': 'betterlinks/admin/migration_notice_hide',
					'security': "<?php echo $nonce; ?>",
					'type': 'deactive'
				}, function(response) {});
			})
			jQuery('.betterlinks-notice-pt-migrate button.notice-dismiss').on('click', function(){
				jQuery.post(ajaxurl, {
					'action': 'betterlinks/admin/migration_notice_hide',
					'security': "<?php echo $nonce; ?>",
					'type': 'migrate'
				}, function(response) {});
			})
		});
		</script>
		<?php
	}
}
