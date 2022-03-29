const express = require('express')
const userinfo_handler = require('../router_handle/userinfo.js')

const router = express.Router()


// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
const { update_userinfo_schema, update_password_schema } = require('../schema/user')


router.get('/userinfo', userinfo_handler.getUserInfo)
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo)
router.post('/updatepwd', expressJoi(update_password_schema),userinfo_handler.updatePassword)

module.exports = router