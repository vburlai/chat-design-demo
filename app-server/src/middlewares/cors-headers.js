function corsHeaders(req, res, next) {
    const origin = req.get('Origin');
    if (origin === 'http://localhost:3001' || origin === 'http://127.0.0.1:3001') {
        res.header('Access-Control-Allow-Origin', origin);
    }
    next();
}

module.exports = corsHeaders;