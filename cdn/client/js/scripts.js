const SERVER = 'http://localhost:3002'; // load-balancer for App servers

const loaded = new Set();

function loadCSS(url) {
    if (loaded.has(url)) {
        return;
    }
    const el = document.createElement('link');
    el.rel = "stylesheet";
    el.href = url;
    document.head.appendChild(el);
    return new Promise((resolve) => {
        loaded.add(url);
        el.addEventListener('load', () => resolve());
    })
}

async function joinChat({ socket }) {
    await loadCSS('./css/join-form.css');
    const { showJoinForm } = await import('./join-form.js');
    const { clientId, chat, username } = await showJoinForm();

    socket.emit('join', { clientId, chat });

    const { hostname } = await new Promise((resolve) => {
        socket.on('joined', (data) => resolve(data));
    });
    return { clientId, chat, username, hostname };
}

async function chatView({ clientId, chat, username, hostname, socket }) {
    await loadCSS('./css/chat-view.css');
    const { showChatView } = await import('./chat-view.js');
    await showChatView({ clientId, chat, username, hostname, socket });
}

async function init() {
    const socket = io(SERVER);

    while (true) {
        const { clientId, chat, username, hostname } = await joinChat({ socket });
        await chatView({ clientId, chat, username, hostname, socket });
    }
}

init();