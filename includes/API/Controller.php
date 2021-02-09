<?php
namespace BetterLinks\API;

abstract class Controller
{
	protected $namespace = BETTERLINKS_PLUGIN_SLUG . '/v1';
	abstract protected function get_value($request);
	abstract protected function create_value($request);
	abstract protected function update_value($request);
	abstract protected function delete_value($request);
	abstract protected function permissions_check($request);

	protected function json_link_formatter($data)
	{
		return [
			'ID' => $data['ID'],
			'link_slug' => $data['link_slug'],
			'redirect_type' => $data['redirect_type'],
			'target_url' => $data['target_url'],
			'nofollow' => $data['nofollow'],
			'sponsored' => $data['sponsored'],
			'param_forwarding' => $data['param_forwarding'],
			'track_me' => $data['track_me'],
		];
	}
	protected function insert_json_into_file($file, $data)
	{
		$existingData = file_get_contents($file);
		$tempArray = json_decode($existingData, true);
		$tempArray[$data['short_url']] = $this->json_link_formatter($data);
		return file_put_contents($file, json_encode($tempArray));
	}
	protected function update_json_into_file($file, $data)
	{
		$existingData = file_get_contents($file);
		$tempArray = json_decode($existingData, true);
		if (is_array($tempArray) && isset($data['short_url'])) {
			$tempArray[$data['short_url']] = $this->json_link_formatter($data);
			return file_put_contents($file, json_encode($tempArray));
		}
		return;
	}
	protected function delete_json_into_file($file, $short_url)
	{
		$existingData = file_get_contents($file);
		$tempArray = json_decode($existingData, true);
		if (is_array($tempArray)) {
			unset($tempArray[$short_url]);
			return file_put_contents($file, json_encode($tempArray));
		}
		return;
	}
}
