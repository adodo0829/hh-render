<template>
  <div>
    <section>
      <h4>Virtual DOM</h4>
      <img
        src="https://evelance.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fd12335be-14e8-424d-a7a1-a6337bff01bc%2FUntitled.png?table=block&id=1a85d29c-7fa8-4f0c-9e1f-07021f84d9bd&spaceId=c9e7ae34-64f6-4cc4-9c74-4ce3b1d1ee92&width=1420&userId=&cache=v2"
        alt=""
      />
      <pre>
Virtual DOM 的概念有很多解释，分别是：一个对象，两个前提，三个步骤
一个对象 指的是 Virtual DOM 是一个基本的 JavaScript 对象，也是整个 Virtual DOM 树的基本
两个前提 分别是:
直接操作 DOM 的低效和 JavaScript 的高效相对比，为 Virtual DOM 的产生提供了大前提

- **运行效率高**
    - 因为 DOM 操作的执行速度远不如 **Javascript 的运算速度快**。因此，把大量的 DOM 操作放在到 Javascript 中，运用 **patch 算法**来计算出**真正需要更新的节点**，最大限度地**减少 DOM 操作**，从而显著**提高性能**
- **提高渲染的性能**
    - Virtual DOM 的优势在于在**大量、频繁的数据更新**下，能够对视图进行**合理、高效的更新**
- **具备跨平台的优势**
    - 由于 Virtual DOM 是**以 Javascript 对象为基础而不依赖真实平台环境**，所以使它具有了跨平台的能力

# 虚拟 DOM 更新 + diff 算法
1.生成 Virtual DOM 树
抽象出一个 DOM 节点却只需要三部分：节点类型，节点属性、子节点; 给节点实现渲染方法，就可以实现虚拟节点到真实 DOM 的转化。

2.对比两棵树的差异（diff）
为了避免这些不必要的 DOM 操作，就需要将新的虚拟节点与上一次渲染视图所使用的旧的虚拟节点做对比，找出真正需要更新的节点来进行 DOM 操作。最后在更新视图。

首次渲染 和 再次渲染

### diff设计规则
同层比较、不跨级
标签名不同，直接替换，不深度比较
标签名和 key 都相同，当做相同节点，属性改变则更新属性

步骤：
1.新老节点不是同一个节点名称，删除旧的节点，创建插入新的节点
2.只能同级比较，不能跨层比较，如果跨层那么就暴力删除旧的节点，
3.相同节点，又分为很多情况
3.1 新节点有没有 children
  证明新节点是文本，那直接把旧的替换成新的文本
3.2 新节点也有 children 
===========================
3.2.1==新节点的有 children，旧节点的也有 children （diff 算法核心（最复杂的情况））
1. 旧前 vs 新前
2. 旧后 vs 新后
3. 旧前 vs 新后
4. 旧后 vs 新前
5. 以上都不满足，遍历查找
6. 创建 or 删除

3.2.2==新的有 children，旧的没有 children
创建元素并添加

patch， patchVnode， updateChildren方法（4个指针扫描遍历）

      </pre>
    </section>

    <h3>Vue</h3>
    <pre>
# 核心概念
- 组件化
- 数据双向绑定（基于 ES5 中的 defineProperty 实现的）IE9及以上才支持
    - 通过 `defineProperty` 深度遍历并劫持 data 数据
        - 通过 getter 读取属性值
        - 通过 setter 监听属性变化，通知 watcher 更新（update）视图
    - 通过编译模板，寻找类似 input 中 v-model 绑定
        - 给 input 添加事件绑定
        - `value` 变化触发 `@input` 事件，更改数据
        - `v-model` 是 `@input + value` 的语法糖
- MVVM
    - data 变化 --- vm 数据劫持 --》 view 更新
    - data 更新 《-- vm 事件监听 --- view 变化

# 相关使用
## v-model 本质上是语法糖，即利用 v-model 绑定数据，其实就是既绑定了数据，又添加了一个 input 事件监听
input 元素：v-model = @input + :value

父组件 :xxxx.sync="prop"
子组件 this.$emit("update:xxxx", value)

