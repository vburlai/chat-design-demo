<?php

function mysqlConnect($config) {
    $mysql = mysqli_connect($config['mysql_host'], $config['mysql_user'], $config['mysql_pass'], $config['mysql_db']);
    $mysql->query("SET CHARSET utf8mb4");
    return $mysql;
}

function getUsers($mysql) {
    $users = $mysql->query("SELECT * FROM chat_users");
    $users_objs = array();
    if($users) {
        while($obj = $users->fetch_object()) {
            array_push($users_objs, $obj);
        }
    }
    return $users_objs;
}

function getChatRoomIDs($mysql) {
    $rooms = $mysql->query("SELECT room_id FROM chat_rooms");
    $rooms_objs = array();
    if($rooms) {
        while($obj = $rooms->fetch_object()) {
            array_push($rooms_objs, $obj->room_id);
        }
    }
    return $rooms_objs;
}

function getMessages($mysql) {
    $subquery = "SELECT room, MAX(sent) as max_sent FROM messages GROUP BY room";
    $condition = "t1.room = t2.room AND t1.sent = t2.max_sent";
    $messages = $mysql->query("SELECT t2.room as room, message FROM messages t1 INNER JOIN (".$subquery.") t2 ON ".$condition);
    $messages_objs = array();
    if($messages) {
        while($obj = $messages->fetch_object()) {
            array_push($messages_objs, $obj);
        }
    }
    return $messages_objs;
}
