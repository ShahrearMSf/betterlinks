<?php
namespace BetterLinks;
class API
{
	public function __construct()
	{
		$this->dispatch_hook();
		$this->load_links_rest_API();
		$this->load_terms_rest_API();
		$this->load_clicks_rest_API();
	}
	public function load_links_rest_API()
	{
		new API\Links();
	}
	public function load_terms_rest_API()
	{
		new API\Terms();
	}
	public function load_clicks_rest_API()
	{
		new API\Clicks();
	}
	public function dispatch_hook(){
		add_filter('jwt_auth_whitelist', array($this, 'whitelist_API'));
	}
	public function whitelist_API($endpoints)
    {
        $endpoints[] = '/wp-json/' . BETTERLINKS_PLUGIN_SLUG . '/v1/*';
        $endpoints[] = '/index.php?rest_route=/' . BETTERLINKS_PLUGIN_SLUG . '/v1/*';
        return $endpoints;
    }
}
