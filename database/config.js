const mysql = require('mysql');
const password = require('./mysql-pw');

const dataConnection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : password,
    database : 'bamazon'
  });

module.exports = dataConnection;