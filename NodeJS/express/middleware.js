const express = require('express')
const parse = require('body-parse')
const app = express()

app.use(express.json())
// app.use(express.urlencoded({ extended: false }))
app.use(parse.urlencoded({ extended: false }))

// 定义一个中间件
const mw = function (req, res, next) {
  console.log('this is a easy middleWare')
  const time = Date.now()
  req.startTime = time
  next()
}

const mw1 = function (req, res, next) {
  console.log('this is a easy middleWare111')
  next()
}
app.use(mw)
app.use(mw1)
app.use((req, res, next) => {
  console.log(req.startTime)

  console.log('444')
  next()
})

app.get('/', (req, res) => {
  console.log(req.startTime)
  res.send('HOME PAGE')
})


app.get('/users',mw,mw1, (req, res) => {
  res.send('HOME PAGE')
})

app.listen(80, () => {
  console.log('start success');
})


