// process.nextTick() 和 setImmediate()

setImmediate(function() {
  console.log('immediate1');
  setImmediate(function() {
    console.log('immediate2');
  })
  process.nextTick(() => {
    console.log(`process1`);
  })
})

process.nextTick(function() {
  console.log(`process2`)
  setImmediate(function() {
    console.log('immediate3');
    process.nextTick(() => {
      console.log(`process3`);
    })
  })
})

process.nextTick(function() {
  console.log(`process4`)
  setImmediate(function() {
    console.log('immediate4');
    process.nextTick(() => {
      console.log(`process5`);
    })
  })
})

setImmediate(function() {
  console.log('immediate5');
  process.nextTick(() => {
    console.log(`process6`);
  })
})

console.log(`window`)