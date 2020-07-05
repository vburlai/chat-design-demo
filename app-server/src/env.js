const hostname = process.env['APP_SERVER_HOSTNAME'];
if (!hostname) {
    console.log('APP_SERVER_HOSTNAME env variable is required');
    process.exit(1);
}
const memcachedAddr = process.env['MEMCACHED_ADDR'];
if (!memcachedAddr) {
    console.log('MEMCACHED_ADDR env variable is required');
    process.exit(1);
}

module.exports = { hostname, memcachedAddr };
