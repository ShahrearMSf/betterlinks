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
	}
	public function add_menu()
	{
		new Admin\Menu();
	}
	public function add_scripts()
	{
		new Admin\Assets();
	}
	public function dispath_notice(){
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
}
