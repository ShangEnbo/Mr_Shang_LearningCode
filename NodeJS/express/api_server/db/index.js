const mysql = require('mysql')

const db = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '20010516',
  database: 'my_db_01'
})

module.exports = db