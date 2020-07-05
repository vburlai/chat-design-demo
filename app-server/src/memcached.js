const Memcached = require('memcached');
const { memcachedAddr } = require('./env');
const memcached = new Memcached(memcachedAddr);

const memcachedGet = (key) => new Promise((resolve, reject) => {
    memcached.get(key, (err, data) => {
        if (err) {
            reject(err);
        }
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
    memcachedGet(key).then(arr => {
        if (!arr) {
            arr = [];
        }
        arr.push(value);
        return memcachedSet(key, arr, lifetime);
    });

const memcachedFilterFromArray = (key, filter, lifetime) =>
    memcachedGet(key).then(arr => {
        if (!arr) {
            arr = [];
        }
        return memcachedSet(key, arr.filter(filter), lifetime);
    });

module.exports = { memcached, memcachedGet, memcachedSet, memcachedAddToArray, memcachedFilterFromArray };
