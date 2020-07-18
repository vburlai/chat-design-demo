<?php

require_once(__DIR__.'/../utils/app-server-utils.php');

function getClientsHTML($rooms) {
    $clients = getActiveClients($rooms);
    $connected = "<span style='color: green; font-weight: bold;'>(connected)</span>";
    $disconnected = "<span style='color: grey;'>(disconnected)</span>";
    $map = function($c) { return $c ? $connected : $disconnected; };
    return array_map($map, $clients);
}
