const loadedCSS = new Set();

function loadCSS(url) {
    if (loadedCSS.has(url)) {
        return;
    }
    const el = document.createElement('link');
    el.rel = "stylesheet";
    el.href = url;
    document.head.appendChild(el);
    return new Promise((resolve) => {
        loadedCSS.add(url);
        el.addEventListener('load', () => resolve());
    })
}

async function joinChat({ config, socket }) {
    await loadCSS('./css/join-form.css');
    const { showJoinForm } = await import('./join-form.js');
    const { room, username } = await showJoinForm({ config });

    socket.emit('join', { clientId: config.clientId, room });

    const { hostname } = await new Promise((resolve) => {
        socket.on('joined', (data) => resolve(data));
    });
    return { room, username, hostname };
}

async function chatView({ config, room, username, hostname, socket }) {
    await loadCSS('./css/chat-view.css');
    const { showChatView } = await import('./chat-view.js');
    await showChatView({ config, room, username, hostname, socket });
}

async function init() {
    const { getConfigFromUrl } = await import('./config-from-url.js');
    const config = getConfigFromUrl();
    const socket = io(config.backend);

    while (true) {
        const { room, username, hostname } = await joinChat({ config, socket });
        await chatView({ config, room, username, hostname, socket });
    }
}

init();