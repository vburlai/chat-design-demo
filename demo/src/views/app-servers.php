<?php

require_once(__DIR__.'/../utils/app-server-utils.php');

function getAppServersHTML($hostnames, $rooms) {
    $clients = array();
    foreach ($hostnames as $host) {
        $res = getAppServerClients($host, $rooms);
        array_push($clients, $res ? implode(', ', $res) : 'None');
    }
    $hostnames_str = implode('</th><th>', $hostnames);
    $clients_str = implode('</td><td>', $clients);
    
    return <<<EOD
<style> table th { width: 50%; } </style>
<div style='height: 100%; overflow: auto;'>
Clients:<br>
<table>
<tr><th>$hostnames_str</th></tr>
<tr><td>$clients_str</td></tr>
</table>
</div>
EOD;
}
