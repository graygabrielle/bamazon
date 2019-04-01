const mysql = require('mysql');

const dataConnection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'XiYZ4r8ZgNN9bEUZgaF2QhYQME',
    database : 'bamazon'
  });

module.exports = dataConnection;