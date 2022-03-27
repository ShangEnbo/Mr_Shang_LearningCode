const mysql = require('mysql')

const db = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '20010516',
  database: 'my_db_01'
})

// db.connect()



// 查询数据
function select(str) {
  db.query(str, (err, results) => {
    if(err) return console.log(err.message)
    // 执行select查询语句，输出的是数组
    console.log(results)
  })
}


// 查询user表中的所有数据
const sqlStr = 'select * from users'
// select(sqlStr)

// 插入数据
/* 
const sqlStr1 = 'insert into users (username, password) values (?, ?)'
const user = { username: 'spider-man', password: 'pcc321'}

db.query(sqlStr1, [user.username, user.password], (err, results) => {
  if(err) return console.log(err.message)
  if(results.affectedRows === 1) { console.log('插入成功') }
})
 */

// 便捷插入数据的方法
/* 
const sqlStr1 = 'insert into users set ?'
const user = { username: 'Shang-man', password: '5160'}

db.query(sqlStr1, user, (err, results) => {
  if(err) return console.log(err.message)
  if(results.affectedRows === 1) { console.log('插入成功') }
})
 */

// 更新数据

// const user = { id: 3, username: 'seb', password: '05160'}
// const sqlStr2 = 'update users set username=?, password=? where id=?'

// db.query(sqlStr2, [user.username, user.password, user.id], (err, results) => {
//   if(err) return console.log(err.message)
//   if(results.affectedRows === 1) { console.log('更新成功') }
// })

// 便捷更新数据的方法
/* 
const sqlStr3 = 'update users set ? where id=?'
db.query(sqlStr3, [user, user.id], (err, results) => {
  if(err) return console.log(err.message)
  if(results.affectedRows === 1) { console.log('更新成功') }
})
 */

// 删除数据
// const sqlStr4 = 'delete from users where id=?'
// db.query(sqlStr4, 5, (err, results) => {
//   if(err) return console.log(err.message)
//   if(results.affectedRows === 1) { console.log('删除成功') }
// })

// 标记删除

const sqlStr5 = 'update users set status=? where id=?'
db.query(sqlStr5, [1, 3], (err, results) => {
  if(err) return console.log(err.message)
  if(results.affectedRows === 1) { console.log('标记删除成功') }
})