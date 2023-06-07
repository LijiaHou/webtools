/**
 * 实现一个基础班的Promise
 * 
 * 存在的问题：
 *  - then链式调用不是通过返回this，而是返回一个新的promise
 *  等等
 * */

// 三种状态
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'


class myPromise {
  constructor (excutor) {
    this.status = PENDING  // 初始状态
    // 因为.then可以执行多次，回调按照注册顺序依次执行，所以使用数组保存
    this._resolveQueue = []  // 成功时回调队列
    this._rejectQueue = []  // 成功时回调队列

    const _resolve = (val) => {
      // 如果已经是fulfilled或rejected状态，就不能再改变了
      if (this.status !== PENDING) return
      // promise转变为FULFILLED状态
      this.status = FULFILLED
      // 取出成功回调依次执行
      let cb
      setTimeout(() => {
        console.log('this._resolveQueue', this._resolveQueue.length)
        while (cb = this._resolveQueue.shift()) {
          cb(val)
        }
      }, 0)
    }

    const _reject = (err) => {
      // 实现与resolve类似
      if (this.status !== PENDING) return
      this.status = REJECTED
      let cb
      setTimeout(() => {
        console.log('this._rejectQueue', this._rejectQueue.length)
        while (cb = this._rejectQueue.shift()) {
          cb(err)
        }
      }, 0)
    }
    
    excutor(_resolve, _reject)
  }

  // 用来注册成功和失败的回调
  then(resolveCb, rejectCb) {
    if (resolveCb) {
      this._resolveQueue.push(resolveCb)
    }
    if (rejectCb) {
      this._rejectQueue.push(rejectCb)
    }
    return this
  }
}




// 测试
// 1. 链式调用
var p1 = new Promise(function (resolve, reject) {
  console.log("init Promise");
  if (Math.random() > 0.5) {
    resolve("大");
  } else {
    reject("小");
  }
});
p1.then(
  (data) => console.log("success", data),
  (reason) => console.log("error", reason)
).then(
  () => console.log("success 2"),
  () => console.log("error 2")
);

// 2. 异步延时
// var sleep = (time, data) =>
//   new myPromise(function (resolve, reject) {
//     setTimeout(resolve, time, data);
//   });
// sleep(3000, "时间到！").then((val) => {
//   console.log(val);
// });


// 3. 状态变更后不可变
// const p2 = new myPromise(function (resolve, reject) {
//   resolve("失败了！");
//   reject("还会成功吗！");
// });
// p2.then(
//   (data) => console.log(data),
//   (reason) => console.log(reason)
// );

