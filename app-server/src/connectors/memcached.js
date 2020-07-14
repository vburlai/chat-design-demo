const Memcached = require('memcached');
const { memcachedAddr } = require('../config/env');
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

const memcachedSetArray = (key, arr, lifetime) =>
    memcachedSet(key, JSON.stringify(arr), lifetime); // JSON required for compatibility with PHP

const getFromDBWriteArrayToMemcache = async (key, getFromDB, lifetime) => {
    const arr = getFromDB ? await getFromDB() : [];
    await memcachedSetArray(key, JSON, lifetime);
    return arr;
}

const memcachedGetArray = (key, getFromDB = null, lifetime = 0) =>
    memcachedGet(key)
        .then(json => json ? JSON.parse(json) : getFromDBWriteArrayToMemcache(key, getFromDB, lifetime));

const memcachedAddToArray = (key, value, getFromDB, lifetime) =>
    memcachedGetArray(key, getFromDB, lifetime)
        .then(arr => memcachedSetArray(key, arr.concat(value), lifetime));

const memcachedFilterFromArray = (key, filter, getFromDB, lifetime) =>
    memcachedGetArray(key, getFromDB, lifetime)
        .then(arr => memcachedSetArray(key, arr.filter(filter), lifetime));

module.exports = {
    memcachedGetArray,
    memcachedSetArray,
    memcachedAddToArray,
    memcachedFilterFromArray,
};
