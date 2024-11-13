<template>
  <div>
    <section>
      <h3>1.引入 CSS 的 4 种方式</h3>
      <div>导入 @import "mystyle.css";</div>
      <div>外链 link rel="stylesheet" type="text/css" href="my.css" ;</div>
      <div>行内式 div style="border:1px red solid;";</div>
      <div>style标签 style type="text/css" div { margin: 0; } style</div>
    </section>

    <section>
      <h3>盒模型</h3>
      <p>
        Dom中对一个元素在占据布局空间的描述，从内到外：content，padding，border，margin
      </p>
      <pre>
box-sizing影响盒模型的计算方式：同样是设置的css宽高像素100px；
标准的 content-box： 内容宽度（100px） 不包括 内边距 + 边框宽度
IE的border-box：  内容宽度 100px（包括了内边距+边框）
</pre
      >
    </section>

    <section>
      <h3>display属性</h3>
      <pre>
    block，inline 和 inline-block：
    - `inline`
    - 不会独占一行；相邻的排同一行；一行排不下会换行
    - 不可设置宽高
    - `padding`、`margin` **水平**方向上设置**有效**，**垂直**方向上**无效**

    - `inline-block`
    - 和其他元素同一行（行内元素特点）
    - 可以设置宽高（块级元素特点）
    - `padding`、`margin` **设置有效**

    - `block`
    - 独占一行
    - 可以设置宽高
    - `padding`、`margin` 设置有效

比较 opacity: 0、visibility: hidden、display: none 的区别
结构：
display:none: 会让元素完全从渲染树中消失，渲染的时候不占据任何空间, 不能点击，
visibility: hidden:不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，不能点击
opacity: 0: 不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，可以点击

继承：
display: none和opacity: 0：是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示。
visibility: hidden：是继承属性，子孙节点消失由于继承了hidden，通过设置visibility: visible;可以让子孙节点显式。

性能：
display：none 修改元素会造成文档回流,读屏器不会读取display: none元素内容，性能消耗较大
visibility:hidden: 修改元素只会造成本元素的重绘,性能消耗较少读屏器读取visibility: hidden元素内容
opacity: 0 ： 修改元素会造成重绘，性能消耗较少
      </pre>
    </section>

    <section>
      <h3>css选择器</h3>
      <a
        href="https://evelance.notion.site/CSS-757cd0fa3932490bb5abd723b7726345"
        target="_blank"
        >css选择器</a
      >
      <p>选择器匹配规则: 从右往左， why？</p>
      <pre>
        **1. 从右向左匹配的步骤**
假设有一个选择器 `div ul > li a.active`：

1. **从最右边的选择器开始**，即 `.active`，查找所有带有 `class="active"` 的 `a` 元素。
2. 然后**往左移动**到 `li a.active`，过滤掉不在 `li` 内部的 `a` 元素。
3. 接着移动到 `ul > li a.active`，进一步过滤掉不在直接子元素 `li` 内部的 `a` 元素。
4. 最后到 `div ul > li a.active`，过滤掉不在 `div` 内部的 `ul` 内部的 `li` 内部的 `a` 元素。

**2. 优化原因**

这种从右向左的匹配方式主要是为了优化选择器的性能：
- **减少不必要的查找**：从右向左匹配能够立即定位具体的元素，从而避免从文档根部开始的全局搜索。
假设选择器是从左到右匹配，会从文档根部开始搜索所有 `div`，然后查找每个 `div` 下的 `ul`，再查找 `ul` 下的 `li`，最后检查 `li` 下是否有符合条件的 `a`。
  这可能导致大量无效的查找。
- **降低复杂度**：CSS 引擎可以快速排除不符合条件的元素。
例如，选择器 `.active` 可以迅速筛选出特定的 `a` 元素，大大减少需要进一步检查的元素数量。
      </pre>
    </section>

    <section>
      <h3>CSS 优先级算法</h3>
      <pre>
    - 优先级：
    - 同权重下: 内联样式表（标签内部）> 嵌入样式表（当前文件中）> 外部样式表（外部文件中）
    - !important > id > class > tag
    - !important 比 内联优先级高

    - **同权重下**：
    - 优先级就近原则，样式定义最近者为准
    - 载入样式以最后载入的定位为准
      </pre>
    </section>

    <section>
      <h3>BFC</h3>
      <pre>
        BFC块级格式化上下文 是 CSS 中页面的一块独立渲染区域，内部元素的渲染遵循特定规则，与区域外部的元素相互隔离。
