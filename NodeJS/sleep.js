// 实现方法一 setTimeout

let fun = () => { console.log('time out') }

let sleep = function(fun, time) {
  setTimeout(() => {
    fun()
  }, time);
}

// sleep(fun, 2000)

// 实现方法二 Promise

// let sleep2 = (time) => new Promise((resolve) => {
//   setTimeout(resolve, time)
// })

let sleep2 = function(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

// sleep2(2000).then(fun)


// 实现方法三 async和await

// async function wait(time) {
//   await sleep2(time)
//   fun()
// }

// wait(1000)

// console.log(Promise.resolve())

async function sleep1(time, fun) {
  await new Promise((resolve) => {
    setTimeout(resolve, time)
  })
  fun()
}
sleep1(3000)

// let fun1 = () => {
//   setTimeout(() => {
//     return Promise.resolve()
//   }, 1000)
// }
// console.log(fun1())