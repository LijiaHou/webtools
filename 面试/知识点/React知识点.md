# setState的过程、原理
setState 是异步的，但是在 setTimeout/setInterval 等定时器中变成同步？

实现机制类似于浏览器的事件循环，多个 setState 会被加入到任务队列，待时机成熟，依次遍历执行得到最新 state，也就是批量更新。React 18 使用了 createRoot ，所有的 setState 都是异步批量执行的了
### 过程
`React` 将 `state` 存储在组件之外，当使用 `useState` 时， `React` 会为每次的渲染提供**该次**的一张 `state` 快照。过去创建的事件处理函数拥有的是**创建它们的那次**渲染中的 `state` 值。

- 执行 `setState` ，state 不会立即修改，而是请求一次新的渲染
- `React` 将一个或多个 state 更新加入到队列
- 待 事件函数 执行完全部的代码，再从更新队列取出一个一个最后计算出新的 `state`，也就是 **批处理**
  - 对 `state` 直接替换值，后面的会覆盖前面的
  - 如果想根据队列中**前一个** `state` 计算新的 `state` ，应该使用 **更新函数** setState(x => x)
- 再将新的 `state` 快照传递给函数，执行函数，进行新一次的渲染

# state 和 props
- `state` 和 `props` 都是**只读**的
- 更新 `state` 用 `setState` ； 更新 `props` 也用 `setState` 

# jsx 原理
JSX 是 js 的语法扩展，可以让你在 js 文件中，书写类似 HTML 的标签。JSX 和 React 是独立的。
- 旧版，使用 JSX 需要 import React，转换实际上相当于调用 `React.createElement()`
- 新版 (React 17 以及更新版本的编译器)，则不再通过 React.createElement() 转换，自然也就不需要 import React 了, 而是通过 babel 或者 ts 编译器去编译

# 函数组件(+hooks)和class组件的区别
官方更推荐 函数组件 + hooks 写法，因为相比class组件，hooks 更简洁，代码量更少，用起来更轻

### class 组件的缺点
- 大型组件比较难拆分和重构
- 业务逻辑分散在 class 的各个方法中，导致逻辑重复
- 引入了复杂的编程模式，比如 render props 和 高阶组件
- class 需要理解  this

### 主要区别
- 设计思想不同
  - 类组件是 OOP 面向对象，有继承、属性、内部状态管理
  - 函数组件是 **函数式编程** 思想
- 类组件使用需要实例化，函数组件直接执行返回结果，而且没有**this的困扰**
- 函数组件代码会更**简洁**一些
  - 不需要类声明，避免如 extends、constructor 等语法
  - 不需要绑定 this
- 类组件的一些业务会用到生命周期函数，这些逻辑是没办法被抽取的；而函数式的 hooks 模拟周期，更灵活，更利于**组件的拆分**

# Redux 原理
### 定义
Redux 是 Javascript 状态容器，提供可预测的状态管理。

### 三大原则
- **单一数据源**：应用中所有的 `state` 都以一个对象的形式储存在唯一一个 `store`
  - 目的是让同构应用更容易，来自服务端的 state 可以很容易的被序列化并注入到客户端
  - 同时 redux 的数据流也是单向的
- **State 是只读的**：唯一改变方法是 action
  - 确保所有的修改都集中化处理，严格按照一个一个的顺序执行，不必担心 race condition 的出现
- 为了描述 `action` 是如何改变 `state` 树的，需要**编写 `reducers`**
  - ruducers 是纯函数，接收 state 和 action ，返回 state

### 基础概念

#### Action
action 实质上就是一个对象，约定内部需要使用 type 字段来代表要执行的动作。

实际应用中我们可以使用 action 创建函数来生成 action，因为需要 dispatch ，可以创建一个创建函数来绑定 action 并自动 dispatch


```js
// 拉取弹幕
const GET_BARRAGE_LIST = createActionTypes('GET_BARRAGE_LIST')
const getBarrageList = params => (dispatch, getState) => {
  const {deviceinfo} = getState()
  return dispatch({
    api: {
      root: ROOT,
      path: '/misc/get_college_barrage_list',
      data: {...deviceinfo, ...params},
      sign: true,
    },
    types: GET_BARRAGE_LIST,
  })
}
```

#### Reducer
根据逻辑拆分 reducers , 然后使用 combineReducers({...}) 来合并多个 reducer，每个 reducer 的 state 都不同，每个 reducer 负责全局 state 中的一部分，通过 combine 时传入的 key 来区分
#### Store
创建 store 使用 createStore(reducers, initState) ，注意 createStore 的第二个参数是传入一个初始 state，这个对开发同构应用（服务端渲染）非常有用
  
