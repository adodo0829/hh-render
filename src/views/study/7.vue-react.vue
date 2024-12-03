<template>
  <div>
    <section>
      <h4>Virtual DOM</h4>
      <pre>
Virtual DOM 的概念有很多解释，分别是：一个对象，两个前提，三个步骤
一个对象 指的是 Virtual DOM 是一个基本的 JavaScript 对象，也是整个 Virtual DOM 树的基本
两个前提 分别是:
直接操作 DOM 的低效和 JavaScript 的高效相对比，为 Virtual DOM 的产生提供了大前提
三个步骤 指的是 Virtual DOM 的三个重要步骤
- 生成 Virtual DOM 树
- 对比两棵树的差异
- 更新视图。

# 虚拟 DOM 更新 + diff 算法
1.生成 Virtual DOM 树
抽象出一个 DOM 节点却只需要三部分：节点类型，节点属性、子节点; 给节点实现渲染方法，就可以实现虚拟节点到真实 DOM 的转化。

2.对比两棵树的差异（diff）
只比较同级的节点
新旧两棵树进行一次深度优先的遍历，每个节点都会有一个唯一的标记；
每遍历到一个节点就把该节点和新的树的同一个位置的节点进行对比，如果有差异的话就记录到一个对象里面
常见的差异包括四种，分别是：
- 替换节点
- 增加/删除子节点
- 修改节点属性
- 改变文本内容

      </pre>
    </section>
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
