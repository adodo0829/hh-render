<template>
  <div>
    <h3>typescript</h3>
    <pre>
为什么出现，弥补js的不足，类型声明， 很多错误只有在运行时才会被，提前规避发现
增加了静态类型，可以在开发人员编写脚本时检测错误，使得代码质量更好，更健壮。

1.静态类型检查让 TS 成为强类型语言
2.TS 在支持与 JS 几乎相同的原始类型之外，还额外提供了枚举（Enum）和元组（Tuple）的支持

## 修饰符和静态关键字
1. 访问修饰符：public private protected
2. 静态关键字：static 定义全局唯一的静态变量和静态函数。
3. 抽象关键字：abstract
4. 只读关键字：readonly

## 接口
接口（interface）用于一系列成员的声明，但不包含实现，接口支持合并（重复声明），也可以继承于另一接口

## 联合类型
使用联合类型（Union Types）允许你在声明变量或接收参数时兼容多种类型

## 泛型
使用泛型可以让一个类/函数支持多种类型的数据，使用时可以传入需要的类型。

## 命名空间
命名空间（namespace）用来定义标识符的可用范围，主要用于解决重名的问题，对于项目模块化有很大的帮助。Cocos Creator 中的 cc 就是一个内置的命名空间。
    </pre>

    <h3>question</h3>
    <pre>
# type 和 interface 的区别？
- 声明：interface 可以重复声明，type 不行
- 继承：方式不一样，type 使用交叉类型方式，interface 使用 extends 实现。在对象扩展的情况下，使用接口继承要比交叉类型的性能更好。
- 建议：使用 interface 来描述对象对外暴露的接口 ，使用 type 将一组类型重命名（或对类型进行复杂编程
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
