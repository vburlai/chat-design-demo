const mysql = require('mysql');
const {
    mysqlPrimaryHost,
    mysqlPrimaryUser,
    mysqlPrimaryPassword,
    mysqlPrimaryDatabase,
} = require('../config/env');

let mysqlPrimaryConnection = null;

const mysqlPrimaryConnect = async () => {
    if (!mysqlPrimaryConnection) {
        mysqlPrimaryConnection = mysql.createConnection({
            host: mysqlPrimaryHost,
            user: mysqlPrimaryUser,
            password: mysqlPrimaryPassword,
            database: mysqlPrimaryDatabase,
        });
        mysqlPrimaryConnection.connect();
    }
};

const mysqlPrimaryQuery = async (query, replacements) => {
    await mysqlPrimaryConnect();
    const res = await new Promise((resolve, reject) => {
        mysqlPrimaryConnection.query(query, replacements, (error, result, fields) => {
            if (error) { reject(error) };
            resolve(result);
        })
    });
    return res;
};

module.exports = {
    mysqlPrimaryQuery,
};
