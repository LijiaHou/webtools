# js中的数据类型

1. undefined
2. null
3. String
4. number
5. boolean
6. Symbol (es6)
7. Bigint（es2020）
8. Object

### 存储位置

- 1~7：栈内存（基本数据类型）
- 8：堆


## 判断数据类型的方式

1. typeof

   - `typeof xxx`	返回数据类型的名字
   - typeof null	特例，返回'Object'
   - 优点时能快速区分基本数据类型，但是不能区分 Object、Array、Null，都返回 object

2. Object.prototype.toString.call(xxx)

   - 取得该对象的 `[Symbol.toStringTag]` 属性值（可能会遍历原型链）作为 `tag`，然后返回 `'[object + tag]'` 形式的字符串
   - 优点：精确
   - 缺点：写法繁琐，需要封装

3. instanceof 

   - `[] instanceof Array` 
   - 用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上
   - 优点：能够区分 Array、Object和Function，适合用于判断自定义的类实例对象
   - 缺点：不能判断 Number，Boolean，String基本数据类型


4. constructor

   - `'asd'.constructor === String`
   - `true.constructor === Boolean`
   - ...
   - 但有些对象无法使用此办法判断，比如null、undefined



# ES6新特性

### 一、ES6（ECMAScript 2015）
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
12. ...
    
### 二、ES7（ECMAScript 2016）
1. Array.prototype.`includes`()
2. 指数操作符 `**` ，等同于 Math.pow()

### 二、ES8（ECMAScript 2017）
1. async/await
2. Object.values()
3. Object.entries()
4. String.prototype.padStart()、String.prototype.padEnd()
5. ...

### 三、ES9（ECMAScript 2018）
1. Promise.prototype.finally()
2. for await
3. `...` 运算符应用于 对象、函数传参中
4. ...

### 四、ES10（ECMAScript 2019）
1. Array.flat()
2. String.trimStart() 、 String.trimEnd()
3. Object.fromEntries()
4. String.prototype.matchAll
5. ...

### 五、ES11（ECMAScript 2020）
1. 动态 import()
2. 空值合并运算符（`??`）
   - a ?? b ，仅当 a 为 undefined 或 null 时 取 b
   - 与 a || b 区别，为了避免 a 的取值为 0 、false、NaN 的情况
3. Bigint
4. ...

### 六、ES12（ECMAScript 2020）
1. replaceAll
2. Promise.any
3. ??== 、&&= 、||=
4. ...

## var、let、const 区别
- var 可以先使用后声明；let、const 不可以
- var 可以重复声明变量；let、const 不可以
- var 没有块级概念，可以跨块访问（但不可以跨函数）；let、const 是有作用域的，不能跨块访问
- const 声明必须赋值，用来声明常量，一旦赋值，不能再修改
- var 在全局范围声明变量时，会把变量添加到 window 对象中；let、const 不会

## JS 垃圾回收
### 常见回收机制
  - 标记清除
    - 当变量进入环境，被标记为进入环境，离开环境时也被标记。垃圾回收器会销毁被标记离开的变量，并回收内存
  - 查找引用
    - 不定时查找内存的引用，如果没有被引用，则回收
  - 引用计数
### 常见内存泄漏
- 全局变量
- 闭包
- 定时器、事件监听器
- DOM 元素使用

### 优化手段
手动释放不再需要的资源
- 堆内存：`fn = null`  空指针对象
- 栈内存：把上下文中，被外部占用的堆占用取消

## 闭包

### 概念
函数执行时，会形成一个私有的上下文区域，这个区域有自己的私有变量储存空间，不受外界干扰，当文中有某个变量被外部占用，那么尽管函数执行完毕，上下文还是没有被释放，这种机制我们称其为**闭包**

### 形成
当通过调用一个外部函数返回一个内部函数后，即使外部函数执行结束了，但是内部函数引用外部函数的变量依然保存在内存中，简言之，**函数嵌套函数**

