function init() {
    setupStatusRefresh();
}

function setupStatusRefresh() {
    const svg = document.getElementById('svg');

    svg.addEventListener('load', () => {
        const svgDoc = svg.contentDocument;

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
    });
}

init();
