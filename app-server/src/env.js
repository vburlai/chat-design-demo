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

const messageQueueAddr = process.env['MESSAGE_QUEUE_ADDR'];
if (!messageQueueAddr) {
    console.log('MESSAGE_QUEUE_ADDR env variable is required');
    process.exit(1);
}

const mqUsername = process.env['MQ_USERNAME'];
if (!mqUsername) {
    console.log('MQ_USERNAME env variable is required');
    process.exit(1);
}


const mqPassword = process.env['MQ_PASSWORD'];
if (!mqPassword) {
    console.log('MQ_PASSWORD env variable is required');
    process.exit(1);
}


module.exports = { hostname, memcachedAddr, messageQueueAddr, mqUsername, mqPassword };