## 指令 directive：v-xxx=""
公共逻辑复用
Vue.directive（'focus', 『
  bind: function (el) { 
    // 每当指令绑定到元素上时，会立即执行这个函数，只执行一次
    // 注意：在每个函数中，第一个参数永远是 el ，表示被绑定了指令的那个元素。
    // 		这个 el 参数，是一个原生的JS对象
    // 在元素刚绑定了指令的时候，还没有插入到DOM中去，这时候，调用 focus 方法没有作用
    //  因为，一个元素，只有插入DOM之后，才能获取焦点
    // el.focus() 无效
  },
  inserted: function (el) {  // 元素插入到DOM中的时候，会执行 inserted 函数【触发1次】
    el.focus()
    // 和JS行为有关的操作，最好在 inserted 中去执行，放置 JS行为不生效
  },
  updated: function (el) {  // 当VNode更新的时候，会执行 updated， 可能会触发多次
  }

# 生命周期
beforeCreate
created：组件实例已经创建完成，data、props 已经初始化
beforeMount
mounted：组件已挂载到真实 DOM
beforeUpdate：data 中的状态值是最新
updated：虚拟 DOM 重新渲染
beforeDestroy：实例仍然完全可用
destroyed：实例销毁后调用（刷新页面并不会触发 beforeDestroy 或 destroyed）
// 页面加载时只执行onload
// 页面关闭时先执行onbeforeunload，最后onunload
// 页面刷新时先执行onbeforeunload，然后onunload，最后onload

# Mixins混入
1. data
    每个mixin都可以拥有自己的data 每个data函数都会被调用 并将返回结果合并 在数据的 property 发生冲突时 会以组件自身的数据为优先。
2. 值为对象的选项
    例如 methods、components 和 directives 将被合并为同一个对象。两个对象键名冲突时 取组件对象的键值对。

# 说说nextTick的用处
**修改数据时不能马上得到最新的DOM信息**，所以需要使用nextTick，在**nectTick回调**中可以获取最新DOM树信息
**nextTick触发的时机：
同一事件循环中的代码执行完毕 → DOM信息更新→ nextTick callback触发**。

实现原理：
vue维护一个数组，每次调用时把回调函数压入这个数组，然后优先选择微任务，在微任务回调中去执行数组中的所有回调，同时维护一个布尔值，确保每一次队列 进行一次执行数组所有回调

## 为什么nextTick优先是微任务？

nextTick 优先级如下：
- Promise.resolve().then：微任务
- MutationObserver：宏任务
- setImmediate：宏任务
- setTimeout：宏任务

优先是Promise.then方法，是个微任务。
微任务一定比宏任务优先执行，如果nextTick是微任务，它会在当前同步任务执行完立即执行所有的微任务，也就是修改DOM的操作也会在当前tick内执行，等本轮tick任务全部执行完成，才是开始执行UI rendering。
如果nextTick是宏任务，它会被推进宏任务队列，并且在本轮tick执行完之后的某一轮执行，注意，它并不一定是下一轮，因为你不确定宏任务队列中它之前还有多少个宏任务在等待着。所以为了能够尽快更新DOM，Vue中优先采用的是微任务，并且在Vue3中，它没有了兼容判断，直接使用的是`promise.then`微任务，不再考虑宏任务了。

    </pre>

    <input type="checkbox" :checked="checked" @change="updateSomething" />
    <!-- 父组件使用 <v-input v-model="checked"></v-input> -->

    <!-- 作用域插槽， 把子组件的数据传到父组件使用  
    作用域插槽（Scoped Slots） 是一种强大的功能，允许父组件访问子组件内部的数据，并在父组件中自定义渲染逻辑。
    作用域插槽的核心思想是：子组件将数据通过插槽传递给父组件，父组件可以决定如何渲染这些数据。 -->
    <!-- 父组件 <template slot-scope="user">
      <div class="tmpl">
        <span v-for="item in user.data">{{ item }}</span>
      </div>
    </template> -->
    <!-- <div class="tmpl" slot="footer"> -->

    <!-- 子组件， 在slot绑定子组件的数据 -->
    <!-- <slot :data="data"></slot> -->
    <!-- <slot name="footer"></slot> -->

    <h3>vue-router</h3>
    <pre>
## hashchange   
锚点值的改变，根据不同的值，渲染指定DOM位置的不同数据
## window.history.pushState ， replaceState
## 实例属性
- route（只读、具备信息的对象）
- router（具备功能函数）

## 导航守卫解析流程
- 全局 beforeEach
- 重用组件调用 beforeRouteUpdate
- 路由独享守卫 beforeEnter
- 组件内 beforeRouteEnter
- 全局 beforeResolve
- 全局 afterEach
- 组件内 beforeRouteLeave

