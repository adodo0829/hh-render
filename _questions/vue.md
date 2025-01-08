# Vue 题目汇总

### 场景

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/848)
在不使用 vue、react 的前提下写代码解决一下问题
一个 List 页面上，含有 1000 个条目的待办列表，现其中 100 项在同一时间达到了过期时间，需要在对应项的 text-node 里添加“已过期”文字。
需要尽可能减少 dom 重绘次数以提升性能。
尝试使用 vue 或 react 解决上述问题

```js
function renderTodoList() {
  const ul = document.querySelector("ul");
  const frag = document.createDocumentFragment();
  todoList.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.text}${item.done ? "-已过期" : ""}`;
    frag.append(li);
  });
  // 先清空容器
  ul.innerHTML = "";
  ul.append(frag);
}
```

### Redux 和 Vuex 有什么区别，说下一它们的共同思想

https://github.com/lgwebdream/FE-Interview/issues/206

redux 使用的是不可变数据
vuex 的数据是可变的
redux 每次都是用新的 state 替换旧的 state
vuex 是直接修改
redux 在检测数据变化的时候,是通过 diff 的方式比较差异的
vuex 其实和 vue 的原理一样,是通过 getter/setter 来比较的

### 说一下对 React 和 Vue 的理解，它们的异同

https://github.com/lgwebdream/FE-Interview/issues/347

### 对虚拟 DOM 的理解？虚拟 DOM 主要做了什么？虚拟 DOM 本身是什么？

虚拟 DOM(Virtual DOM)是一种编程概念，它用 JavaScript 对象（在 Vue.js 的上下文中，这些对象具体表现为 VNode，即虚拟节点）来表示真实的 DOM 结构。
每个 VNode 对象至少包含标签名（type）、属性（attrs）和子元素对象（children）等属性。这些属性共同描述了 DOM 节点的结构和内容。
这种表示法使得前端开发者能够以一种更加声明式的方式来描述和更新页面。

虚拟 DOM 主要作用有以下几点： 1.性能优化：虚拟 DOM 通过比较新旧两个虚拟 DOM 树，计算出最小的变更集，然后只将这些变更应用到实际的 DOM 上。
这样可以显著减少直接操作真实 DOM 的次数，从而提高性能。因为直操作真实 DOM 是一项昂贵的操作，会导致浏览器执行大量的重排和重绘操作。

2.简化操作：虚拟 DOM 提供了一种更加抽象和简化的方式来操作 DOM。开发者不需要直接操作复杂的 DOM API，而是通过操作虚拟 DOM 来间接的修改页面

3.跨平台渲染：虚拟 DOM 使得前端框架（如 Vue.js）能够更容易地实现跨平台渲染。
因为虚拟 DOM 是对真实 DOM 的一种抽象表示，所以可以被映射到不同的渲染目标上，例如浏览器、服务端渲染、移动应用等。

### 介绍单页应用和多页应用？

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/593)

### 说一下 Vue3 与 Vue2 的对比

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/302)

### vue 对数组的方法做了重写的操作，如何实现对 vue2 中对数组操作的 push()方法

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/307)

### 简述 Vue 的基本原理

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/290)

### 简述 Vue 的生命周期以及每个阶段做的事

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/289)

### 说一下 Vue 组件的通信方式都有哪些？(父子组件，兄弟组件，多级嵌套组件等等)

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/288)

### 说一下 Vuex 的原理以及自己的理解

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/287)

### Vue v-model 是如何实现的，语法糖实际是什么

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/286)

### 说一下 Vue dom diff 算法

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/281)

### 说一下 Vue 的\$nextTick 原理

nextTick 的实现原理主要依赖于 JavaScript 的事件循环机制；  
1.录入任务； nextTick 将传入的回调函数包装成异步任务，并放入一个回调队列中；  
2.选择异步方法包装；优先顺序通常是 Promise.then > MutationObserver > setImmediate > setTimeout(fn, 0)  
3.执行任务队列回调；当事件循环到达微任务阶段时，执行 flushCallbacks 函数，该函数会遍历并执行回调队列中的所有函数

所以 nextTick 确保在 DOM 更新完成后立即执行回调函数，从而可以在回调中获取到最新的 DOM 状态

### 说一下 vue-router 的原理

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/262)

### Vue 是如何收集依赖的

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/259)

### 说一下 Vue 单页与多页的区别

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/412)

### 说一下 Vue 路由实现原理

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/411)

### Vue3.0 为什么要用 proxy？是怎么用 proxy 实现数据监听的?

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/396)

### 说一下对 vue3.0 的了解，vue3.0 为什么要用代理

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/577)

### 子组件可以直接改变父组件的数据么，说明原因

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/576)

### Vue 中一次性 200 条弹幕怎么处理

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/458)

### vue hooks 有哪些

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/705)

### 介绍 Vue template 到 render 的过程

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/704)

### 怎么定义 vue-router 的动态路由？怎么获取传过来的动态参数？

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/690)

### 下面关于 Vue 说法正确的是？(单选题)

```js
A.data 中某一属性的值发生改变后，视图会立即同步进行重新渲染
B.Vue 实例创建后再添加的属性，该属性改动将不会触发视图更新
C.计算属性只有在它的相关依赖发生改变时才会重新求值
D.Vue 组件的 data 选项必须是函数
```

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/684)

### 为什么要用 Vuex 或者 Redux，不要说为了保存状态

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/663)

### 为什么 Vue data 必须是函数

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/662)

### Vue data 中某一个属性的值发生改变后，视图会立即同步执行重新渲染吗？

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/658)

### 简述 mixin、extends 的覆盖逻辑

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/654)

### Vue 子组件和父组件执行顺序

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/653)

### Vuex 和 localStorage 的区别

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/827)

### Vue 双向绑定原理

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/824)

### 说一下路由钩子在 Vue 生命周期的体现？

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/820)

### 计算属性和普通属性的区别

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/819)

### 描述下自定义指令(你是怎么用自定义指令的)

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/818)

### 说一下 Vue 中所有带\$的方法

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/817)

### Vue-router 除了 router-link 怎么实现跳转

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/810)

### 说一下 Vue 的 keep-alive 是如何实现的，具体缓存的是什么？

[答案&解析](https://github.com/lgwebdream/FE-Interview/issues/207)
