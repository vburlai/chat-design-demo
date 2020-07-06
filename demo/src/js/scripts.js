const CLIENTS = [
    { id: 'client-1', host: 'localhost', room: 'room-1', username: 'Client 1' },
    { id: 'client-2', host: '127.0.0.1', room: 'room-1', username: 'Client 2' },
    { id: 'client-3', host: 'localhost', room: 'room-1', username: 'Client 3' },
    { id: 'client-4', host: '127.0.0.1', room: 'room-2', username: 'Client 4' },
    { id: 'client-5', host: 'localhost', room: 'room-2', username: 'Client 5' },
    { id: 'client-6', host: '127.0.0.1', room: 'room-2', username: 'Client 6' },
]

const FRONT_END_PORT = 3001; // cdn service serving 'client'
const BACK_END_PORT = 3002; // load-balancer for app servers

const clientUrl = ({ id, host, room, username }) =>
    `http://${host}:${FRONT_END_PORT}/?clientId=${id}&` +
    `backend=http%3A%2F%2F${host}%3A${BACK_END_PORT}&` +
    `defaultRoom=${room}&` +
    `suggestedUsername=${username}`

async function init() {
    await loadClients();
    await loadDiagram();
}

function loadIframe(id, url) {
    const el = document.getElementById(id);
    el.src = url;
    return new Promise(resolve => {
        el.addEventListener('load', () => resolve());
    });
}

function sleep(sec) {
    return new Promise(resolve => setTimeout(() => resolve(), sec * 1000));
}

async function loadClients() {
    for (let c of CLIENTS) {
        await loadIframe(c.id, clientUrl(c));
        await sleep(0.2);
    }
}

async function loadDiagram() {
    await loadIframe('svg', './img/Chat-design-demo.php');

    const svgDoc = document.getElementById('svg').contentDocument;

    setInterval(() => {
        fetch('status.php')
            .then(response => {
                if (!response.ok) {
                    return {}
                }
                return response.json();
            })
            .then(status => {
                Object.keys(status).forEach(key => {
                    const el = svgDoc.getElementById(key);
                    if (el) {
                        el.innerHTML = status[key];
                    };
                });
            });
    }, 1000);
}

init();
