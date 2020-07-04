# CDN component

CDN stands for Content Delivery Network.

Its task is to deliver content with minimal latency, so it contains geographically-distributed servers to get closer to end-user. You can learn more from [Wikipedia](https://en.wikipedia.org/wiki/Content_delivery_network).

We use [Nginx](http://nginx.org) web server for this demo because:
 * our content is a set of static files and Nginx is good for serving them
 * Nginx can handle high load and many simultanious connections

More info:
 * [Proxy server](https://en.wikipedia.org/wiki/Proxy_server)
 * [Nginx vs Apache](https://www.keycdn.com/support/nginx-vs-apache)
 * [Last mile](https://en.wikipedia.org/wiki/Last_mile)
 