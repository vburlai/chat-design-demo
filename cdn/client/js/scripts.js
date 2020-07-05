const SERVER = 'http://localhost:3002'; // load-balancer for App servers
let socket;
let username;

function loadCSS(url) {
    const el = document.createElement('link');
    el.rel = "stylesheet";
    el.href = url;
    document.head.appendChild(el);
    return new Promise((resolve) => {
        el.addEventListener('load', () => resolve());
    })
}

async function joinChat() {
    await loadCSS('./css/join-form.css');
    const { showJoinForm } = await import('./join-form.js');
    const res = await showJoinForm();
    console.log(res);

    socket = io(SERVER);
    const { clientId, chat, username } = res;
    socket.emit('join', { clientId, chat });
    return { username };
}

async function init() {
    const { username } = await joinChat();
}

init();