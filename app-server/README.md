# Application server component

Its task is to connect clients to chat. Many copies of same application server code will be run to handle high number of clients.

We use [NodeJS](https://nodejs.org/) server with [Socket.io](https://socket.io) library for this demo because:
 * NodeJS programming model is well tailored for asynchronous work it needs to handle (with WebSockets and Message Queue)
 * Socket.io library provides both server-side code and client-side JS library for browser

More info:
 * [Websocket](https://en.wikipedia.org/wiki/WebSocket)
 * [Node.js](https://en.wikipedia.org/wiki/Node.js)
 * [npm](https://en.wikipedia.org/wiki/Npm_(software))
 