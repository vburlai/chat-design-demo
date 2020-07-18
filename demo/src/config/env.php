<?php

function getConfig() {
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

    return array(
        'cache_server'=>$cache_server,
        'mq_api'=>$mq_api,
        'mq_admin_user'=>$mq_admin_user,
        'mq_admin_pass'=>$mq_admin_pass,
        'mysql_host'=>$mysql_host,
        'mysql_db'=>$mysql_db,
        'mysql_user'=>$mysql_user,
        'mysql_pass'=>$mysql_pass,
    );
}
