<?php

namespace BetterLinks\Admin;

class Notice {
    public function __construct()
    {
        $this->dispatch_migration_notice();
    }
    public function dispatch_migration_notice(){
        if(defined('PRLI_VERSION') && !get_option('betterlink_notice_ptl_migrate')){
            add_action( 'admin_notices', array($this, 'prettylinks_migration_notice') );
        }
    }

    public function prettylinks_migration_notice() {
        ?>
        <div class="notice notice-success is-dismissible">
            <p>
                <?php _e( 'PrettyLinks to BetterLinks Run Migration.', 'betterlinks' ); ?>
                <a href="<?php echo esc_url(admin_url('admin.php?page=betterlinks-settings&migration=true')) ?>" class="button button-primary"><?php _e( 'Run Migration', 'betterlinks' ); ?></a>
            </p>
        </div>
        <?php
    }
}