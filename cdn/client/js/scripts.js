const loadedCSS = new Set();
const loadedJS = new Set();

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

function loadJS(url) {
    if (loadedJS.has(url)) {
        return;
    }
    const el = document.createElement('script');
    el.src = url;
    document.head.appendChild(el);
    return new Promise((resolve) => {
        loadedJS.add(url);
        el.addEventListener('load', () => resolve());
    })
}

async function joinChat({ config, socket, chatRooms }) {
    await loadCSS('./css/join-form.css');
    const { showJoinForm } = await import('./views/join-form.js');
    const { room, username } = await showJoinForm({ config, chatRooms });

    socket.emit('join', { clientId: config.clientId, room, username });

    const { hostname } = await new Promise((resolve) => {
        socket.once('joined', (data) => resolve(data));
    });
    return { room, username, hostname };
}

async function chatView({ config, room, username, hostname, socket, chatRooms }) {
    await loadCSS('./css/chat-view.css');
    const { showChatView } = await import('./views/chat-view.js');
    await showChatView({ config, room, username, hostname, socket, chatRooms });
}

async function showError(message) {
    const { showBrowserError } = await import('./views/browser-error.js');
    showBrowserError(message);
}

async function init() {
    const { getConfigFromUrl } = await import('./config/config-from-url.js');
    const config = getConfigFromUrl();
    const { getRooms } = await import('./controllers/rooms.js');
    const chatRooms = await getRooms({ config });
    await loadJS(`${config.backend}/socket.io.js`);
    const { socketIoConnect } = await import('./controllers/io-connection.js');

    const socket = await socketIoConnect({ config });
    if (!socket) {
        await showError('Could not establish WebSocket connection.');
        return;
    }

    while (true) {
        const { room, username, hostname } = await joinChat({ config, socket, chatRooms });
        await chatView({ config, room, username, hostname, socket, chatRooms });
    }
}

init();