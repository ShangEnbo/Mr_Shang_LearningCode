const express = require('express')
const userRouter = require('./router_modules/main')

const app = express()

// app.get('/', (req, res) => { res.send('GET hello world') })
// app.post('/', (req, res) => { res.send('POST hello world') })

app.use(userRouter)
app.use('/main', userRouter)

app.listen('3001', () => {
  console.log('服务器启动')
})