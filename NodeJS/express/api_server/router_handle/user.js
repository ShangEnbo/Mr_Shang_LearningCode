const db = require('../db/index')
const bcrypt = require('bcryptjs')

// 注册新用户
exports.register =  (req, res) => {
  const userinfo = req.body

  if(!userinfo.username || !userinfo.password) return res.cc('用户名或密码不合法')

  // 用户名重复查询操作
  const sql = 'select * from ev_users where username=?'
  db.query(sql, [userinfo.username], (err, results) => {
    if(err) return res.cc(err)

    if(results.length > 0) return res.cc('用户名被占用') 

    userinfo.password = bcrypt.hashSync(userinfo.password, 10)

    const sql = 'insert into ev_users set ?'
    db.query(sql, userinfo, (err, results) => {
      if(err) return res.cc(err)

      if(results.affectedRows !== 1) return res.cc( '注册失败')

      res.cc('注册成功', 200)
    })
  })
}

// 登录
exports.login =  (req, res) => {
  res.send('login ok')
}
