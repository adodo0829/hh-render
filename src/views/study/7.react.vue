<template>
  <div>
    <h3>react</h3>

    <p>react运行过程</p>

    <img
      src="https://github.com/adodo0829/blog/blob/master/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/React%E6%BA%90%E7%A0%81/images/react-core.png?raw=true"
      alt=""
    />

    <a
      href="https://github.com/adodo0829/blog/blob/master/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/React%E6%BA%90%E7%A0%81/reconciler/fiber.md"
    >
      引用 https://github.com/adodo0829/blog/blob/master/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/React%E6%BA%90%E7%A0%81/reconciler/fiber.md
    </a>

    <pre>
React 仅仅负责 View 层渲染, 库级别
1.jsx
2.ReactDOM.render(jsx, rootDom)
3.组件
- 组件一般在内部管理数据集合（state）
- 外部传入配置集合（props）
setState 操作合并的原理 - 浅合并
数据（状态）从父到子，由上而下传递的这种方式叫做单向数据流

Hooks
1. Hook是 React 16.8.0 版本增加的新特性/新语法
2. 可以让你在函数组件中使用 state 以及其他的 React 特性

useEffect Hook 看做如下三个函数的组合
componentDidMount()
componentDidUpdate()
componentWillUnmount()

组件通信方式
- 父子组件：props
- 兄弟组件(非嵌套组件)：消息订阅-发布、集中式管理 redux
- 祖孙组件(跨级组件)：消息订阅-发布、集中式管理、conText(用的少)

对于状态管理的解决思路就是：把组件之间需要共享的状态抽取出来，遵循特定的约定，统一来管理，让状态的变化可以预测
redux 的设计思想就是不产生副作用，数据更改的状态可回溯，所以 redux 中处处都是纯函数

React 的基本思维模式是每次有数据变动就整个重新渲染整个应用
    </pre>
  </div>
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