### 应用
- 防抖、节流函数
  - 防抖：搜索输入框、联想
  - 节流：滚动加载更多
- 链式调用
- 发布-订阅模式

### 优点
- **变量保护**：封装在函数内部，避免全局污染，保护不被外部访问修改
- **延长私有变量的生命周期**
- 实现模块化
- 保持状态

### 缺点
闭包的变量是一直储存在内存中的，大量使用，可能导致内存的泄露

## 箭头函数与普通函数的区别

1. 写法更简洁 () => {}
2. 箭头函数的 this 指向**永远不变**
   - 箭头函数中使用的this，是指向在定义的时候外层第一个普通函数的this
3. `call` | `apply` | `bind` **无法改变**箭头函数中`this`的指向
4. 没有arguments参数
5. 没有原型 prototype
6. 箭头函数不能作为构造函数
7. 箭头函数不能作为Generator函数，不能使用yield关键字

## 原型和原型链
- 每个 class 都有原型 prototype
- 每个 实例 都有隐式原型 __proto__ (不推荐，现在应该使用 Object.getPrototypeOf()\Object.setPrototypeOf())
- 实例的 __proto__  ===  对应 Class 的 prototype

```js
const obj = { a: 1 };
Object.getPrototypeOf(obj) === Object.prototype; // true

const array = [1, 2, 3];
Object.getPrototypeOf(array) === Array.prototype; // true
```

# 深拷贝
使用递归实现一个深拷贝
```js
function deepClone(obj, hash = new WeakMap()) {
    if (obj == null) {
        return obj
    }
    if (typeof obj !== 'object') {
        return obj
    }

    // 防止循环引用，使用 WeakMap 防止内存泄漏
    if (hash.get(obj)) {
        console.log('hash: ');
        return hash.get(obj)
    }

    let cloneObj = new obj.constructor()
    hash.set(obj, cloneObj)

    for(let key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloneObj[key] = deepClone(obj[key], hash)
        }
    }

    return cloneObj
}

const a = 
{
    name: 'Jack',
    sport: ['run', 'fly', 'jump'],
    age: 1,
}
// 测试循环引用
a.o = a

b  = deepClone(a)

b.o.name = 'Bobby'

console.log('a:', a)
console.log('b:', b)
```
## new 运算符 
### 过程
1. 创建一个空对象 `{}`
2. 将第一步的 空对象 链接到 new操作符后面的构造函数的原型对象
3. 将这个空对象，作为构造函数的 `this` 上下文
4. 返回对象实例

### 原理
```js
const myNew = function (constructor) {
  return function (...args) {
    // 创建空对象
    const obj = Object.create(null)
    // 链接原型
    Object.setPrototypeOf(obj, constructor.prototype)
    // 将obj作为构造函数的this上下文
    const res = constructor.aplly(obj, args)
    // 如果构造函数有返回值，则将返回值作为实例对象返回，否则返回obj作为实例对象
    return res || obj
  }
}

function Dog(name) {
    this.name = name
    this.say = () => {
        console.log(this.name + ' 汪汪!')
    }
}
const ins = myNew(Dog)('旺财')
ins.say() // 旺财 汪汪!
console.log(ins) // { name: '旺财', say: [Function (anonymous)] }
```

事实上，我们可以通过不断的调用 `Object.getPrototypeOf()` 来一直沿着原型链向上走，直到 `null`，因为 `Object.prototype` 的原型对象是 `null`
 
## Promise 和 async/await

### Promise

Promise对象就是为了解决**回调地狱**而提出的。它不是新的语法功能，而是一种新的写法，允许将回调函数的嵌套，改成链式调用

