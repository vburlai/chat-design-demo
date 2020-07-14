const { hostname } = require('../config/env');
const { postToChatRoom, getChatRoomMessages, removeChatRoomMember, addChatRoomMember } = require('../controllers/chat-rooms');

const repostMsg = socket => msg => socket && msg && socket.emit('msg', msg.content.toString());
const ioConnection = (socket) => {
    let member;

    socket.on('join', msg =>
        addChatRoomMember(msg.room, msg, repostMsg(socket))
            .then(() => {
                member = { ...msg, hostname };
                socket.emit('joined', member);
            })
            .catch((err) => console.log('Could not process "join" message: ', err))
    );
    socket.on('msg', ({ room, message }) =>
        postToChatRoom(room, message)
            .catch((err) => console.log('Could not process "msg" message: ', err))
    );
    socket.on('load-msgs', ({ room }) =>
        getChatRoomMessages(room)
            .then(messages => socket.emit('msgs-loaded', { messages }))
            .catch((err) => console.log('Could not process "load-msgs" message: ', err))
    );
    socket.on('leave', () =>
        removeChatRoomMember(member.room, member)
            .catch((err) => console.log('Could not process "leave" message: ', err))
    );
    socket.on('disconnect', () =>
        member && removeChatRoomMember(member.room, member)
            .catch((err) => console.log('Could not process "disconnect" message: ', err))
    );
}

module.exports = ioConnection;
