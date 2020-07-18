<?php

function getMessageQueues($config) {
    $c = curl_init();
    curl_setopt($c, CURLOPT_URL, $config['mq_api'].'/queues');
    curl_setopt($c, CURLOPT_RETURNTRANSFER, true);
    $auth = base64_encode($config['mq_admin_user'].':'.$config['mq_admin_pass']);
    curl_setopt($c, CURLOPT_HTTPHEADER, array('Authorization: Basic '.$auth));
    $json = curl_exec($c);
    curl_close($c);
    $res = $json ? json_decode($json) : array();
    return $res;
}