```js
let store = createStore(todoApp, window.STATE_FROM_SERVER)
```

store 的主要职责
- 维护全局 state
- 提供 store.dispatch(action) 方法来更新 state
- 提供 store.subscribe(listener) 注册监听器
- 提供 store.subscribe(listener) 返回值是注销监听器

### store.subscribe() 原理

### react-redux connect 原理


# 常用的 hooks
## useState
用来储存与UI相关的数据，在重新渲染时，useState可以**保持数据**，让函数组件也有了“状态”，而函数组件中其他的普通变量会被重新初始化

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
useMemo在每次重新渲染的时候能够缓存计算的结果，第二个参数传入一个数组，当数组中的每一项值或者引用发生改变，才会重新计算

作用：

1. 跳过代价昂贵的重新计算
  
    一般来说，除非要创建或循环遍历数千个对象，否则开销可能并不大

2. 优化子组件的重新渲染
     
    默认情况下，当一个组件重新渲染时，React会递归地重新渲染它的所有子组件。我们可以把子组件包裹在 `React.memo` 中，再将高耗时计算通过useMemo返回然后传递给子组件，这样当子组件的props跟上次一样就会跳过渲染。（ 如果没有 React.useMemo，每次渲染都会创建新的变量，那么memo将不起作用）

3. 记忆另一个 Hook 的依赖
4. 记忆一个函数
   - 当然函数更推荐 useCallback， useCallback 的唯一好处是它可以让你避免在内部编写额外的嵌套函数 

## useCallback
与useMemo很类似，useCallback 可以在多次渲染中缓存函数，也有两个参数，不同的是 useCallback 可以**避免**在内部编写额外的**嵌套**函数（也可以理解为 useMemo 会执行第一个参数，useCallback 则直接缓存第一个参数，不执行）

使用 useCallback 缓存函数仅在少数情况下有意义：

1. 缓存 props 中的函数，希望跳过重新渲染。
2. 防止频繁触发 Effect 。
   - 因为假如在 Effect 中执行一些函数，那么这些函数也要作为 Effect 的依赖，如果不希望 Effect 多次触发，那么需要使用 useCallback ，当然最好的办法是 把函数写在 Effect 里面
3. 编写自定义 Hook 时，应使用 useCallback 包裹所有返回的函数，以便使用者方便优化自己的代码

其他情况，一般都是没有什么意义的，还会降低代码可读性，以及依赖列表带来的问题

## useRef
useRef可以引用一个不需要渲染的值，并且在重新渲染期间保持状态，使用 `ref.current` 访问\赋值

- 引用一个值
  
  和state类似，但是一个很大的不同是，改变**ref不会触发重新渲染**

- 引用DOM元素

  React内置了这种支持，可以在DOM节点渲染后，把节点赋值给ref的current
  
## useImperativeHandle
- 向父组件暴露自定义的ref句柄

  需要子组件配合使用 React.forwardRef 包裹子组件，然后用useImperativeHandle 暴露ref或者方法，父组件就可以通过ref访问子组件的ref或方法了（https://react.docschina.org/reference/react/useImperativeHandle#usage）

- 暴露自己的命令式方法

## useLayoutEffect
是useEffect的一个版本，在 React 更新完DOM之后，浏览器重绘屏幕之前，触发，useLayoutEffect 中的处理会阻塞浏览器重新绘制屏幕，可能会影响性能，所以避免过度使用，尽可能的使用 useEffect。

