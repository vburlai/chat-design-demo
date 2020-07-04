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
}

async function init() {
    await joinChat();
}

init();