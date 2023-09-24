
// 深拷贝
// 移动端1px 
// 字符串穷举
// react 和 Vue 的区别
// 事件循环输出

const reverseArr = (arr, start, end) => {
  while (start <= end) {
      [arr[start], arr[end]] = [arr[end], arr[start]]
      start++
      end--
  }
}
const a = [1,2,3,4,5,6,7]
console.log(a);
reverseArr(a, 0, a.length)
console.log(a);