### 手写简单版本
```js
// 实现 Promise
const PENDING = 'PENDING'
const FUFILLED = 'FUFILLED'
const REJECTED = 'REJECTED'

class myPromise {
  constructor(initFn) {
    this.state = PENDING
    this.value = undefined
    this.resolveQueue = []
    this.rejectQueue = []

    const resolveFn = (res) => {
      if (this.state === 'PENDING') {
        this.value = res
        this.state = FUFILLED
        this.resolveQueue.forEach(cb => cb(res))
      }
    }

    const rejectFn = (res) => {
      if (this.state === 'PENDING') {
        this.value = res
        this.state = REJECTED
        this.rejectQueue.forEach(cb => cb(res))
      }
    }

    initFn(resolveFn, rejectFn)
  }


  then(resolveCb, rejectCb) {
    if (this.state === FUFILLED) {
      resolveCb && resolveCb(this.value)
    }
    if (this.state === REJECTED) {
      rejectCb && rejectCb(this.value)
    }
    if (this.state = PENDING) {
      this.resolveQueue.push(resolveCb)
      this.rejectQueue.push(rejectCb)
    }
  }
}

// 如果还有实现链式调用，需要在 then 方法中返回一个新的 Promise (不能返回this)
// test
const p = new myPromise((resolve, reject) => {
  console.log('promise start')
  setTimeout(() => {
    reject('错了哦')
    resolve(1)
  }, 2000); 
})

p
.then((res) => {
  console.log('then1', res)
}, (err) => {
  console.log('err1', err)
})
```

### Promise.all
Promise.all 用来将多个 Promise 实例，包装成一个新的 Promise 实例，当传入的所有的 Promise 实例**都为 fufilled 状态**，**all 方法才转为 fufilled 状态**，否则是失败状态
```js
// 实现 Promise.all
Promise.myAll = (promiseArr) => {
  return new Promise((resolve, rejected) => {
    const resArr = []
    let resCount = 0
    for (let i = 0; i < promiseArr.length; i++) {
      promiseArr[i].then((res) => {
        resArr[i] = res
        resCount++
        if (resCount === promiseArr.length) {
          resolve(resArr)
        }
      }, (err) => {
        rejected(err)
      })
    }
  })
}


// test
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
    // reject('错了哦')
  }, 1000); 
})
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(2)
    // reject('错了哦')
  }, 3000); 
})

Promise.all([p1, p2])
.then((reses) => {
  console.log('then1', reses)
}, (err) => {
  console.log('err1', err)
})

```

# 浅复制

js在语言层面仅支持浅复制，深复制需要手动实现

- 扩展运算符
- Object.assign()
- Object.getOwnPropertyDescriptors() + Object.defineProperties()



# addEventListener有哪些参数
addEventListener() 方法将指定的监听器注册到目标对象上（不一定是Dom元素，也可以是XMLHttpRequest对象），当该对象触发指定的事件时，回调就会执行

`addEventListener(type, listener, options);`

- type
   
  表示事件类型。例如：click、blur、focus、scroll、transitionend

- listener

   回调函数

- options（可选）
  - capture

      一个布尔值，表示 listener 会在该类型的事件**捕获阶段**传播到该 EventTarget 时触发
   
   - once

      如果为 true，listener 会在其被调用一次之后自动移除

# 事件循环（Event Loop）
### 浏览器中的事件循环
- 函数入栈，当执行栈遇到 宏任务、微任务 ，就分别放入 宏任务队列、微任务队列，然后继续执行栈中的同步代码，直至栈空
- 执行栈清空以后，开始执行清空**微任务**队列（Promise.then）
- 微任务队列也清空后，进入**宏任务**队列(setTimeout``)。取出队列中第一个宏任务，放入栈中执行，完成后，查看有没有 微任务，如果有则清空微任务
- 然后再取出一个 宏任务，做上一步的循环，直到所有任务执行完毕

```js
async function async1 () {
    console.log('async1 start');
    await async2()
    console.log('async1 end');
}

async function async2 () {
    console.log('async2');
}


console.log('start');

async1()

setTimeout(() => {
    console.log('setTimeout');
}, 0);

new Promise((res) => {
    console.log('promise');
    res(2)
}).then (() => {
    console.log('then');
})

console.log('end');
```

运行结果是：

```
start
async1 start
async2
promise
end
async1 end
then
setTimeout
```