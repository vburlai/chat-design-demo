const { hostname } = require('../config/env');
const { postToChatRoom, getChatRoomMessages, removeChatRoomMember, addChatRoomMember } = require('../controllers/chat-rooms');

const repostMsg = socket => msg => socket && msg && socket.emit('msg', msg.content.toString());
const ioConnection = (socket) => {
    socket.on('join', msg =>
        addChatRoomMember(msg.room, msg, repostMsg(socket))
            .then(() => socket.emit('joined', { ...msg, hostname }))
    );
    socket.on('msg', ({ room, message }) => postToChatRoom(room, message));
    socket.on('load-msgs', ({ room }) =>
        getChatRoomMessages(room)
            .then(messages => socket.emit('msgs-loaded', { messages }))
    );
    socket.on('leave', msg => removeChatRoomMember(msg.room, msg));
}

module.exports = ioConnection;
