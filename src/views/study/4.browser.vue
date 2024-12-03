<template>
  <section>
    <div>
      <h4>浏览器事件循环</h4>
      <pre>
## 进程
- CPU正在进行的一个任务的运行过程的调度单位
- 浏览器是一个多进程的应用程序
- 进程是计算机调度的基本单位
- 进程包含线程，线程在进程中运行
    - **没有进程就没有线程**
    - **为什么分进程：进程之间耦合低，chrome一个tab就是一个单独进程，单个tab卡死不会影响其他tab页面的工作**

- 任务管理器（mac活动监视器）查看chrome的进程情况

- 每一个tab都会开启一个进程
- 浏览器有一个主进程（用户界面：指的是整个浏览器的界面，地址栏、标签栏、页面内容...）
- 每一个 tab 各自有独立的：
    - 渲染进程（浏览器内核Renderer，渲染引擎）
    - 网络进程（网络请求）
    - GPU进程（动画与3D绘制 e.g. css3动画开启GPU加速就用的这个进程）
    - 插件进程（vue devtool 等 chrome 插件）
- 每个进程里包含多个线程运行

### 比如渲染进程
- 包含
    1. GPU 渲染线程（负责渲染页面）
      - 解析 HTML，CSS
      - 构建 DOM、CSSOM / Render 树
      - 初始布局与绘制
      - 回流与重绘    
    2. JS 引擎线程
      - 一个主线程与多个辅助线程
      - 一个浏览器只有一个 JS 引擎（浏览器只有**一个JS主线程**，也就是所谓的JS是单线程的）
      - 解析JS脚本
      - 运行JS代码
- 运行互斥
    - GPU渲染与JS引擎线程，**运行互斥** why? 因为不能一边渲染内容，一边JS在修改DOM
    - JS执行的时候，渲染线程挂起
    - JS引擎任务空闲，GPU渲染更新

### 事件触发线程：事件循环（Event Loop）线程（事件环是个单独线程管理的）
- 事件线程：用户交互事件、setTimeout、Ajax
#### 宏任务、微任务
- 宏任务
    - 宿主提供的异步方法和任务
        - script 的执行（JS整体代码，比如 `<script>...</script>` 这段脚本整体，也是个宏任务）
        - setTimeout、setImmediate、setInterval
        - UI渲染、UI交互（Ajax、mouseover, click 各种事件回调）、I/O
- 微任务
    - 语言标准（ECMA262）提供的API
        - Promise、process.nextTick（NodeJS）、MutationObserver

循环逻辑：
1. 先在JS引擎线程执行栈中**执行同步代码**（遇到宏任务，会执行它们，并把宏任务们的回调放进宏任务队列）
2. 然后**清空所有微任务**
3. **执行GUI渲染逻辑**
4. 取一个**宏任务回调**出来执行（先进先出）【其实处理的都是宏任务的回调函数 e.g. ajax回调，setTimeout回调，例如代码执行时，遇到 setTimeout ，其实是**立马执行**了 setTimeout，但把**回调放进了宏任务队列**】
5. 再执行同步代码
6. 清空微任务
7. ... 循环

事件监听
- 如果 JS 主动触发 click 回调，则相当于把回调同步的依次执行； btn.ckick()
- 如果用户点击按钮触发 click 回调，则先把所有回调依次放进宏任务队列，再每次取出一个cb出来执行

任务优先级
1. Promise（微任务）
2. MutationObserver（微任务）
3. setImmediate（宏任务）
4. setTimeout（宏任务）

## requestAnimationFrame、setInterval
- requestAnimationFrame 请求动画帧
    - 告诉浏览器，在**下次重绘之前调用**回调函数更新动画
        - 第一次主动触发，回调函数中还得递归调用
    - 回调函数接受到一个参数 timestamp 时间戳
- setInterval 间隔 xx ms 执行回调

## MutationObserver、nextTick
- MutationObserver
    - **监听DOM改变，然后执行回调（回调是个微任务）**
        - **Vue.$nextTick 就是利用这一点，在页面更新后，执行一些事情**
    - mutation：变化 的意思
    - `const observer = new MutationObserver(回调)`
    - `observer.observe()`
    - 回调中可以拿到两个参数：
        - mutationList	变化列表
            - mutation.target 被改变的目标节点
            - mutation.addedNodes 目标节点下新增的节点
        - observer	观察者实例对象
- process.nextTick
    - 作为微任务，是优先于 promise.then 执行的

## 为何说 JS 是单线程的？
JavaScript的单线程，与它的用途有关。作为浏览器脚本语言，JavaScript 的主要用途是与用户互动，以及操作DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。
比如，假定 JavaScript 同时有两个线程，一个线程在某个 DOM 节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？所以，为了避免复杂性，从一诞生，JavaScript 就是单线程，这已经成这门语言的核心特征，将来也不会改变。
注意：所谓单线程，是指在**JS引擎中负责解释和执行JavaScript代码**的线程只有一个。

### **简单性**
- 单线程模型使得JavaScript的编写和调试变得相对简单。开发者不需要处理多线程编程中的复杂问题，如竞争条件、死锁和线程同步等。
### 与DOM的交互
JavaScript在浏览器中的主要任务之一是与DOM进行交互。如果允许多个线程同时操作DOM，可能会导致不可预测的行为和数据不一致的问题。单线程保证了DOM操作的原子性和一致性。
### 单线程的实现机制
虽然JavaScript是单线程的，但通过异步编程模型和事件循环机制，它能够处理并发任务。这种机制包括以下部分：

1. **调用栈（Call Stack）**：
    - 调用栈是一个数据结构，用于追踪当前执行的代码位置。当一个函数被调用时，它会被压入栈顶，当函数执行完毕时，它会从栈顶弹出。
2. **消息队列（Message Queue）**：
    - 消息队列是一个任务队列，存储着待处理的异步任务和回调函数。当调用栈为空时，事件循环会从消息队列中取出第一个任务并执行。
3. **事件循环（Event Loop）**：
    - 事件循环是一个无限循环，它不断地检查调用栈是否为空。如果为空，它会从消息队列中取出一个任务并将其压入调用栈执行。这个过程持续进行，从而实现异步任务的处理。
4. **总结**
    - **单线程：指JavaScript在任何时刻只有一个主线程在执行代码。**
    - **事件循环**：通过事件循环机制，JavaScript能够处理异步任务，实现非阻塞的并发执行。
    - **简单性和安全性**：单线程模型简化了开发，并避免了多线程编程中的复杂问题，特别是在DOM操作方面。
      </pre>
    </div>

    <div>
      <h4>浏览器渲染进程</h4>
      <pre>
- GPU 渲染线程（渲染页面）
    - 解析 HTML、CSS 构建 DOM、CSSOM（渲染树）
    - 初始布局与绘制
    - 回流与重绘
- JS 引擎线程
    - 一个主线程与多个辅助线程（Web Workers、Service Workers）
    - 一个浏览器只有一个JS引擎（浏览器只有一个JS主线程，也就是所谓的JS是单线程的）
    - 解析JS脚本，运行JS代码
      </pre>
    </div>
  </section>
</template>

<script>
export default {
  name: "xxx",
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
