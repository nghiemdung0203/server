const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.Db_host,
    user: process.env.Db_user,
    password: process.env.Db_password,
    database: process.env.Db_database,
    connectionLimit: process.env.Db_connectionLimit
});

module.exports = pool


