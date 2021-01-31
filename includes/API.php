<?php
namespace BetterLinks;
class API
{
	public function __construct()
	{
		$this->dispatch_hook();
	}
	
	public function dispatch_hook(){
		new API\Settings();
		new API\Links();
		new API\Terms();
		new API\Clicks();
		add_filter('jwt_auth_whitelist', array($this, 'whitelist_API'));
	}
	public function whitelist_API($endpoints)
    {
        $endpoints[] = '/wp-json/' . BETTERLINKS_PLUGIN_SLUG . '/v1/*';
        $endpoints[] = '/index.php?rest_route=/' . BETTERLINKS_PLUGIN_SLUG . '/v1/*';
        return $endpoints;
    }
}
