<?php

require_once(__DIR__.'/../connectors/mysql.php');

function getDatabaseHTML($mysql) {
    $users = getUsers($mysql);
    $map_user = function($u) {
        return <<<EOU
<tr>
    <td>{$u->clientId}</td>
    <td>{$u->username}</td>
    <td>{$u->hostname}</td>
    <td>{$u->room}</td>
</tr>
EOU;
    };
    $users_str = implode('', array_map($map_user, $users));
    $messages = getMessages($mysql);
    $map_msg = function($m) {
        return <<<EOU
<tr>
    <td>{$m->room}</td>
    <td>{$m->message}</td>
</tr>
EOU;
    };
    $message_str = implode('', array_map($map_msg, $messages));
    return <<<EOD
<style>
table { font-size: 10px; }
table th { text-align: left; }
.wrapper {
    width: calc(100% - 3px);
    overflow: auto;
    border: 1px solid grey;
    margin-left: 1px;
    box-sizing: border-box;
}
</style>
chat_users<br>
<div class='wrapper'>
<table><tr><th>clientId</th><th>Name</th><th>Server</th><th>Room</th></tr>
$users_str
</table>
</div><br>
messages<br>
<div class='wrapper'>
<table><tr><th>room</th><th>last message</th></tr>
$message_str
</table>
</div>
EOD;
}