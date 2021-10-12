<?php
namespace BetterLinks\Tools\Migration;

use BetterLinks\Interfaces\ImportCsvInterface;

class S30RImportCSV extends S30RBase implements ImportCsvInterface
{
    public function start_importing($csv)
    {
        $data = [];
        $count = 0;
        while (($item = fgetcsv($csv)) !== false) {
            if ($count === 0) {
                $this->link_header = $item;
                $count++;
                continue;
            }
            $item = array_combine($this->link_header, $item);
            $item = \BetterLinks\Helper::sanitize_text_or_array_field($item);
            $data[$item['request']] = $item['destination'];
        }
        return $this->process_links_data($data);
    }
}
