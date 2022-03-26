const fs = require('fs')

/**
 * -读文件
 * -- 同步读取
 * -- 异步读取
 * -----异步函数promisify
 * -----异步函数fs/promise
 */

// 同步读取
// const data = fs.readFileSync('./package.json')
// console.log(data)


// 异步读取
// const data1 = fs.readFile('./package.json', (err, data) => {
//   console.log(data)
// })

// 异步函数promise化
function promisify(fn) {
  return function() {
    let args = Array.prototype.slice.call(arguments)
    return new Promise(function (resolve, reject) {
      args.push(function (err, result) {
        if(err) reject('no such file or directory')
        else resolve(result)
      })
      fn.apply({}, args)
    })
  }
}

var readFile = promisify(fs.readFile) // 返回一个函数
// readFile('./package.json') 返回一个Promise对象
readFile('./package.json').then((res)=> {
  console.log(res.toString());
})


// Node版本大于8，util中有promisify
// const { promisify } = require('util')
// var file = promisify(fs.readFile)
// 第一种方法 Promise.then
// file('./package.json').then((res) => {
//   console.log(res.toString());
// })
// 第二种方法 async/await
// async function a() {
//   // await部分是一个Promise对象，不能直接使用fs.readFile()
//   let data3 = await file('./package.json')
//   console.log(data3)
// }
// a()


// Node版本大于10
// 第三种方法
// 使用Promise.then()
// const { readFile } = require('fs/promises')
//readFile返回的是一个Promise对象
// readFile('./package.json').then((res)=>{
//   console.log(res)
// })
// 使用async/await
// async function a() {
//   let data3 = await readFile('./package.json')
//   console.log(data3)
// }
// a()