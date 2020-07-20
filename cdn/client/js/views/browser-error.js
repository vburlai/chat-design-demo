const showBrowserError = message => {
    document.getElementById('main').innerHTML = `
    <div style="display: flex;align-items: center;justify-content: center;height: 100%;">
        <div style="width: 60%;">
            <div style="font-weight: bold;margin-bottom: 0.5rem;">Error</div>
            <div style="margin-bottom: 0.5rem;">${message}</div>
            <div style="font-size: 0.8rem;">Try using a different browser, for example <a href="https://www.google.com/chrome/" target="_blank">Google Chrome.</a></div>
        </div>
    </div>
`;
}

export { showBrowserError };
