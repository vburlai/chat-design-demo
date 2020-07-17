<?php
$m = new Memcached();
$cache_server = $_ENV['MEMCACHED_ADDR'];
if (!is_string($cache_server)) {
    die("MEMCACHED_ADDR env variable is required");
}
$mq_api = $_ENV['MESSAGE_QUEUE_HTTP_API_ADDR'];
if (!is_string($mq_api)) {
    die("MESSAGE_QUEUE_HTTP_API_ADDR env variable is required");
}
$mq_admin_user = $_ENV['MQ_ADMIN_USERNAME'];
if (!is_string($mq_admin_user)) {
    die("MQ_ADMIN_USERNAME env variable is required");
}
$mq_admin_pass = $_ENV['MQ_ADMIN_PASSWORD'];
if (!is_string($mq_admin_pass)) {
    die("MQ_ADMIN_PASSWORD env variable is required");
}
$mysql_host = $_ENV['MYSQL_HOST'];
if (!is_string($mysql_host)) {
    die("MYSQL_HOST env variable is required");
}
$mysql_db = $_ENV['MYSQL_DATABASE'];
if (!is_string($mysql_db)) {
    die("MYSQL_DATABASE env variable is required");
}
$mysql_user = $_ENV['MYSQL_USER'];
if (!is_string($mysql_user)) {
    die("MYSQL_USER env variable is required");
}
$mysql_pass = $_ENV['MYSQL_PASSWORD'];
if (!is_string($mysql_pass)) {
    die("MYSQL_PASSWORD env variable is required");
}

$arr = explode(":", $cache_server);
$m->addServer($arr[0], $arr[1]);

$rooms = $m->getMulti(array('room_room-1', 'room_room-2'));
$room1 = json_decode($rooms['room_room-1']);
$room2 = json_decode($rooms['room_room-2']);

$app_server_1 = array();
$app_server_2 = array();
$clients = array();

if($room1) {
    foreach ($room1 as $participant) {
        if ($participant->hostname === 'app-server1') {
            array_push($app_server_1, $participant->clientId);
        }
        if ($participant->hostname === 'app-server2') {
            array_push($app_server_2, $participant->clientId);
        }
        $clients[$participant->clientId] = true;
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
        $clients[$participant->clientId] = true;
    }
}
$client_connected = "<span style='color: green; font-weight: bold;'>(connected)</span>";
$client_disconnected = "<span style='color: grey;'>(disconnected)</span>";

$message_queue = "";

$c = curl_init();
curl_setopt($c, CURLOPT_URL, $mq_api.'/queues');
curl_setopt($c, CURLOPT_RETURNTRANSFER, true);
curl_setopt($c, CURLOPT_HTTPHEADER, array('Authorization: Basic '.base64_encode($mq_admin_user.':'.$mq_admin_pass)));
$mq_queues = curl_exec($c);
curl_close($c);

if ($mq_queues) {
    $arr = json_decode($mq_queues);
    $message_queue = "Active queues:";
    foreach ($arr as $item) {
        $message_queue = $message_queue."<br>".$item->name;
    }

}

$mysql = mysqli_connect($mysql_host, $mysql_user, $mysql_pass, $mysql_db);
$database="<style>table {font-size: 10px;} table th { text-align: left; } .wrapper{width: calc(100% - 3px); overflow: auto; border: 1px solid grey; margin-left: 1px;box-sizing: border-box;}</style>";
$users = $mysql->query("SELECT * FROM chat_users");
if ($users) {
    $database = $database."chat_users<br><div class='wrapper'>";
    $database = $database."<table><tr><th>clientId</th><th>Name</th><th>Server</th><th>Room</th></tr>";
    while($obj = $users->fetch_object()) {
        $database = $database.'<tr>';
        $database = $database.'<td>'.$obj->clientId.'</td>';
        $database = $database.'<td>'.$obj->username.'</td>';
        $database = $database.'<td>'.$obj->hostname.'</td>';
        $database = $database.'<td>'.$obj->room.'</td>';
        // $database = $database.'<td>'.$obj->joined;
        $database = $database.'</tr>';
    }
    $database = $database."</table>";
    $database = $database."</div><br>";
}
$messages = $mysql->query("SELECT room, COUNT(*) as count FROM messages GROUP BY room;");
if($messages) {
    $database = $database."messages<br><div class='wrapper'>";
    $database = $database."<table><tr><th>room</th><th>count(*)</th></tr>";
    while($obj = $messages->fetch_object()) {
        $database = $database.'<tr>';
        $database = $database.'<td>'.$obj->room.'</td>';
        $database = $database.'<td>'.$obj->count.'</td>';
        $database = $database.'</tr>';
    }
    $database = $database."</table>";
    $database = $database."</div>";
}

$status = array(
    "app-server-1" => "<div style='height: 100%; overflow: auto;'>Clients:<br>&nbsp;".($app_server_1 ? implode("<br>&nbsp;",$app_server_1) : "None")."</div>",
    "app-server-2" => "<div style='height: 100%; overflow: auto;'>Clients:<br>&nbsp;".($app_server_2 ? implode("<br>&nbsp;",$app_server_2) : "None")."</div>",
    "database" => $database,
    "message-queue" => $message_queue,
    "client-1" => $clients['client-1'] ? $client_connected : $client_disconnected,
    "client-2" => $clients['client-2'] ? $client_connected : $client_disconnected,
    "client-3" => $clients['client-3'] ? $client_connected : $client_disconnected,
    "client-4" => $clients['client-4'] ? $client_connected : $client_disconnected,
    "client-5" => $clients['client-5'] ? $client_connected : $client_disconnected,
    "client-6" => $clients['client-6'] ? $client_connected : $client_disconnected,
);

header('Content-type: application/json');

echo json_encode($status);