## history 原理
- location.pathname 读取
- history.pushState(state, 'title', 'url'); 写入
- `popstate` 监听浏览器的前进后退
- vue使用history模式，后端得配置
    - 让用户无论访问什么路由，都返回 `index.html` 让vue接管路由

## hash原理
- `location.hash` 读写
- `hashchange` 监听

## 讲一讲完整的路由导航解析流程

1. 导航被触发。
2. 在失活的组件里调用 beforeRouteLeave 守卫。
3. 调用全局的 beforeEach 守卫。
4. 在**重用的**组件里调用 beforeRouteUpdate 守卫 (2.2+)。
5. 在**路由配置**里调用 beforeEnter。
6. 解析异步路由组件。
7. 在被激活的组件里调用 beforeRouteEnter。
8. 调用全局的 beforeResolve 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 afterEach 钩子。
11. 触发 DOM 更新。
12. 调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。

**简化版：**
1. from当前路由 beforeRouteEnter
2. 全局路由 beforeEach

3. to路由钩子 beforeRouteEnter
4. 全局 beforeResolve
5. 全局 afterEach

6. DOM 更新
7. 调用 beforeRouteEnter 中传入的 next 回调函数
  </pre
    >

    <h3>vuex</h3>
    <pre>
why：为了保存组件之间需要共享的数据 
state的数据：不能直接修改。需通过 mutations 来改变

 Vuex 插件初始化时，new Vue 中传入的 store 实例，install 时会被混入到 App.vue 组件上；
 最终所有组件都将混入来自父组件的 store 实例，从而实现 store 容器实例的共享
     </pre
    >

    <h2>原理</h2>
    <pre>
# Vue 如何实现双向数据绑定的？

Observer（观察者）
- 给 data 对象下所有的属性添加上 get 和 set 方法。
- get： 提供属性值的获取。每个属性如果是第一次调用 get 方法，就给当前属性添加上一个**消息订阅器**。
- set：当监听到值有改动时，让消息订阅器通知 watcher 更新页面

Compiler（指令解析器）
- 扫描根节点下的所有元素，找到每个节点上的指令并解析。
- 譬如一个 input 标签有个 v-model ，首先通过 vm 实例把属性名相同的值赋给它，再就是添加事件（input），在事件触发的时候把标签上的值赋值给 data 中相应的属性
- 如果是个 `{{}}` ，就给这个属性添加一个 watcher，在接收到消息订阅器的消息后调用 update 方法更新值

Dep（消息订阅器）
- 负责发布订阅
- 把订阅者放进数组中，每当 notify 被调用后（Observer 的 set 改变时触发），会通知 watcher 订阅者更新视图

Watcher（订阅者）
- 在消息订阅器上订阅每个属性的变化，在属性变化后收到消息执行回调 update 方法，从而更新视图

# defineProperty的问题
1. Object.defineProperty 无法监控到数组下标的变化，导致通过数组下标添加元素，不能实时响应；
2. Object.defineProperty 只能劫持对象的属性，从而需要对每个对象，每个属性进行遍历，如果，属性值是对象，还需要深度遍历。Proxy可以劫持整个对象，并返回一个新的对象。
3. Proxy不仅可以代理对象，还可以代理数组。还可以代理动态增加的属性。

# data 为什么必须得是个函数
如果 data 不是个函数，则有可能出现不同实例、或者组件修改的是同一份 data 引用

# v-if/v-show 实现原理
v-if: 
- true: 显示DOM
- false: 用**注释节点占位**
- **注释节点与DOM之间的切换**
v-show
- true: 不作处理（用户自己设置的 `display`）
- false: 行内样式设置**`display: none`**
- **行内样式：style or style="display: none"**

# computed
- 根据 computed 特性来思考
    - 数据得缓存
        - 得有个地方保存每次计算后的结果
    - get函数中的依赖发生变化后，就得重新计算
        - 所以得把这些依赖收集起来
    - 监听到依赖变化后得更新
        - 还得保存get函数

- computedPool
    - 有一个 pool 存所有 computed
    - pool 中每个 computed 都是个对象，包含
        - value：缓存计算结果
        - get：保存 get 函数
        - dep：收集函数中的依赖

# vue模板编译过程

输入template =》输出 DOM

1. 获取 template
2. template 转 AST 抽象语法树
3. AST 转为 render 函数
4. render 函数 转换 虚拟节点
5. 设置 PATCH打补丁， 生成新真实 DOM（diff算法）

