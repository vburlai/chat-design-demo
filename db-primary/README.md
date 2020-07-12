# Primary DB component

DB stands for Database. This demo will use primary (read+write) and replica (read-only) nodes.

Its task is to reliably store data in a structured way and provide query, add, update and delete operations for it. You can learn more from [Wikipedia](https://en.wikipedia.org/wiki/Database).

We use [MySQL](https://www.mysql.com) relational database for this demo because:
 * Our data seems to have relations (user to chat room, message to user and chat room)
 * MySQL is free, open-source and widely used
 * It is easy to setup from Docker
 * MySQL officially supports PHP and JavaScript - which are languages used in this demo

More info:
 * [PostgreSQL](https://en.wikipedia.org/wiki/PostgreSQL)
 * [SQL](https://en.wikipedia.org/wiki/SQL)
 * [NoSQL databases](https://en.wikipedia.org/wiki/NoSQL)
 * [MongoDB](https://en.wikipedia.org/wiki/MongoDB)
 * [PACELC theorem](https://en.wikipedia.org/wiki/PACELC_theorem)
 