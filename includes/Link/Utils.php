<?php
namespace BetterLinks\Link;

class Utils
{
	public function get_slug_raw($slug)
	{
		return \BetterLinks\Helper::get_link_from_json_file($slug);
	}
	public function dispatch_redirect($data, $param)
	{
		if ($data->track_me) {
			$this->start_trakcing($data);
		}

		$robots_tags = [];
		if ($data->sponsored) {
			$robots_tags[] = 'sponsored';
		}
		if ($data->nofollow) {
			$robots_tags[] = 'noindex';
			$robots_tags[] = 'nofollow';
		}
		if (!empty($robots_tags)) {
			header('X-Robots-Tag: ' . implode(', ', $robots_tags), true);
		}

		header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
		header('Cache-Control: post-check=0, pre-check=0', false);
		header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
		header('Cache-Control: no-cache');
		header('Pragma: no-cache');
		header('X-Redirect-Powered-By:  https://www.betterlinks.io/');

		$target_url = $this->addScheme($data->target_url);
		if ($data->param_forwarding && !empty($param)) {
			$target_url = $target_url . '?' . $param;
		}

		switch ($data->redirect_type) {
			case '301':
				wp_redirect($target_url, 301);
				exit();
			case '302':
				wp_redirect($target_url, 302);
				exit();
			case '307':
				wp_redirect($target_url, 307);
				exit();
			default:
				wp_redirect($target_url);
				exit();
		}
	}
	public function start_trakcing($data)
	{
		$now = current_time('mysql');
		$now_gmt = current_time('mysql', 1);
		$IP = $this->get_current_client_IP();
		$visitor_cookie = 'betterlinks_visitor';
		if (!isset($_COOKIE[$visitor_cookie])) {
			$visitor_cookie_expire_time = time() + 60 * 60 * 24 * 365; // 1 year
			$visitor_uid = uniqid('bl');
			setcookie($visitor_cookie, $visitor_uid, $visitor_cookie_expire_time, '/');
		}
		$data = [
			'link_id' => $data->ID,
			'ip' => $IP,
			'browser' => $_SERVER['HTTP_USER_AGENT'],
			'os' => '',
			'referer' => isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '',
			'host' => $IP,
			'uri' => $data->link_slug,
			'click_count' => 0,
			'visitor_id' => isset($_COOKIE[$visitor_cookie]) ? sanitize_text_field($_COOKIE[$visitor_cookie]) : '',
			'click_order' => 0,
			'created_at' => $now,
			'created_at_gmt' => $now_gmt,
		];

		$this->insert_json_into_file(BETTERLINKS_UPLOAD_DIR_PATH .'/clicks.json', $data);
	}
	public function get_current_client_IP()
	{
		$address = isset($_SERVER['REMOTE_ADDR']) ? sanitize_text_field($_SERVER['REMOTE_ADDR']) : '';
		if (isset($_SERVER['HTTP_CLIENT_IP']) && $_SERVER['HTTP_CLIENT_IP'] != '127.0.0.1') {
			$address = sanitize_text_field($_SERVER['HTTP_CLIENT_IP']);
		} elseif (isset($_SERVER['HTTP_X_FORWARDED']) && $_SERVER['HTTP_X_FORWARDED'] != '127.0.0.1') {
			$address = sanitize_text_field($_SERVER['HTTP_X_FORWARDED']);
		} elseif (isset($_SERVER['HTTP_X_FORWARDED_FOR']) && $_SERVER['HTTP_X_FORWARDED_FOR'] != '127.0.0.1') {
			$address = sanitize_text_field($_SERVER['HTTP_X_FORWARDED_FOR']);
		} elseif (isset($_SERVER['HTTP_FORWARDED']) && $_SERVER['HTTP_FORWARDED'] != '127.0.0.1') {
			$address = sanitize_text_field($_SERVER['HTTP_FORWARDED']);
		} elseif (isset($_SERVER['HTTP_FORWARDED_FOR']) && $_SERVER['HTTP_FORWARDED_FOR'] != '127.0.0.1') {
			$address = sanitize_text_field($_SERVER['HTTP_FORWARDED_FOR']);
		}
		$IPS = explode(',', $address);
		if (isset($IPS[1])) {
			$address = $IPS[0];
		}
		return $address;
	}
	public function addScheme($url, $scheme = 'http://')
	{
		return parse_url($url, PHP_URL_SCHEME) === null ? $scheme . $url : $url;
	}

	protected function insert_json_into_file($file, $data)
	{
		$existingData = file_get_contents($file);
		$tempArray = json_decode($existingData, true);
		$tempArray[] = $data;
		return file_put_contents($file, json_encode($tempArray));
	}
}
