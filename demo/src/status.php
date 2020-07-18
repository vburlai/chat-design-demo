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

$clientIds = array('client-1', 'client-2', 'client-3', 'client-4', 'client-5', 'client-6');
$clients = getClientsHTML($memcached_rooms, $clientIds);
$others = array(
    "app-server-1" => getAppServerHTML('app-server1', $memcached_rooms),
    "app-server-2" => getAppServerHTML('app-server2', $memcached_rooms),
    "database" => getDatabaseHTML($mysql),
    "message-queue" => getActiveQueuesHTML($config)
);

$status = array_merge($clients, $others);

header('Content-type: application/json');

echo json_encode($status);