# HTML5
### 语义化标签
header、nav、main、article、section、aside、footer

### 语义化优点
- 代码结构清晰，更易读
- 没有 CSS 的情况下，页面也有一定的结构
- 利于 SEO （搜索引擎优化）

# CSS 选择器
- id选择器
- 类选择器
- 属性选择器
- 伪类标签
  - ：hover
  - ：nth-child
    - nth-child(2n)：选择第偶数个
    - nth-child(2n + 1)：选择第奇数个
    - nth-child(3n)：选择第3、6、9...
    - nth-child(3n + 1)：选择第1、4、7...
    - nth-child(3n + 2)：选择第2、5、8...
  - ：nth-last-child
  - ：nth-of-type
- 标签选择器
- 兄弟选择器
- 子选择器
- 后代选择器
- 通配符 *


# 盒模型
盒模型由4部分组成：**margin**、**border**、**padding**、**content**

- margin: 外边距
- border：边框
- padding：内边距
  - 取值不能为负数
  - padding百分比值只取值于width
  - 会把background的样式透过来
- content：内容部分，显示图像和文本

**content-box**盒模型总宽度： width + padding + border + margin

**border-box**盒模型总宽度：width + margin

# display属性有哪些值
1. none
2. inline
3. block
4. inline-block
5. flex
6. grid
7. table
8. list-item

# position属性有哪些值

position规定元素的定位类型

1. static 默认值
2. absolute
3. relative
4. fixed
5. sticky (Css3新增粘性定位)
6. inherit (继承)

# flex相关的属性

1. flex-direction
     - row\column\row-reverse\column-reverse 
2. flex-wrap
     - wrap\nowrap\wrap-reverse 
3. flex-flow
     - flex-direction和flex-wrap组合写法
4. justify-content
     - 决定主轴的对齐方式
     - flex-start\flex-end\center\space-between\space-around 
5. align-items
     - 决定交叉轴的对齐方式
     - stretch\flex-start\flex-end\center
6. align-content
7. order
8. flex-grow
9. flex-shrink
10. flex-basis
11. flex
12. align-self

# CSS长度单位

1. 相对长度
   - em：相对于自身font-size的值
   - rem：相对于根元素<html>的font-size的大小
   - vw：相对于浏览器窗口的宽度，1vw = 1% x 窗口宽度
   - vh：相对于浏览器窗口的高度
   - % ：相对于父元素宽度
2. 绝对长度
   - px：像素
   - in：英寸
   - cm：厘米 

# 水平垂直居中

### 行内元素
  - 水平居中：`text-align: center`
  - 垂直居中：`line-height: 父级元素高度`
### 块级元素
  - 宽高**确定**
    - 水平方向
       1. `margin: 0 auto`
       2. absolute(left: 50%) + `margin -（自身的一半）`
       3. `margin-left: calc(50% - 自身的一半)`
  
    - 垂直方向
      - 直接计算 margin
     
  - 宽高**未知**
     1. absolute + transform：translate（-50%，-50%）
     2. flex布局
     3. grid布局

# BFC块级格式化上下文
### 概念
块级格式化上下文（Block Formatting Context，BFC）是 Web 页面的可视 CSS 渲染的一部分，是块级盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域

### 开启方法
1. overflow不为visible
2. display值为：inline-block、tablle-cell、...
3. position值为：absolute、fixed
4. float 不为 none

### 应用场景

1. 防止margin重叠(垂直方向上)
   - 同级元素：将重叠的元素，分割到不同的BFC中
   - 父子元素：为父元素开BFC（或者给父元素border、padding等隔开也可以）
2. 高度塌陷
   - 计算BFC的高度时，浮动元素也参与计算
3. 多栏自适应

# z-index 层叠规则

z-index属性只有和position定位 **不为static** 的元素在一起时才起作用（relative 也可以）

# CSS3属性

1. flex布局
2. border-radius圆角、border-image图片边框
3. text-shadow文字阴影
4. box-shadow盒子阴影
5. transform、transition过渡属性动画
6. background渐变、backgrond-origin、background-clip、backgrond-size、background多个背景叠加
7. rgba

# 元素隐藏
- display: none (重排+重绘)
- visibility: hidden（重绘）
- opacity: 0（重绘）

# 回流重绘

- 回流：元素的位置、大小发生变化导致其他节点联动，需要重新计算布局
- 重绘：修改了一些不影响布局的属性，比如颜色

### 一、回流触发时机
- 删除或添加可见的DOM元素
- 元素位置变化
- 元素的尺寸发生变化
- 元素的内容发生变化
- 页面初始渲染
- 浏览器窗口尺寸变化
- 获取一些特定属性的值
  - offsetTop、offsetLeft...
  - scrollTop...
  - clientTop...
  - 这些属性都需要即使计算得到，因此浏览器在获取之前要进行回流 

### 二、重绘触发时机
- 回流一定触发重绘
- 颜色的修改
- 文本方向修改
- 阴影修改 

### 三、减少回流
- 对于那些复杂的动画，对其设置位置 `position：fixed/absolute`，尽可能让其脱离文档流，减少对其他元素位置的影响
- 使用css3硬件加速，可以让transform、opacity、filters这些动画不引起回流重绘
- 在使用js动态插入多个节点时，可以使用 DocumentFragment（ document.createDocumentFragment创建） 创建后一次性插入
- 可以通过设置元素`display:none`，将其从页面去掉，在进行操作，也可以避免回流重绘，这个过程被称作离线操作

# 合成层
只有一些特殊的渲染层才会被提升到合成层：
- transform:3D变换：translate3d、translateZ
- 对opacity、transform、filter应用了过渡和动画
- video、canvas、iframe

合成层可以交给GPU独立渲染，也就是硬件加速，效率更高



# 响应式布局

### 1.媒体查询
CSS3 媒体查询，对不同的屏幕宽度应用不同的CSS样式
```css
// 屏幕尺寸大于 480px 时应用该规则
/* iphone6 7 8 */
body {
    background-color: yellow;
}
/* iphone 5 */
@media screen and (max-width: 320px) {
    body {
      background-color: red;
    }
}
/* iphoneX */
@media screen and (min-width: 375px) and (-webkit-device-pixel-ratio: 3) {
    body {
      background-color: #0FF000;
    }
}
```

### 2.百分比布局
顾名思义，使用 % 作为长度单位，缺点也很明显：
- 计算困难，因为 % 比是相对于父元素的，对照设计稿需要换算一遍
- 相对父元素属性不唯一，width 和 height 是相对于父元素的 width 和 height ，但是 margin 、padding 四个方向都是相对父元素的 width， 与 height 无关

### 3.rem 布局
CSS3 新增单位 rem，rem 是相对根元素 html 的 font-size 的大小的，1 rem = 1 个 font-size，html 的 font-size 相当于一个基准，在页面大小改变时，修改这个基准以达到响应式的目的

缺点：
- 必须通过 js 动态修改 font-size，这样使 Css 和 js 有一定的耦合性
- js 的修改必须要放在，加载 CSS 之前

### 4.视口单位 vw
CSS3 的另一个新增单位 vw/vh，相对视口的宽度和高度，100 vw = 100% 视口宽度

配合 Sass 函数，将设计稿的标明宽度 以及 设计稿的视口宽度，传入即可

```css
@function getVw($px, $v_base: 375) {
    @return ($px / $v_base) * 100vw;
}
```