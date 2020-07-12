const amqp = require('amqplib');

const { messageQueueAddr, mqUsername, mqPassword } = require('./env');

let messageQueueConnection = null;
let messageQueue = null;

const messageQueueConnect = async () => {
    if (!messageQueue) {
        messageQueueConnection = await amqp.connect(`amqp://${messageQueueAddr}`, {
            auth: `${encodeURIComponent(mqUsername)}:${encodeURIComponent(mqPassword)}`,
        })
        messageQueueConnection.on('close', () => {
            messageQueueConnection = null;
            messageQueue = null;
        })
        messageQueue = await messageQueueConnection.createChannel();
    }
    return messageQueue;
}

const messageQueueCreate = async (mq, queue) => {
    return mq.assertQueue(queue, {
        durable: false,
    });
}

const messageQueueConsume = async (queue, fn) => {
    const mq = await messageQueueConnect();
    await messageQueueCreate(mq, queue);
    return mq.consume(queue, fn);
}

const messageQueueSend = async (queue, message) => {
    const mq = await messageQueueConnect();
    await messageQueueCreate(mq, queue);
    return mq.sendToQueue(queue, Buffer.from(message));
}

const messageQueueDelete = async (queue) => {
    const mq = await messageQueueConnect();
    return mq.deleteQueue(queue);
}

module.exports = { messageQueueConsume, messageQueueSend, messageQueueDelete };
