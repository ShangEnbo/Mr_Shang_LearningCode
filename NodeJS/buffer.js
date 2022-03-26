/**
 * Buffer 缓冲区
 * - Buffer.alloc(n)      创建一个n大小的缓冲区
 * - Buffer.from()        初始化一个缓冲区，需直接赋值
 * - Buffer.concat(array, totallength) 缓冲区连接，array-要连接的Buffer的数组，totalLength-连接时array中Buffer实例的总长度
 */



const buffer1 =  Buffer.alloc(10)
const buffer2 = Buffer.from([10, 20, 300])
console.log(buffer2)

buffer1.write('hello')
buffer2.write('world')
console.log(buffer1.toString())  // 从缓冲区读取数据
console.log(Buffer.concat([buffer2, buffer1]))

const buffer3 = Buffer.alloc(5)
const buffer4 = Buffer.alloc(5)
buffer3.write('hello')
buffer4.write('world')
console.log(Buffer.concat([buffer3, buffer4], 20))

