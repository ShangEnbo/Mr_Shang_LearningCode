const fs = require('fs')
const https = require('https')

const key = fs.readFileSync('./ssl/key.pem')
const cert = fs.readFileSync('./ssl/cert.pem')

const options = {
  key,
  cert
}

https.createServer(options, (req, res) => {
  res.writeHead(200)
  res.end('hello world\n')
}).listen(8000)