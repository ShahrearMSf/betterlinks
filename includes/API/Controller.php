<?php
namespace BetterLinks\API;

abstract class Controller
{
	protected $namespace = BETTERLINKS_PLUGIN_SLUG . '/v1';
	abstract protected function get_items($request);
	abstract protected function create_item($request);
	abstract protected function update_item($request);
	abstract protected function delete_item($request);
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
			'wildcards' => $data['wildcards'],
			'expire' => $data['expire']
		];
	}
	protected function insert_json_into_file($file, $data)
	{
		$existingData = file_get_contents($file);
		$existingData = json_decode($existingData, true);
		if($data['wildcards']) {
			$tempArray = $existingData['wildcards'];
			$tempArray[$data['short_url']] = $this->json_link_formatter($data);
			$existingData['wildcards'] = $tempArray;
		} else {
			$tempArray = $existingData['links'];
			$tempArray[$data['short_url']] = $this->json_link_formatter($data);
			$existingData['links'] = $tempArray;
		}
		return file_put_contents($file, json_encode($existingData));
	}
	protected function update_json_into_file($file, $data, $old_short_url = '')
	{
		$existingData = file_get_contents($file);
		$existingData = json_decode($existingData, true);
		if($data['wildcards']) {
			$tempArray = $existingData['wildcards'];
			if (is_array($tempArray) && isset($data['short_url'])) {
				if (!empty($old_short_url) && isset($tempArray[$old_short_url])) {
					unset($tempArray[$old_short_url]);
				}
				$tempArray[$data['short_url']] = $this->json_link_formatter($data);
				$existingData['wildcards'] = $tempArray;
				return file_put_contents($file, json_encode($existingData));
			}
		} else {
			$tempArray = $existingData['links'];
			if (is_array($tempArray) && isset($data['short_url'])) {
				if (!empty($old_short_url) && isset($tempArray[$old_short_url])) {
					unset($tempArray[$old_short_url]);
				}
				$tempArray[$data['short_url']] = $this->json_link_formatter($data);
				$existingData['links'] = $tempArray;
				return file_put_contents($file, json_encode($existingData));
			}
		}
		return;
	}
	protected function delete_json_into_file($file, $short_url)
	{
		$existingData = file_get_contents($file);
		$existingData = json_decode($existingData, true);
		if(isset($existingData['wildcards'][$short_url])){
			$tempArray = $existingData['wildcards'];
			if (is_array($tempArray)) {
				unset($tempArray[$short_url]);
				$existingData['wildcards'] = $tempArray;
				return file_put_contents($file, json_encode($existingData));
			}
		} else if(isset($existingData['links'][$short_url])) {
			$tempArray = $existingData['links'];
			if (is_array($tempArray)) {
				unset($tempArray[$short_url]);
				$existingData['links'] = $tempArray;
				return file_put_contents($file, json_encode($existingData));
			}
		}
		return;
	}
}