例子见[https://react.docschina.org/reference/react/useLayoutEffect#usage]

1. 渲染初始的内容
2. 在浏览器重新绘制屏幕之前 测量布局
3. 使用所读取的布局信息渲染最终内容

# React 组件通信方式
1. 父传子： props 即可
2. 子传父：props + 回调 或者 上面的 useImperativeHandle
3. 跨级：
   - props 层层传递
   - context 上下文 provider consumer
4. 非嵌套关系
   - redux 全局状态管理
   - 其他三方通信方式

# React-fiber
传统的 React 渲染过程是同步执行的，更新时会一直持续，这会导致主线程的阻塞，从而造成页面卡顿。
Fiber 引入了一套新的协调算法，将渲染过程分割成多个优先级较低的小任务，通过任务优先级和时间片的概念，使 React 更加灵活的控制任务的调度和执行。提高页面的响应性能，这种可中断的渲染机制体改了用户的体验

# createPortal
Portal 提供一种将子节点渲染到**父组件以外**的DOM节点的方案。应用场景可以是弹窗等

# React提升页面性能
React 采用的是虚拟DOM (即 VDOM ，React中也叫Fiber)。每次state数据发生变化的时候，React 会检测当前最新的节点和上次渲染的Fiber树之前的差异，然后针对差异的地方进行打标，返回最新的Fiber树，最后将所有差异内容渲染到 真实DOM。这就是整个 更新渲染 的大概过程

主要思路就是**减少 diff 过程**（减少非必要的重新渲染），以及**减少前后 VDOM 树的差异性**

### 一、减少 diff 过程

1. 将可变部分与不变部分分离
  
    在 React 中，只要组件的 state 数据有变更，当前组件及其子组件就会重新渲染。而将数据频繁变动的内容部分拆分到一个独立的组件中，就不会影响父节点和其他同级节点了

2. 使用 `React.memo`

    在 React 中，判断 props 是否变更，是通过对比 props 对象引用的变化，而每次父组件重新渲染都会生成一个全新的 props 对象（因为函数是新创建的），也就导致了子组件的非必要重新渲染

    而使用 React.memo 包裹子组件后，判断 props 是否变更，将会改为判断 props 对象内的各个属性值是否变化（如果属性值也是对象，那么可以使用 useMemo、useCallback），这样我们就可以优化这种情况了

### 二、减少前后 VDOM 树的差异性，提高 diff 效率
首先，要了解 React 中 diff算法 的3个基本原理：
- 永远只比较**同层**节点，不会跨级比较。同层节点比较时默认是按排列顺序比较
- 当前后节点**类型不同**的时候（比如更新前是 div，更新后是 p），会将这个节点(包括所有后代节点)整个替换生成新的节点树
- `key` 值可以指定哪些元素节点是相同的

根据这些原理，有以下的方法来优化：

1. **保持 DOM 层级不变**
    ```js
    {
      flag ?
        <div className="component">
          <!--子节点内容-->
        </div>
        :
        <div className="wrapper"> 
          <div className="component">
            <!--子节点内容-->
          </div>
        </div>
    }
    ```
    假设 `flag` 初始值是 `true` ，当变为 `false` `时，component` 外面多包了一层，这时， `component` 和 `wrapper` 变为同一层，这个错位导致 `component` 及其 所有子节点都无法复用，都重新渲染

2. **保持相同内容节点类型不变**
    ```js
    {
      flag ?
        <div className="component">
          <!--子节点内容-->
        </div>
        :
        <p className="component"> 
          <!--子节点内容-->
        </p>
    }
    ```
    当 `flag` 变为 `false` 时，原来的 `div` 变成了 `p` 元素，就算其他内容属性都没有变化，`component` 及其 所有子节点都无法复用，都重新渲染


3. **循环元素要添加 `key` 值**
    ```js
    <ul>
      {
        list.map(item => (
          <li key={item.id}>{item.name}</li>
        ))
      }
    </ul>
    ```
    如上，假如没有为 `li` 添加 `key` 值， `diff` 默认是按照节点的排列顺序比较的，而这时向 `list` 里添加新的元素时，那么在插入的元素以及它的后面 `li` 节点，都不会被复用，都重新渲染。

    而添加 `key` 值后， `diff` 会根据 key 找到之前对应的元素，这样就只渲染这个新增的元素，其他的 `li` 只是变了位置，会被复用
 
4. **避免兄弟节点错位，保持节点结构的稳定**
    ```js
    <div>
      {flag && <div className="loading"></div>}
      <div className="component1">
        <!--1子节点内容-->
      </div>
      <div className="component2">
        <!--2子节点内容-->
      </div>
    </div>
    ```
    在非循环结构中，是无法添加 `key` 值的，而条件渲染可能会导致前后节点错位，由于 `diff` 顺序去对比，这将导致后续无论有多少兄弟节点，都无法复用，非常浪费性能

    解决方法：
    - 通过样式来控制隐藏
    - 隐藏时给一个空节点，不要让后面节点错位
    - 给要隐藏的节点添加一个父节点

### 三、使用 React 组件懒加载
让 webpack 打包时分包，减少加载一个页面所需的代码

### 四、使用 Fragment
使用 Fragment 来避免创建多余的父节点

### 五、通用的优化手段
1. 可见性加载
   - 图片懒加载
     - intersection-observer 可以用来判断元素是否进入可见区域了
   - 组件懒加载
   - 虚拟列表
   - 其他不可见部分懒加载 
2. 交互式导入资源

# 提升首屏加载速度
### 一、网络方面
1. 首屏 http 请求的数量是否过多
   - 看一下 chunk 是否分的太细，导致请求数量过多
   - 页面、路由的懒加载，是否加载了暂时不需要展示的页面
   - 图片懒加载  
   - 使用 CDN 资源托管，加速服务器响应
2. 是否可以升级 http2 ，不受浏览器 6个 TCP 的限制

### 二、文件大小
- 看一下 splitchunk 有没有去除重复依赖
- js、css、html 有没有压缩
- 图片压缩、小图可以内联URI或者使用更小的格式如svg
- 常用不变的资源进行缓存
- 开启 gzip 压缩

### 三、使用 SSR 服务端渲染
### 四、空白展示，提升用户体验
- 骨架屏
- loading 动画

# React和Vue的区别
### 一、共同点
- 数据驱动视图
- 组件化
- 都是用 **Virtual DOM**

### 二、不同点
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


# 路由Hash模式和Browser模式

前端的路由功能无非就是要实现：
  - 跳转（改变）某个地址，js就加载并切换地址对应的页面

拿 `React` 来说， `React-router` 有两种常见的模式
  - createBrowserRouter
  - createHashRouter 

官网有这样一段建议：
  > - 我们建议所有web项目都使用createBrowserRouter。
  > - 在history.pushState标准化之前，使用完整的URL，而不是web程序中常见的HashURL（#this/stuff）。完整的URL更适合**SEO**，更适合**服务器渲染**，并且在其他web平台**兼容性**更好。
  > - 如果你在静态文件服务器上托管你的应用程序，你需要将其配置为将所有请求发送到你的index.html，以避免得到404。
  > - 如果由于某种原因您无法使用完整的URL，那么createHashRouter是下一个最佳选择。
  > - 如果你对数据API不感兴趣，你可以继续使用＜BrowserRouter＞，或者，如果你不能使用完整的URL，可以使用＜HashRouter＞。
  
### 区别对比

hash： `http://frontend.com/#/home`

browser： `http://frontend.com/home`

  - hash相比browser的url，多了个 `#`
  - browser模式下，修改、刷新url浏览器会去服务器请求该页面；hash模式下，修改hash时浏览器不会请求修改后的url
  - 当然，无论修改hash，还是修改url，都会在浏览器浏览历史生成一条记录
  - browser的实现原理：
    - 主要是利用H5新特性 `history.pushState()` 和 `history.replaceState()`，他们对浏览历史记录进行添加、修改。不过，执行添加或修改并不会导致浏览器刷新请求新地址，也不会触发 `popstate` 事件
    - `popstate` 事件会在点击浏览器前进、回退时触发
    - 那么可以利用以上机制来判断切换
  - hash的实现原理：
    - 主要是通过监听 `window` 对象上的 `hashchange` 和 `load` 事件，来判断路由的切换
    - 无论手动修改hash，还是浏览器前进、后退，还是js通过location修改hash，应该都是可以触发`hashchange`
  - 部署时**服务器配置**不同
    - hash模式下，把打包好的目录直接放到静态服务器，并把地址指向 `index.html` 即可。因为hash无论怎么变，浏览器请求时的url实际都是同一个，不会带上hash，当然服务器也不会考虑hash值。
      - 例如 `http://frontend.com/#/` 、 `http://frontend.com/#/home` 、`http://frontend.com/#/home/a/b` 都会请求 `http://frontend.com`
  
    - browser模式下，还需要把所有子路径都指向 `index.html`，因为无论时手动刷新还是直接打开一个例如 `http://frontend.com/home/a/b/c` 这样的路径，浏览器会向服务器请求这个页面，而在什么都不做的情况下，服务器只会响应 `http://frontend.com/` 请求，其他路径没配置自然就会返回 `404`
      - koa中可以使用 `koa2-connect-history-api-fallback` 来匹配其余的请求，响应 `index.html`
      - nginx中，这样配置（未实践过）
        ```nginx
          location / {
            root   html;
            index  index.html;
            # 增加这条，未匹配的url也响应 index.html
            try_files $uri /index.html;
          }
        ```
      - 只有这样，js中的browserRouter，才可以执行定位到相应的页面


# React项目中key的作用
- key 是为了再diff算法执行时，更快的找到对应节点，提高 diff 速度，更高效的更新虚拟 Dom
- 为了在数据变化时强制更新组件，避免重复的key造成 “复用” 的渲染错误

# 服务端渲染

# React 设计模式