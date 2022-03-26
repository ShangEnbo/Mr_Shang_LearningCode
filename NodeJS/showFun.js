const os = require('os')

  // 内存占用率
  function showMem() {
    const mem = os.freemem() / os.totalmem * 100
    console.log(`内存占用率：${mem.toFixed(2)}`);
  }
  // Cpu占用率
  function showCpu() {
    const cpuState = require('cpu-stat')
    cpuState.usagePercent((err, percent) => {
      console.log(`CPU占用率：${percent.toFixed(2)}`)
    })
  }
  // 操作系统
  function showType() {
    console.log(os.type())
  }
module.exports = {
  showMem,
  showCpu,
  showType
}