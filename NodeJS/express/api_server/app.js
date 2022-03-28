const express = require('express')
const cors = require('cors')

const userRouter = require('./router/user')

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



// 引入路由
app.use('/api', userRouter)


app.listen(3000, () => {
  console.log('api server run start');
})