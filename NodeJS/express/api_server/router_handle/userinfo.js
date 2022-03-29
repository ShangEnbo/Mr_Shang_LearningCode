const db = require("../db")
const bcrypt = require('bcryptjs')


// 获取用户的基本信息
exports.getUserInfo = (req, res) => {
  const sql = 'select id, username, nickname, email, user_pic from ev_users where id=?'

  db.query(sql, req.user.id, (err, results) => {
    if(err) return res.cc(err)

    if(results.length !== 1) return res.cc('获取用户信息失败')

    res.send({
      status: 200,
      message: '获取用户基本信息成功',
      data: results[0]
    })
  })
}

// 更新用户的基本信息
exports.updateUserInfo = (req, res) => {
  const sql = 'update ev_users set ? where id=?'

  db.query(sql, [req.body, req.user.id], (err, results) => {
    if(err) return res.cc(err)

    if(results.affectedRows !== 1) return res.cc('更新用户信息失败')

    res.cc('更新用户基本信息成功', 200)
  })
}

// 密码更新
exports.updatePassword = (req, res) => {
  const sql = 'select * from ev_users where id=?'

  // 对比原密码
  db.query(sql, req.user.id, (err, results) => {
    if(err) return res.cc(err)

    if(results.length !== 1) return res.cc('用户不存在')
    
    // 比较原密码
    const compare = bcrypt.compareSync(req.body.oldpwd, results[0].password)
    if(!compare) return res.cc('与原密码不符')

    // 对新密码进行加密
    const newPwd = bcrypt.hashSync(req.body.newpwd, 10)

    // 更新密码数据
    const sql = 'update ev_users set password=? where id=?'
    db.query(sql, [newPwd, req.user.id], (err, results) => {
      if(err) return res.cc(err)

      if(results.affectedRows !== 1) return res.cc('密码修改失败')

      res.cc('密码修改成功', 200)
    })
  })
}