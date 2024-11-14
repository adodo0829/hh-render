<template>
  <div>
    <a href="https://github.com/Troland/how-javascript-works/tree/master"
      >how-javascript-works</a
    >

    <h3>语法</h3>
    <pre>
1.数据类型
# 基本类型
- `undefined` 、 `null`
- `string` 、 `boolean` 、 `number`
- `symbol` （es6）、`bigint` （es10）
# 复杂类型
- `object`
    - Array，Date，RegExp，Function
    - 基本包装类型 Boolean，Number，String
    - 单体内置对象 Global，Math
- 值类型存储在栈(stack)中，占空间小、大小固定，属于被频繁使用数据，所以放入栈中存储；
- 引用类型存储在堆(heap)中,占据空间大、大小不固定。如果存在栈中，影响程序运行性能；
引用类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。

- 栈(stack)：是栈内存的简称，栈是自动分配相对固定大小的内存空间，并由系统自动释放，栈数据结构先进后出的原则
- 堆(heap)：是堆内存的简称，堆是动态分配内存，内存大小不固定，也不会自动释放，堆数据结构是一种无序的树状结构
# 类型检测
typeof x =》 'undefined'
instanceof 检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上
auto instanceof Car =》 true/false

使用 if(xx == null) 来判断变量 xx 是否为 undefined 和 null，更加简洁。
（在目前最新的语法中 ?? 就是只针对 undefined 和 null 做判断处理，如 let a = xx ?? 123）

# 进制装换
十进制 → n进制
function decimalToBaseN(decimalNumber, base) {
    if (base 《= 2 || base > 36) {
        throw new Error("Base must be between 2 and 36");
    }
    return Number(decimalNumber).toString(base);
}
N进制 → 10进制
function baseNToDecimal(baseNNumber, base) {
    if (base 《 2 || base > 36) {
        throw new Error("Base must be between 2 and 36");
    }
    return parseInt(baseNNumber, base);
}
# 隐式转换
[] + {};
([]).toString() + ({}).toString() =》 "" + "[object Object]" =》 "[object Object]"
{} + []; // 0

# 函数
function func(a, b, c) {
  console.log(arguments.length); // 实参有 2 个：1 跟 2
  console.log(func.length); // 形参有3个：a, b, c
}
func(1, 2);

# 上下文
## AO（activation object）活跃对象，函数上下文
var声明：变量提升到全局
## GO（global object）全局上下文
1. 寻找变量
2. 寻找函数声明
3. 执行

if代码块中的 var 变量会提升，但函数声明并不会整体提升，而只会提升函数名到当前作用域的顶端

function test() {
	return a;
  a = 1;
  function a() {}
  var a = 2;
}
console.log(test());
// 答案: function a() {}

# 作用域
作用域就是`变量`与`函数`的可访问范围，由当前环境与上层环境的一系列变量对象组成
1. 全局作用域：代码在程序的任何地方都能被访问，window 对象的内置属性都拥有全局作用域。
2. 函数作用域：在固定的代码片段才能被访问
3. 块级作用域：使用 `{}` 包裹的代码块，如 `if` 、 `for` 、 `while` 、 `try/catch`
作用域最大的用处就是隔离变量，不同作用域下同名变量不会有冲突
作用域链
访问一个变量，先在函数作用域内部取值，如果没有查到，就向上级作用域中查找，直到查到全局作用域为止，
这样一个查找过程形成的链条叫做作用域链

[[scope]]：
- **函数创建时**，生成的一个 JS 内部的隐式属性
- 函数存储【作用域链】的容器
    - 作用域链：
        - **AO - 函数的执行期上下文**
        - **GO - 全局的执行期上下文**
- 函数执行完成以后，AO 会被销毁，再执行会重新创建一个新的 AO
- 全局执行的前一刻 GO -》 函数声明已经定义

## **总结**
1. 只要函数被定义，就生成作用域（scope）和相应的作用域链（scope chain），并把 GO 放进去
2. 只要函数被执行的那一刻（准确的说应该是执行前的预编译阶段），就生成AO，然后把自身的AO放进作用域链，并自身排首位，把之前的作用域们（其他AO和GO）依次往下挪
3. **函数执行完毕，销毁自身AO；此时自身作用域回归被定义时的状态**

闭包就是能够读取其他函数内部变量的函数
## **闭包的特性**
- 函数内再**嵌套函数**
- 内部函数可以**访问外层的参数和变量**
- 参数和变量**不会被垃圾回收机制回收**
当内部函数被返回到外部并保存时，一定会产生闭包。闭包会导致原来的作用域链不释放。过度的闭包可能会导致内存泄漏（因为常驻内存），或加载过慢。
function fn1() {
  var arr = new Array(9999999999999)
  function fn2() {
    console.log(arr)
  }
  return fn2
}
var f = fn1()
f() // 没有释放，arr就一直在内存中占着，导致内存泄漏
// 记得释放
f = null

    </pre>
  </div>
</template>

<script>
export default {
  name: "JS",
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
