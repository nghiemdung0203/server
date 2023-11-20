const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'resdb',
    connectionLimit: 10
});

module.exports = pool


