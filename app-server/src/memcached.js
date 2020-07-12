const Memcached = require('memcached');
const { memcachedAddr } = require('./env');
const memcached = new Memcached(memcachedAddr);

const memcachedGet = (key) => new Promise((resolve, reject) => {
    memcached.get(key, (err, data) => {
        if (err) {
            reject(err);
        }
        console.log('memcachedGet', key, data);
        resolve(data);
    });
});

const memcachedSet = (key, value, lifetime) => new Promise((resolve, reject) => {
    console.log('memcachedSet', key, value);
    memcached.set(key, value, lifetime, (err, result) => {
        if (err) {
            reject(err);
        }
        resolve(result);
    });
});

const memcachedAddToArray = (key, value, lifetime) =>
    memcachedGet(key).then(json => {
        if (!json) {
            json = "[]";
        }
        const arr = JSON.parse(json); // JSON required for compatibility with PHP
        arr.push(value);
        return memcachedSet(key, JSON.stringify(arr), lifetime);
    });

const memcachedFilterFromArray = (key, filter, lifetime) =>
    memcachedGet(key).then(json => {
        if (!json) {
            json = "[]";
        }
        const arr = JSON.parse(json); // JSON required for compatibility with PHP
        return memcachedSet(key, JSON.stringify(arr.filter(filter)), lifetime);
    });

module.exports = { memcached, memcachedGet, memcachedSet, memcachedAddToArray, memcachedFilterFromArray };
