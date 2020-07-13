const { hostname: myHostname } = require('../config/env');
const { messageQueueConsume, messageQueueSend, messageQueueDelete } = require('../connectors/message-queue');
const { memcachedGetArray, memcachedAddToArray, memcachedFilterFromArray } = require('../connectors/memcached');
const { mysqlPrimaryQuery } = require('../connectors/mysql');

const roomId = room => `room_${room}`;
const queueId = (clientId, hostname = myHostname) => `mq_${clientId}_at_${hostname}`;

const getChatRooms = async () => {
    const rooms = await mysqlPrimaryQuery("SELECT * FROM chat_rooms");
    return rooms;
};

const getChatRoomMembers = async (room) => {
    const res = await memcachedGetArray(roomId(room));
    return res;
};

const addChatRoomMember = async (room, member, consumerFn) => {
    const { clientId } = member;
    const entry = { hostname: myHostname, clientId, room };
    await messageQueueConsume(queueId(clientId), consumerFn);
    await memcachedAddToArray(roomId(room), entry, 0);
};

const getChatRoomMessages = async (room) => {
    return [
        "Client 1: Joined",
        "Client 2: Joined",
        "Client 3: Joined",
        "Client 4: Joined",
        "Client 5: Joined",
        "Client 6: Joined",
    ];
};

const postToChatRoom = async (room, message) => {
    const members = await getChatRoomMembers(room);
    await Promise.all(members.map(
        ({ clientId, hostname }) => messageQueueSend(queueId(clientId, hostname), message)
    ))
    // send to log topic - MQ
}

const removeChatRoomMember = async (room, member) => {
    await memcachedFilterFromArray(roomId(room), el =>
        el.clientId !== member.clientId ||
        el.hostname !== myHostname ||
        el.room !== room
        , 0)
    // delete fron DB
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
