<?php

function getAppServerClients($hostname, $rooms) {
    $res = array();
    foreach($rooms as $room) {
        if ($room) {
            foreach($room as $participant) {
                if ($participant->hostname === $hostname) {
                    array_push($res, $participant->clientId);
                }
            }
        }
    }
    return $res;
}

function getActiveClients($rooms) {
    $res = array();
    foreach($rooms as $room) {
        if ($room) {
            foreach($room as $participant) {
                $res[$participant->clientId] = true;
            }
        }
    }
    return $res;
}