<?php
namespace BetterLinks;

class Admin
{
	public function __construct()
	{
		$this->add_menu();
		$this->add_scripts();
		add_filter('BetterLinks/Admin/skip_no_conflict', [$this, 'skip_no_conflict']);
		$this->dispath_notice();
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
	public function dispath_notice()
	{
		new Admin\Ajax();
		new Admin\Notice();
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
            'notice'       => __('Want to help make <strong>BetterLinks</strong> even more awesome? Be the first to get access to <strong>BetterLinks PRO</strong> with a huge <strong>30% Discount</strong> when we release if you allow us to track the non-sensitive usage data.', 'betterlinks'),
            'extra_notice' => __('We collect non-sensitive diagnostic data and plugin usage information. Your site URL, WordPress & PHP version, plugins & themes and email address to send you the discount coupon. This data lets us make sure this plugin always stays compatible with the most popular plugins and themes. No spam, I promise.', 'betterlinks'),
        ));
        $tracker->init();
    }
}