触发条件:
- `html` 根元素（整个文档的根元素自动成为 BFC）。
- 元素的 `float` 属性值不是 `none`（即设置了浮动 `left` 、 `right`）。
- 元素的 `position` 属性值是 `absolute`（绝对定位）或 `fixed`（固定定位）。
- 元素的 `display` 属性值是 `inline-block`、`table-cell`、`flex`、`table-caption`、`inline-flex` 等。
- 元素的 `overflow` 属性值不是 `visible`（如 `auto`、`hidden`、`scroll`）。
特点：
1. 同一个 BFC 内部的盒子会按照正常文档流一个接一个地放置。
2. BFC 内部的元素垂直方向的距离由`margin`决定，属于同一个 BFC 的两个相邻元素的`margin`会发生重叠。
3. BFC 的区域不会与浮动盒子重叠。
4. BFC 是一个隔离的独立容器，容器里面的子元素不会影响外面的元素，反之亦然。
作用：
清除浮动影响 和 margin重叠
      </pre>
    </section>

    <section>
      <h3>CSS 单位: px, %, em, rem, vw/vh</h3>
      <pre>
- 使用 `px` ，结合 Media Query 进行阶梯式的适配
- 使用 `%` ，按百分比自适应布局
- `em`，相对单位，相对于父元素的字体大小
- `rem`，也是相对单位，相对于根元素 `html`。使用`rem`，结合 `html` 元素的 `font-size` 来根据屏幕宽度适配
- 使用 `vw`、`vh`，直接根据视口宽高适配。
1. 在视觉稿要求固定尺寸的元素上使用 `px`。比如 `1px` 线，`4px` 的圆角边框。
2. 在字号、（大多数）间距上使用 `rem`。
3. 慎用 `em`。
      </pre>
    </section>

    <section>
      <h3>css3新特性</h3>
      <pre>
        transition: CSS属性，花费时间，运动曲线(默认ease)，延迟时间(默认0)
        animation：动画名称，一个周期花费时间，运动曲线（默认ease），动画延迟（默认0），播放次数（默认1），
是否反向播放动画（默认normal），是否暂停动画（默认running）
        transform：
transform: rotate(30deg);
transform: translate(30px, 30px);
transform: scale(.8);
transform: skew(10deg, 10deg);
transform-origin: left top; 左上（默认中心）【改变元素变形的原点】

Flex 布局：
flex 弹性盒布局模型的目的：提供一种更加高效的方式来对容器中的元素进行布局、对齐和分配空间
主轴方向：水平排列（默认） | 水平反向排列 | 垂直排列 | 垂直反向排列
flex-direction: row | row-reverse | column | column-reverse;

换行：不换行（默认） | 换行 | 反向换行(第一行在最后面)
flex-wrap: nowrap | wrap | wrap-reverse;

flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap
flex-flow: flex-direction || flex-wrap;

主轴对齐方式：起点对齐（默认） | 终点对齐 | 居中对齐 | 两端对齐 | 分散对齐
justify-content: flex-start | flex-end | center | space-between | space-around;

交叉轴对齐方式：拉伸对齐（默认） | 起点对齐 | 终点对齐 | 居中对齐 | 第一行文字的基线对齐
align-items: stretch | flex-start | flex-end | center | baseline;

多根轴线对齐方式：拉伸对齐（默认） | 起点对齐 | 终点对齐 | 居中对齐 | 两端对齐 | 分散对齐
align-content: stretch | flex-start | flex-end | center | space-between | space-around;

- `flex` 默认设置是 `flex: 0 1 auto`
- 意思是项目默认有剩余空间也不放大（0），但空间不足会缩小（1）

      </pre>
    </section>

    <section>
      <h3>响应式设计</h3>
      <p>
        一个网站能够兼容多个终端，而不是为每一个终端做一个特定的版本。基本原理是通过媒体查询检测不同的设备屏幕尺寸做处理
      </p>
      <pre>
@media screen and (max-width: 990px) {
    .container {
        background: orange;
    }
}

@media (max-width: 575px) {
   .call-me {
      .call-item:first-child {
         border-right: 0 !important;
         border-bottom: 1px solid #e6e6e6;
      }
   }
}
      </pre>
    </section>
  </div>
</template>

<script>
export default {
  name: "css",
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
