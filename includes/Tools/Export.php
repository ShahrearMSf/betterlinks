<?php
namespace BetterLinks\Tools;

class Export
{
	private $wpdb_prefix;
	private $DB;
	public function __construct()
	{
		add_action('admin_init', [$this, 'export_data']);
	}
	public function export_data()
	{
		$page = isset($_GET['page']) ? $_GET['page'] : '';
		$export = isset($_GET['export']) ? $_GET['export'] : false;
		if ($page === 'betterlinks-settings' && $export == true) {
			$fileContent = $this->process_data(isset($_POST['content']) ? $_POST['content'] : '');
			$content = json_encode($fileContent);
			$filename = 'betterlinks.' . date('Y-m-d') . '.json';
			($file = fopen($filename, 'w')) or die('Unable to open file!');
			fwrite($file, $content);
			fclose($file);
			header("Content-Disposition: attachment; filename=\"" . $filename . "\"");
			header('Content-Type: application/force-download');
			header('Expires: 0');
			header('Cache-Control: must-revalidate');
			header('Pragma: public');
			header('Content-Type: text/plain');

			echo $content;
			exit();
		}
	}
	public function process_data($type)
	{
		global $wpdb;
		$this->wpdb_prefix = $wpdb->prefix;
		$this->DB = \BetterLinks\Helper::DB();
		$content = [];
		if ($type == 'all') {
			$content['links'] = $this->get_links();
			$content['terms'] = $this->get_terms();
			$content['terms_relationships'] = $this->get_terms_relationships();
			$content['clicks'] = $this->get_clicks();
		} elseif ($type == 'links') {
			$content['links'] = $this->get_links();
			$content['terms'] = $this->get_terms();
			$content['terms_relationships'] = $this->get_terms_relationships();
		} elseif ($type == 'clicks') {
			$content['clicks'] = $this->get_clicks();
		}
		return $content;
	}

	public function get_links()
	{
		return $this->DB->query("SELECT * from {$this->wpdb_prefix}betterlinks")->get();
	}
	public function get_clicks()
	{
		return $this->DB->query("SELECT * from {$this->wpdb_prefix}betterlinks_clicks")->get();
	}
	public function get_terms()
	{
		return $this->DB->query("SELECT * from {$this->wpdb_prefix}betterlinks_terms")->get();
	}
	public function get_terms_relationships()
	{
		return $this->DB->query("SELECT * from {$this->wpdb_prefix}betterlinks_terms_relationships")->get();
	}
}
