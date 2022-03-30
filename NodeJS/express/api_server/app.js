const express = require('express')
const cors = require('cors')
const joi = require('@hapi/joi')
const expressJWT = require('express-jwt')
const config = require('./config.js')
const userRouter = require('./router/user')
const dataRouter = require('./router/data')
const userinfoRouter = require('./router/userinfo')

const app = express()

// 跨域处理
app.use(cors())

// 表单解析
app.use(express.urlencoded({ extended: false }))

// send() 优化：对错误的处理中间件
app.use((req, res, next) => {
  res.cc = function(err, status = 500) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err
    })
  }

  next()
})

// token认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//]}))

// 引入路由
app.use('/api', userRouter)
app.use('/api', dataRouter)
app.use('/my', userinfoRouter)

// 错误级中间件
app.use((err, req, res, next) => {
  // 验证失败导致的错误
  if(err instanceof joi.ValidationError) return res.cc(err)
  // JWT身份认证失败
  if(err.name === 'UnauthorizedError') return res.cc('身份认证失败')
  console.log('未知错误');
  // 未知错误
  res.cc(err)

})

app.listen(3000, () => {
  console.log('api server run start');
})