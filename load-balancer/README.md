# LB component

LB stands for Load Balancer.

Its task is to accept incoming connections and distribute them between several servers. You can learn more from [Wikipedia](https://en.wikipedia.org/wiki/Load_balancing_(computing)).

We use [HAProxy](http://www.haproxy.org) load balancer with sticky sessions settings for this demo because:
 * HAProxy is an open-source high availablity load balancer
 * It has reputation of being fast and efficient (in terms of processor and memory usage)
 * Sticky sessions are required for WebSockets connection over HTTP which requires `upgrade` (reconnection) to the same server.

 We have some extra lines of configuration to demonstrate load balancing. We needed half of clients to end up on one app-server and half on another.

 > Load balancer uses `SERVERID` cookie to keep the session consistent.
 >
 > Since cookies are shared accross domain we had to make half of clients load as http://localhost:3002/ and another half as http://127.0.0.1:3002/ (which is exactly the same entity but technically different domain names).
 >
 > This way `localhost` gets `SERVERID=app-server-cookie-1` cookie and `127.0.0.1` gets `SERVERID=app-server-cookie-2`.

More info:
 * [HAProxy](https://en.wikipedia.org/wiki/HAProxy)
 * [Nginx](https://en.wikipedia.org/wiki/Nginx)
 * [Websockets Load Balancing with HAProxy](https://www.haproxy.com/blog/websockets-load-balancing-with-haproxy/)
 