const express = require('express')
const http = require('http')

const app = express()

// app.get('/', (req, res) => {
//   console.log(req.method)
//   console.log(req.query)
//   // res.send({ name: 'ss'})
//   res.send(req.query)
// })

// 动态匹配参数
// :id 是一个动态参数
// app.get('/user/:id/:rs', (req, res) => {
//   // res.params 是动态匹配到的 URL 参数，默认是一个空对象
//   res.send(req.params)
// })

// app.post('/users', (req, res) => {
//   res.send('请求成功')
// })

// express.static 托管静态资源
// 将public文件夹内的资源暴露在网络上，不用在URL上不用加public
// 比如我要访问public文件夹内的index.html，直接输入http://localhost:3000/index.html
// app.use(express.static('./public')) 

// 我们可以托管多个静态资源
// 如果调用相同资源名的文件，会按先后顺序读取文件夹
// app.use('/files', express.static('./file'))

// 比如我现在托管public和file文件夹内的静态资源，两个文件夹内都有index.html文件，浏览器会先访问到public/index.html文件并输出
// 如果我们向把这两个index.html文件进行区分，我们可以挂在路径前缀
// 默认，第一个文件路径内可以不用挂在路径前缀，第二个挂载路径前缀也可以进行简单的区分
// app.use('/public', express.static('./public'))
// app.use(express.static('./file'))
// app.use('/files', express.static('./file'))



app.listen(3000, () => { 
  console.log('express server running at localhost:3000')
})

http.createServer(app).listen(3001)
