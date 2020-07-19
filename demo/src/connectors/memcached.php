<?php

function getRooms($config, $chatRoomIDs) {
    $m = new Memcached();
    $arr = explode(":", $config['cache_server']);
    $m->addServer($arr[0], $arr[1]);
    
    $arr = array();
    foreach($chatRoomIDs as $roomId) {
        $res = $m->get('room_'.$roomId);
        if ($res) {
            array_push($arr, $res);
        }
    }
    $map = function($json) { return json_decode($json); };
    return array_map($map, $arr);
}
