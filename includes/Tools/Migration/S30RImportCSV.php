<?php
namespace BetterLinks\Tools\Migration;

use BetterLinks\Interfaces\ImportCsvInterface;

class S30RImportCSV extends S30RBase implements ImportCsvInterface
{
    public function start_importing($data)
    {
        return $this->process_links_data($data);
    }
}
