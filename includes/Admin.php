<?php
namespace BetterLinks;

class Admin
{
    public function __construct()
    {
        $this->add_menu();
        $this->add_scripts();
        $this->dispath_action();
        $this->usage_tracker();
    }
    public function add_menu()
    {
        new Admin\Menu();
    }
    public function add_scripts()
    {
        new Admin\Assets();
    }
    public function dispath_action()
    {
        new Admin\Ajax();
        new Admin\Notice();
        add_filter('BetterLinks/Admin/skip_no_conflict', [$this, 'skip_no_conflict']);
        add_filter('plugin_action_links_' . BETTERLINKS_PLUGIN_BASENAME, array($this, 'insert_plugin_links'));
        add_action('admin_head-toplevel_page_betterlinks', array($this, 'append_no_cache_meta'));
        add_action('admin_head-toplevel_page_betterlinks-analytics', array($this, 'append_no_cache_meta'));
        add_action('admin_head-toplevel_page_betterlinks-settings', array($this, 'append_no_cache_meta'));
        add_action('betterlinks/admin/after_import_data', array($this, 'after_import_data'));
    }
    public function skip_no_conflict()
    {
        $whitelist = ['127.0.0.1', '::1'];
        if (in_array($_SERVER['REMOTE_ADDR'], $whitelist)) {
            return true;
        }
        return false;
    }
    public function usage_tracker()
    {
        $tracker = Admin\WPDev\PluginUsageTracker::get_instance(BETTERLINKS_PLUGIN_FILE, [
            'opt_in'       => true,
            'goodbye_form' => true,
            'item_id'      => '720bbe6537bffcb73f37',
        ]);
        $tracker->set_notice_options(array(
            'notice'       => __('Want to help make <strong>BetterLinks</strong> even more awesome? Be the first to get access to <strong>BetterLinks PRO</strong> with a huge <strong>50% Early Bird Discount</strong> if you allow us to track the non-sensitive usage data.', 'betterlinks'),
            'extra_notice' => __('We collect non-sensitive diagnostic data and plugin usage information. Your site URL, WordPress & PHP version, plugins & themes and email address to send you the discount coupon. This data lets us make sure this plugin always stays compatible with the most popular plugins and themes. No spam, I promise.', 'betterlinks'),
        ));
        $tracker->init();
    }
    public function insert_plugin_links($links)
    {
        if (!apply_filters('betterlinks/pro_enabled', false)) {
            $links[] = sprintf('<a href="https://wpdeveloper.net/in/upgrade-betterlinks" target="_blank" style="color: #39b54a; font-weight: bold;">' . __('Go Pro', 'betterlinks') . '</a>');
        }
        return $links;
    }
    public function append_no_cache_meta()
    {
        echo '<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
		<meta http-equiv="Pragma" content="no-cache">
		<meta http-equiv="Expires" content="0">';
    }
    public function after_import_data()
    {
        $Cron = new Cron();
        $Cron->write_json_links();
        $Cron->analytics();
        \BetterLinks\Helper::clear_query_cache();
    }
}
