<?php

function getRooms($config) {
    $m = new Memcached();
    $arr = explode(":", $config['cache_server']);
    $m->addServer($arr[0], $arr[1]);
    $filter_not_false = function($v) { return $v !== FALSE; };
    $arr = array_filter(array(
        $m->get('room_room-1'),
        $m->get('room_room-2'),
        $m->get('room_room-3')
    ), $filter_not_false);
    $map = function($json) { return json_decode($json); };
    return array_map($map, $arr);
}
