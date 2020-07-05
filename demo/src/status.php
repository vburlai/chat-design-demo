<?php
$m = new Memcached();
$server = $_ENV['MEMCACHED_ADDR'];
if (!is_string($server)) {
    die("MEMCACHED_ADDR env variable is required");
}
$arr = explode(":", $server);
$m->addServer($arr[0], $arr[1]);

$rooms = $m->getMulti(array('room_room-1', 'room_room-2'));
$room1 = json_decode($rooms['room_room-1']);
$room2 = json_decode($rooms['room_room-2']);

$app_server_1 = array();
$app_server_2 = array();

if($room1) {
    foreach ($room1 as $participant) {
        if ($participant->hostname === 'app-server1') {
            array_push($app_server_1, $participant->clientId);
        }
        if ($participant->hostname === 'app-server2') {
            array_push($app_server_2, $participant->clientId);
        }
    }
}

if($room2) {
    foreach ($room2 as $participant) {
        if ($participant->hostname === 'app-server1') {
            array_push($app_server_1, $participant->clientId);
        }
        if ($participant->hostname === 'app-server2') {
            array_push($app_server_2, $participant->clientId);
        }
    }
}

$status = array(
    "app-server-1" => $app_server_1 ? "Connected:<br>&nbsp;".implode("<br>&nbsp;",$app_server_1) : "",
    "app-server-2" => $app_server_2 ? "Connected:<br>&nbsp;".implode("<br>&nbsp;",$app_server_2) : "",
    "database" => "",
    "message-queue" => "",
);

header('Content-type', 'application/json');

echo json_encode($status);