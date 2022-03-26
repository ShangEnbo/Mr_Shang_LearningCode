// main路由模块

// 导入路由对象
const express = require('express')

// 创建路由对象
const router = express.Router()

// 挂载具体路由
router.get('/user/list', (req, res) => {
  res.send('GET user list')
})

router.post('/user/add', (req, res) => {
  res.send('Add new user')
})

// 向外导出路由对象
module.exports = router