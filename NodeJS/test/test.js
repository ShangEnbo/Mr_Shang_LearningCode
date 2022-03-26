function Foo() {
  getName = function() { console.log(1) }
  return this
}

Foo.getName = function() { console.log(2) }
Foo.prototype.getName = function() { console.log(3) }

var getName = function() { console.log(4) }
function getName () { console.log(5)  }

// Foo函数没有执行，所以执行函数外部的getName
Foo.getName()   // 2
// 根据词法作用域，执行上面的函数getName
getName()       // 4
// Foo函数执行，执行函数内部的getName
Foo().getName() // 1
// 函数内部的getName替换了全局的getName
getName()       // 1
// . 的优先级比 new 高，此处new为误导
new Foo.getName() // 2
// 创建一个构造函数实例称为对象，所以调用原型上的getName
new Foo().getName() // 3