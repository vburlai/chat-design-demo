<?php

require_once(__DIR__.'/../utils/app-server-utils.php');

function getAppServerHTML($hostname, $rooms) {
    $clients = getAppServerClients($hostname, $rooms);
    $clients_str = $clients ? implode('<br>&nbsp;', $clients) : 'None';
    return <<<EOD
<div style='height: 100%; overflow: auto;'>
Clients:<br>
&nbsp;$clients_str
</div>
EOD;
}
