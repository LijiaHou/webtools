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

1. 宽&高固定
   1. absolute + 负margin
   2. absolute + margin auto
   3. absolute + calc
2. 宽&高不固定
   1. absolute + transform：translate（-50%，-50%）
   2. flex布局
   3. grid布局

# BFC块级格式化上下文

开启方法

1. float
2. overflow不为visible
3. display值为：inline-block、tablle、flex...
4. position值为：absolute、fixed

应用场景

1. 防止margin重叠
   - 将同一个BFC的元素，分割到不同的BFC中
2. 高度塌陷
   - 计算BFC的高度时，浮动元素也参与计算
3. 多栏自适应

# z-index 层叠规则

z-index属性只有和position定位不为static的元素在一起时才起作用

# CSS3属性

1. flex布局
2. border-radius圆角、border-image图片边框
3. text-shadow文字阴影
4. box-shadow盒子阴影
5. transform、transition过渡属性动画
6. background渐变、backgrond-origin、background-clip、backgrond-size、background多个背景叠加
7. rgba

# 回流重绘

- 回流：元素的位置、大小发生变化导致其他节点联动，需要重新计算布局
- 重绘：修改了一些不影响布局的属性，比如颜色

## 回流触发时机
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

## 重绘触发时机
- 回流一定触发重绘
- 颜色的修改
- 文本方向修改
- 阴影修改 

## 减少回流
- 对于那些复杂的动画，对其设置位置 `position：fixed/absolute`，尽可能让其脱离文档流，减少对其他元素位置的影响
- 使用css3硬件加速，可以让transform、opacity、filters这些动画不引起回流重绘
- 在使用js动态插入多个节点时，可以使用DocumentFragment创建后一次性插入
- 可以通过设置元素`display:none`，将其从页面去掉，在进行操作，也可以避免回流重绘，这个过程被称作离线操作

# 合成层
只有一些特殊的渲染层才会被提升到合成层：
- transform:3D变换：translate3d、translateZ
- 对opacity、transform、filter应用了过渡和动画
- video、canvas、iframe

合成层可以交给GPU独立渲染，也就是硬件加速，效率更高

# 元素隐藏
## 不可见，不占空间
1. display:none
2. absolute + visibility:hidden
3. absolute + opacity:0
4. relative + left负值

## 不可见，占空间
1. visibility:hidden
2. relative + z-index负值
3. opacity:0