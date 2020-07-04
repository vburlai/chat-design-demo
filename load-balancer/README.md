# LB component

LB stands for Load Balancer.

Its task is to accept incoming connections and distribute them between several servers. You can learn more from [Wikipedia](https://en.wikipedia.org/wiki/Load_balancing_(computing)).

We use [HAProxy](http://www.haproxy.org) load balancer with sticky sessions settings for this demo because:
 * HAProxy is an open-source high availablity load balancer
 * It has reputation of being fast and efficient (in terms of processor and memory usage)
 * Sticky sessions are required for WebSockets connection over HTTP which requires `upgrade` (reconnection) to the same server.

More info:
 * [HAProxy](https://en.wikipedia.org/wiki/HAProxy)
 * [Nginx](https://en.wikipedia.org/wiki/Nginx)
 * [Websockets Load Balancing with HAProxy](https://www.haproxy.com/blog/websockets-load-balancing-with-haproxy/)
 