# Logger component

Its task is to get messages from the queue and write them to primary DB.

We use [NodeJS](https://nodejs.org/) server for this demo because:
 * NodeJS concurrency model is well tailored for event-driven work
 * NodeJS is officially supported by RabbitMQ
 * NodeJS is officially supported by MySQL

More info:
 * [Node.js](https://en.wikipedia.org/wiki/Node.js)
 * [npm](https://en.wikipedia.org/wiki/Npm_(software))
 * [Concurrency model and the event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)
 