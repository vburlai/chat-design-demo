const { hostname: myHostname, loggerQueue } = require('../config/env');
const { messageQueueConsume, messageQueueSend, messageQueueDelete } = require('../connectors/message-queue');
const { memcachedGetArray, memcachedAddToArray, memcachedFilterFromArray } = require('../connectors/memcached');
const { mysqlPrimaryQuery } = require('../connectors/mysql');

const roomId = room => `room_${room}`;
const queueId = (clientId, hostname = myHostname) => `mq_${clientId}_at_${hostname}`;

const getChatRooms = async () => {
    const rooms = await mysqlPrimaryQuery("SELECT * FROM chat_rooms");
    return rooms;
};

const getChatRoomMembersFromDB = room => async () => {
    const q =
        'SELECT hostname, clientId, room, username' +
        ' FROM chat_users' +
        ' WHERE room = ?' +
        ' ORDER BY joined ASC';
    const members = await mysqlPrimaryQuery(q, [room])
    return members;
}

const getChatRoomMembers = async (room) => {
    const res = await memcachedGetArray(roomId(room), getChatRoomMembersFromDB(room), 0);
    return res;
};

const addChatRoomMember = async (room, member, consumerFn) => {
    const { clientId, username } = member;
    const entry = { hostname: myHostname, clientId, room, username };
    await messageQueueConsume(queueId(clientId), consumerFn);
    await memcachedAddToArray(roomId(room), entry, getChatRoomMembersFromDB(room), 0);
    await mysqlPrimaryQuery("INSERT INTO chat_users SET ?", entry);
};

const getChatRoomMessages = async (room) => {
    const q =
        'SELECT message' +
        ' FROM messages' +
        ' WHERE room = ?' +
        ' ORDER BY sent ASC';
    const res = await mysqlPrimaryQuery(q, [room]);
    return res.map(row => row.message);
};

const postToChatRoom = async (room, message) => {
    const members = await getChatRoomMembers(room);
    await Promise.all(members.map(
        ({ clientId, hostname }) => messageQueueSend(queueId(clientId, hostname), message)
    ))
    await messageQueueSend(loggerQueue, JSON.stringify({ room, message }));
}

const removeChatRoomMember = async (room, member) => {
    const filterFn = el =>
        el.clientId !== member.clientId ||
        el.hostname !== myHostname ||
        el.room !== room;
    await memcachedFilterFromArray(roomId(room), filterFn, getChatRoomMembersFromDB(room), 0);
    const results = await mysqlPrimaryQuery("DELETE FROM chat_users WHERE clientId = ? AND hostname = ? AND room = ?", [
        member.clientId,
        myHostname,
        room,
    ]);
    console.log('deleted ' + results.affectedRows + ' rows');
    await messageQueueDelete(queueId(member.clientId, myHostname));
};

module.exports = {
    getChatRooms,
    getChatRoomMembers,
    addChatRoomMember,
    getChatRoomMessages,
    postToChatRoom,
    removeChatRoomMember,
};
