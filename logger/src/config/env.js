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

const mysqlPrimaryHost = process.env['MYSQL_PRIMARY_HOST'];
if (!mysqlPrimaryHost) {
    console.log('MYSQL_PRIMARY_HOST env variable is required');
    process.exit(1);
}

const mysqlPrimaryUser = process.env['MYSQL_PRIMARY_USER'];
if (!mysqlPrimaryUser) {
    console.log('MYSQL_PRIMARY_USER env variable is required');
    process.exit(1);
}

const mysqlPrimaryPassword = process.env['MYSQL_PRIMARY_PASSWORD'];
if (!mysqlPrimaryPassword) {
    console.log('MYSQL_PRIMARY_PASSWORD env variable is required');
    process.exit(1);
}

const mysqlPrimaryDatabase = process.env['MYSQL_PRIMARY_DATABASE'];
if (!mysqlPrimaryDatabase) {
    console.log('MYSQL_PRIMARY_DATABASE env variable is required');
    process.exit(1);
}

const loggerQueue = process.env['LOGGER_QUEUE'];
if (!loggerQueue) {
    console.log('LOGGER_QUEUE env variable is required');
    process.exit(1);
}

module.exports = {
    messageQueueAddr,
    mqUsername,
    mqPassword,
    mysqlPrimaryHost,
    mysqlPrimaryUser,
    mysqlPrimaryPassword,
    mysqlPrimaryDatabase,
    loggerQueue,
};
