# Cache component

Its task is keep frequently used information in memory. It is a key → value store with some information potentially disappearing after time or if memory limit reached. You can learn more from [Wikipedia](https://en.wikipedia.org/wiki/Cache_(computing)).

We use [Memcached](http://memcached.org) server for this demo because:
 * Memcached is very simple and fast
 * It has clients for NodeJS and PHP
 * It uses least recently used (LRU) policy
 * It also can scale if needed

More info:
 * [Memcached Overview](https://github.com/memcached/memcached/wiki/Overview)
 * [Redis](https://en.wikipedia.org/wiki/Redis)
