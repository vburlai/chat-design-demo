<?php

require_once(__DIR__.'/../connectors/curl.php');

function getActiveQueuesHTML($config) {
    $mq_queues = getMessageQueues($config);
    $get_name = function($v) { return $v->name; };
    $mq_queues_str = implode('<br>&nbsp;',array_map($get_name, $mq_queues));
    
    return <<<EOD
Active queues:<br>
&nbsp;$mq_queues_str
EOD;
}