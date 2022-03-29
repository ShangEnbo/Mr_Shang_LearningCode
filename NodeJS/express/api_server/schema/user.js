const joi = require('@hapi/joi')

/**
 * string() 必须是字符串
 * 
 */

// 用户名的验证规则
const username = joi.string().alphanum().min(1).max(10).required()
// 密码的验证规则
const password = joi.string().pattern(/^[\S]{6,12}$/).required()
// id的验证规则
const id = joi.number().integer().min(1).required()
// nickname的验证规则
const nickname = joi.string().required()
// email的验证规则
const email = joi.string().email().required()

exports.req_login_schema = { 
  // 表示需要对 req.body 中的数据进行验证
  body: {
    username,
    password
  }
}

exports.update_userinfo_schema = {
  body: {
    username,
    nickname,
    email
  }
}

// 验证规则对象——更新密码
exports.update_password_schema = {
  body: {
    oldpwd: password,
    /**
     * joi.red(oldpwd) 表示引用oldpwd的值
     * joi.not(joi.red(oldpwd)) 表示 新密码 不等于 旧密码
     * .concat(password) 和password规则合并
     */
    newpwd: joi.not(joi.ref('oldpwd')).concat(password)
  }
}