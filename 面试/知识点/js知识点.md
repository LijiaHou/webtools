## js中的数据类型

1. undefined
2. null
3. String
4. number
5. boolean
6. Symbol (es6)
7. Bigint（es2020）
8. Object

存储位置

​	1-7：栈内存（基本数据类型）

​	8：堆 



## 判断数据类型的方式

1. typeof

   - `typeof xxx`	返回数据类型的名字
   - typeof null	特例，返回'Object'

2. Object.prototype.toString.call(xxx)

   - 取得该对象的 `[Symbol.toStringTag]` 属性值（可能会遍历原型链）作为 `tag`，然后返回 `'[object + tag]'` 形式的字符串

3. instanceof 

   用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上

   - `object instanceof constructor` 

4. constructor

   - `'asd'.constructor === String`
   - `true.constructor === Boolean`
   - ...
   - 但有些对象无法使用此办法判断，比如null、undefined



## ES6新特性

1. const 和 let
2. 解构赋值、扩展运算符
3. 模板字符串
4. 函数
   - 函数参数的默认值
   - rest参数
   - 箭头函数
5. 数组
   - `Array.from()`
   - `find()` `findIndex()`
   - `entries()` `keys()` `values()`
   - `includes()`
6. 对象
   - 属性名可以是表达式
   - `Object.assign()`
   - `Object.keys()` `Object.values()` `Object.entries()`
7. Symbol
8. Set Map
9. Promise
10. for...of
11. async await



## 箭头函数与普通函数的区别

1. 写法更简洁 () => {}
2. 没有prototype（原型），也就没有自身this
   - 箭头函数中使用的this，是指向在定义的时候外层第一个普通函数的this
3. 没有arguments参数
4. `call` | `apply` | `bind` 无法改变箭头函数中`this`的指向
5. 箭头函数不能作为构造函数
6. 箭头函数不能作为Generator函数，不能使用yield关键字



## Promis 和 async/await

### Promise

Promise对象就是为了解决**回调地狱**而提出的。它不是新的语法功能，而是一种新的写法，允许将回调函数的嵌套，改成链式调用


# 浅复制

js在语言层面仅支持浅复制，深复制需要手动实现

- 扩展运算符
- Object.assign()
- Object.getOwnPropertyDescriptors() + Object.defineProperties()

# 闭包

当通过调用一个外部函数返回一个内部函数后，即使外部函数执行结束了，但是内部函数引用外部函数的变量依然保存在内存中，把这些变量的集合称为闭包