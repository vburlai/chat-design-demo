<?php

require_once(__DIR__.'/../connectors/curl.php');

function getActiveQueuesHTML($config) {
    $mq_queues = getMessageQueues($config);
    $get_name = function($v) { return $v->name; };
    $mq_queues_str = implode('<br>',array_map($get_name, $mq_queues));
    
    return <<<EOD
Active queues:<br>
$mq_queues_str
EOD;
}