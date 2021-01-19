<?php
namespace BetterLinks\Tools;

use Apfelbox\FileDownload\FileDownload;

class Export 
{
	public function __construct()
	{
		add_action( 'wp_ajax_betterlinks/tools/export_data', array($this, 'export_data') );
	}
	function export_data() {

        
        $content = "This is the content of the file:";
        $fileDownload = FileDownload::createFromString($content);
        $fileDownload->sendDownload("download.txt");
        

        wp_die(); // this is required to terminate immediately and return a proper response
    }
}
