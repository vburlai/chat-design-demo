<?php

require_once(__DIR__.'/../utils/app-server-utils.php');

function getClientsHTML($rooms, $clientIds) {
    $clients = getActiveClients($rooms);
    $connected = "<span style='color: green; font-weight: bold;'>(connected)</span>";
    $disconnected = "<span style='color: grey;'>(disconnected)</span>";
    $res = array();
    foreach ($clientIds as $id) {
        $res[$id] = $clients[$id] ? $connected : $disconnected;
    }

    return $res;
}