# keep-alive
keep-alive 在内部维护了一个 key数组和一个 缓存对象；
- key数组: 记录目前缓存的组件key值，如果组件没有指定key值，会自动生成一个唯一的key值
- cache对象： 以 key 值为键，vnode 为值，用于**缓存组件**对应的**虚拟DOM**

# mvc 和 mvvm
## mvc
- Model：模型层
    - 定义数据结构
    - 连接、修改数据库
- View：视图层
    - 数据展示、交互
- Controller：控制层
    - 事件绑定
    - 关联视图和数据
    - 需要操作 DOM

## MVVM
- Model：模型层
    - 定义数据结构
    - 连接、修改数据库
- View：视图层、视图模板
    - 数据展示、交互
- ViewModel：**视图驱动**
    - 关联View与Model
    - 渲染视图、绑定事件
    - 让用户关注业务，**减少DOM操作**
    - **数据绑定、事件监听**

    </pre>

    <h3>Vue3</h3>
    <pre>
# Vue2 和 Vue3 区别
## Options API VS Composition API
Options API
- 优点：
    - 低耦合：横向切割清晰，数据全放 data，方法全放 methods
- 缺点：
    - 逻辑不内聚
        - 一旦 methods 中有上十个、上百个方法，要更改 data 下上百个数据，维护起来就很困难了，得上下滚动页面到处找修改的出处

Composition API
- 优点：
    - 高内聚低耦合
    - 基于函数：
        - 为什么要基于函数？
            - 因为函数最好抽离、最好抽象、最好组合、还能利用闭包缓存数据、更改 this 等好处
- 在 setup 中可以提取逻辑

# Vue3.0 新特性

## 重写双向数据绑定
- 可以监听数组变化
- 可以监听动态新增的属性
- 可以监听删除的属性
- 可以监听数组的索引和 length 属性的变化
- 代码更简化
 
## VDOM diff优化
增加 patch flag 补丁标记
在 Vue2 中，每次更新 diff，都是全量对比，Vue3 则只对比带有标记的，这样大大减少了非动态内容的对比消耗

## Fragments
允许我们支持多个根节点， jsx， tsx语法

## Tree-Shaking 的支持
保持代码运行结果不变的前提下，去除无用的代码；
在 Vue2 中，无论我们使用什么功能，它们最终都会出现在生产代码中。
主要原因是 Vue 实例在项目中是单例的，捆绑程序无法检测到该对象的哪些属性在代码中被使用到

- Composition API

    </pre>

    <h3>对比</h3>
    <pre>
## Vue 跟 React 有什么异同
- 相同
    - 都是**单向数据流**
    - 都使用了 **虚拟DOM** 技术
    - 都支持 SSR
    - 都是基于**组件化开发**
- 不同点
- 视图
    - vue: template
    - react: JSX
- 数据改变
    - vue: 响应式
    - react: **手动 setState**
- 事件绑定
    - vue: 双向绑定
    - react: 单向绑定
- 状态管理工具
    - vue: Vuex
    - react: Redux、Mobx

    </pre>
  </div>
</template>

<script>
// 异步组件
// const AsyncComponent = () => import('./组件路径');
// export default {
// 	components: {
//   	AsyncComponent
//   }
// }

// Vue如何实现数据响应式(双向绑定)的
// 1. 通过对 data 对象的**深度数据劫持（Object.defineProperty）**，给每个属性设置上 getter、setter
// 2. **模板编译寻找 vue 各种指令**，**收集各种 data 依赖**
//     1. 如果第一次访问属性 getter ，会给属性添加上**消息订阅器 Dep**
//     2. 例如遇到**插值表达式 `{{xxx}}`** 会给对应属性**添加 watcher** ，并把 watcher 订阅者放进**消息订阅器数组中**
//     3. 遇到 `v-model` 就会给 input **绑定 input 事件**
// 3. 完成上述两个步骤后，
//     1. 当数据发生变化，会触发属性 setter ，然后调用 **`dep.notify`** 在消息订阅器中找寻该属性的订阅者们，遍历它们并执行 **watcher 的 update** 函数，从而更新页面
//     2. 当页面输入框输入内容时，就会触发 input 事件，从而把最新值赋值给 data 属性

export default {
  name: "xxx",
  // 自定义事件名或属性名要在 model 中定义
  model: {
    prop: "checked", // 属性
    event: "change", // 事件
  },
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    // 通过发布自定义事件更新
    updateSomething(e) {
      this.$emit("change", e.target.checked);
    },
  },
};
</script>

<style lang="scss" scoped></style>
