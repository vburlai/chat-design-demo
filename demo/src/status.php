<?php
require_once(__DIR__.'/config/env.php');
$config = getConfig();

require_once(__DIR__.'/connectors/memcached.php');
$memcached_rooms = getRooms($config);

require_once(__DIR__.'/connectors/mysql.php');
$mysql = mysqlConnect($config);

require_once(__DIR__.'/views/active-queues.php');
require_once(__DIR__.'/views/database.php');
require_once(__DIR__.'/views/app-server.php');
require_once(__DIR__.'/views/clients.php');

$clients = getClientsHTML($memcached_rooms);

$status = array(
    "app-server-1" => getAppServerHTML('app-server1', $memcached_rooms),
    "app-server-2" => getAppServerHTML('app-server2', $memcached_rooms),
    "database" => getDatabaseHTML($mysql),
    "message-queue" => getActiveQueuesHTML($config),
    "client-1" => $clients['client-1'],
    "client-2" => $clients['client-2'],
    "client-3" => $clients['client-3'],
    "client-4" => $clients['client-4'],
    "client-5" => $clients['client-5'],
    "client-6" => $clients['client-6'],
);

header('Content-type: application/json');

echo json_encode($status);