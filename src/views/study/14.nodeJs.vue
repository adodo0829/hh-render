<template>
  <div>
    <h3>NodeJS</h3>
    <pre>
Node.js 是一个使用 JavaScript 作为其脚本语言并运行 Chrome 的 V8 JavaScript 引擎的虚拟机。

- Node.js 基于事件驱动的架构，其中 I/O 异步运行，使其轻量且高效。
- 它也被用于开发桌面应用程序以及一个名为 electron 的流行框架，因为它提供了 API 来访问 OS（操作系统） 级别的功能，例如文件系统、网络等。

Node.js 如何克服 I/O 操作阻塞的问题？
由于 node.js 有一个事件循环，可用于以异步方式处理所有 I/O 操作，而不会阻塞 main 函数。
- 如果需要进行一些网络调用，它将被安排在**事件循环**中，而不是主线程（单线程）中。
- 如果有多个这样的 I/O 调用，每个调用都会相应地**排队分别执行**（除了主线程）。
因此，即使我们有单线程 JS，I/O 操作也是以非阻塞方式处理的。

线程池由 libuv 库处理
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

<style lang="scss" scoped></style>
