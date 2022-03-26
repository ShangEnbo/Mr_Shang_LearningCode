function promisify(fn) {
  return function() {
    let args = Array.prototype.slice.call(arguments)
    return new Promise((resolve, reject) => {
      args.push(function(err, result) {
        if(err) reject(err)
        else resolve(result)
      })
      fn.apply({}, args)
    })
  }
}

module.exports = {
  promisify
}