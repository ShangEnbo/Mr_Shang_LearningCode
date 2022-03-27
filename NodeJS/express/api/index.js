const express = require('express')
const cors = require('cors')
const mainRouter = require('./modules/main/index')

const app = express()

// 必须在配置 cors 中间件之前配置 JSONP 的借口
app.get('/api/jsonp', (req, res) => {
  // TODO: 定义JSONP借口具体的实现过程
  const funcName = req.query.callback

  const data = { name: 'zs', 'age': 21112 }

  const scriptstr = `${funcName}(${JSON.stringify(data)})`

  res.send(scriptstr)
})


app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-token')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Method', 'GET,POST,HEAD,PUT,DELETE')

  // res.writeHead({
  //   'Access-Control-Allow-Headers': 'Content-Type, X-token',
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Method': 'GET,POST,HEAD,PUT,DELETE',
  //   'Content-Type': 'text/plain'
  // })
  next()
})

// write api
app.use('/api', mainRouter)

app.listen('3000')