const title = {
    'chat-1': 'Chat 1',
    'chat-2': 'Chat 2',
}

function showChatView({ clientId, hostname, chat, username, socket }) {
    document.getElementById('main').innerHTML = `
    <form id="chat-form">
        <div class="chat-title" data-chat="${chat}">
            <div class="text">${title[chat]}</div>
            <button id="leave-chat">x</button>
        </div>
        <div>clientId: ${clientId}</div>
        <div>Server: ${hostname}</div>
        <div class="msgs">Messages</div>
        <div class="send-msg">
            <div>${username}: </div>
            <input type="text" id="chat-msg" name="msg">
            <input type="submit" value="Send">
        </div>
    </form>
`;
    document.getElementById('chat-form').addEventListener('submit', (event) => {
        event.preventDefault();
        event.stopPropagation();

        socket.emit('msg', {
            clientId,
            chat,
            message: document.getElementById('chat-msg').value,
        });
        document.getElementById('chat-msg').value = '';
    });

    return new Promise((resolve) => {
        document.getElementById('leave-chat').addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();

            socket.emit('leave', { clientId, chat });
            resolve();
        });
    });
}

export { showChatView };