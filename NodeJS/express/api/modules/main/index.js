const express = require('express')

const router = express.Router()

router.get('/main', (req, res) => {
  const query = req.query
  // res.setHeader('Access-Control-Allow-Origin', '*')
  res.send({
    status: 0,
    msg: 'GET请求成功',
    data: query
  })
})

router.post('/user', (req, res) => {
  const body = req.body
  res.send({
    status: 0,
    msg: 'POST请求成功',
    data: body
  })
})

router.delete('/delete', (req, res) => {
  // const body = req.body
  res.send({
    status: 0,
    msg: 'DELETE请求成功',
  })
})

module.exports = router