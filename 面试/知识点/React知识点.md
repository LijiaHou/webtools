# setState
**setState**本质上通过一个队列机制来实现state更新的，执行setState时会将更新的state合并放入**状态队列**，不会立即更新state，而是批量更新state

# 组件声明周期
- init初始化
- render渲染前
- render渲染
- mount挂载
- unmount卸载

# hooks
## useState
用来储存与UI相关的数据，在刷新时，useState可以保持数据，函数组件中其他的普通变量会被重新初始化

## useEffect
- 不传递依赖变量时，会在每一次组件刷新(state\props变化)时总是执行`useEffect(()=>{...})`
- 依赖参数是空数组[]时，useEffect只在组件挂载后执行一次`useEffect(()=>{...}, [])`
- 如果指定了依赖项，Effect 在 初始渲染后以及依赖项变更的重新渲染后 运行
`useEffect(()=>{...}, [a, b])`

## useContext
上下文，用来向组件树深层传递数据

- 父级使用`createContext`创建somecontext
- 将`<somecontext.Provider>`置于子组件之上
- 子组件使用`useContext(somecontext)`返回context的value，无论层数有多深

## useReducer
类似于redux的功能的api
```js
const [state, dispatch] = useReducer(reducer, initialArg, init?)
```

## useMemo
useMemo在每次重新渲染的时候能够缓存计算的结果，作用：

- 跳过代价昂贵的重新计算

  一般来说，除非要创建或循环遍历数千个对象，否则开销可能并不大

- 优化子组件的重新渲染
  
  默认情况下，当一个组件重新渲染时，React会递归地重新渲染它的所有子组件。我们可以把子组件包裹在**React.memo**中，再将高耗时计算通过useMemo返回然后传递给子组件，这样当子组件的props跟上次一样就会跳过渲染。
  
  如果没有useMemo，每次渲染都会创建新的变量，那么memo将不起作用。

## useCallback
与useMemo很类似，useCallback可以在多次渲染中缓存函数，不同的是
- useMemo返回的是一个**计算的结果**
- useCallback返回的是一个**函数**

使用 useCallback 缓存函数仅在少数情况下有意义：

  - 将其作为 props 传递给包装在 [memo] 中的组件。如果 props 未更改，则希望跳过重新渲染。缓存允许组件仅在依赖项更改时重新渲染。
  - 传递的函数可能作为某些 Hook 的依赖。比如，另一个包裹在 useCallback 中的函数依赖于它，或者依赖于 useEffect 中的函数。

其他情况，一般都是没有什么意义的，还会降低代码可读性，以及依赖列表带来的问题

## useRef
useRef可以让你引用一个不需要渲染的值

- 引用一个值
  
  useRef返回一个具有单个current属性的ref对象，并初始化。后续渲染中，可通过ref.current访问或改变储存的值

  这看起来和state类似，但是一个很大的不同是，改变**ref不会触发重新渲染**

- 引用DOM元素

  React内置了这种支持，可以在DOM节点渲染后，把节点赋值给ref的current
  
## useImperativeHandle
- 向父组件暴露自定义的ref句柄

  需要子组件配合使用 React.forwardRef 包裹子组件，然后用useImperativeHandle 暴露ref或者方法，父组件就可以通过ref访问子组件的ref或方法了（https://react.docschina.org/reference/react/useImperativeHandle#usage）

- 暴露自己的命令式方法

## useLayoutEffect
是useEffect的一个版本，在浏览器重绘屏幕之前触发，例子见[https://react.docschina.org/reference/react/useLayoutEffect#usage]

1. 渲染初始的内容
2. 在浏览器重新绘制屏幕之前 测量布局
3. 使用所读取的布局信息渲染最终内容

# React和Vue的区别
## 共同点
- 数据驱动视图
- 组件化
- 都是用 **Virtual DOM**

## 不同点
1. 核心思想
   - Vue是渐进式框架，进行数据拦截/代理，它对侦测数据变化更敏感、更精确
   - React推崇函数式编程，数据不可变以及单向数据流
2. 组件写法差异
   - React推荐的做法是 `JSX + inline style` , 也就是把HTML和CSS都写进js中, 即 `all in js`
   - Vue推荐的做法是 `template` 的单文件组件格式, 即html, css, JS 写在同一个文件
3. diff算法不同
4. 响应式原理不同 
   - Vue依赖收集, 自动优化, 数据可变, 当数据改变, 自动找到引用的组件重新渲染
   - React基于状态机, 手动优化, 数据不可变, 需要setState驱动新的state替换老的state. 当数据改变时, 以组件为根目录, 默认全部重新渲染 