<template>
  <div class="wrapper">
    <h2>点&向量</h2>

    <img width="400px" src="@/assets/vector1.png" alt="" />

    <h3>点</h3>

    点是最基础的几何形状了吧。点是三维空间中的一个位置 vec3 a= vec3(0.5,0.5,1);
    // 函数用来表示一个在 z 轴上面的点

    <h3>向量</h3>
<pre>
物理层面：大小，方向的箭头，起点 》终点
计算机层面：坐标系中的点坐标 x，y

二维空间中， 原点 -> 终点
[1
2]

三维空间
[1
2
3]

### 向量加法

各坐标轴的分量相加，平移
数乘，缩放

## 2.向量坐标

坐标轴看着标量

基向量：坐标系中单位长度为 1
a = bW + vV
二维向量 a 都可以看做基向量 v，w 的线性组合
v 和 w 全部的向量组合为 张成的空间
</pre>

<h3>向量desc</h3>
    

    <pre>

向量又称为矢量，具体定义我们不再过多介绍。但向量可以在 CG 中可以用数字数组表示。这个数字数组可以假定任何所需的长度，有时也称为数学中的元组

元组是数学中的一个概念，它指的是有序数对或者有序 n 元组。元组的形式可以表示为 (a1, a2, ..., an)，其中每个元素 ai 可以是任意数值类型，也可以是其他数据类型。在数学中，元组通常用于描述多个变量之间的关系或者属性。例如，一个二维平面上的点可以表示为一个含有两个元素的元组 (x, y)

在计算机图形学中，向量可以表示空间中的位置或方向。CG 中提供了很多方法来操控这些向量，变换这些向量的方法我们称为线性变换: 线性变换是指一种将一个向量空间中的向量映射到另一个向量空间中的操作。线性变换在向量空间中有着广泛的应用，包括矩阵乘法、旋转、缩放、投影等等

### 行向量与列向量

行向量: directX 就是行向量
行向量是一个 1 × n 的矩阵，其中 n 是元素的数量。例如：
A=[a₁,a₂,...,aₙ]

列向量: opengl 就是列向量
列向量是一个 n × 1 的矩阵，其中 n 是元素的数量。例如：
b=[
1,
2,
3
]

```js
/**
 * 向量通常指一个有长度有方向的量。向量使所有的移动和空间行为更容易理解和在代码中实现。
 * 向量可以相加，缩放，旋转，指向某物体。
 * 在javascript中，一个方向和长度(即向量)在二维空间中可以用横坐标x和纵坐标y表示。
 */

const EPSILON = 0.00000001;
const areEqual = (one, other, epsilon = EPSILON) => Math.abs(one - other) &lt; epsilon;

// 向量由一系列数值构成，每维数值都是向量的一个分量
// 1.方向
// 2.长度
// const length = Math.sqrt(x * x + y * y);

// ** 角是以弧度( radian )为单位，不是角度( degree ) **
// 1弧度是弧长和半径相等的弧，圆的周长：2*Math.PI*R(R为半径)，圆的弧度：2*Math.PI
//弧度转角度
const toDegrees = (radians) => (radians * 180) / Math.PI;
//角度转弧度
const toRadians = (degrees) => (degrees * Math.PI) / 180;

// ======= 向量的运算 =======
class Vector {
  constructor(...vectors) {
    this.vectors = vectors; // [1, 2]
  }

  // 向量加：返回一个新向量
  // 1.向量相加
  // 将向量看成一个运动，从原点出发，向v方向移动长度∣v∣后，再向w方向移动长度∣w∣后，就等于直接向 v+w方向移动长度∣v+w∣
  add({ vectors }) {
    return new Vector(...vectors.map((v, index) => this.vectors[index] + v));
  }
  // 向量减：返回一个新向量
  subtract({ vectors }) {
    return new Vector(...vectors.map((v, index) => this.vectors[index] - v));
  }
  // 对一个向量进行缩放，缩放比例可为任意数值 α ∈ R。缩放时，对所有向量分量都乘以缩放因子 α。
  // 当 α > 1 时，向量会变得更长；
  // 当 0 ≤ α ≤ 1 时，向量会变得更短。
  // 如果 α 是负数，缩放后的向量将会指向原向量的反方向。
  // 乘法
  scaleBy(number) {
    return new Vector(...this.vectors.map((v) => v * number));
  }
  // 向量长度可由勾股定理导出
  length() {
    return Math.hypot(...this.vectors);
  }
  // 点积
  // 点积可以计算出两个向量的相似程度。点积方法接收两个向量作为输入，并输出一个数值。
  // 两个向量的点积等于它们各自对应分量的乘积之和。
  // a*b = |a|*|b|*con0
  // 计算投影， 分解， 方向
  // https://docs.pingcode.com/ask/38308.html
  dotProduct({ otherVectors }) {
    return otherVectors.reduce(
      (acc, ov, index) => acc + ov * this.vectors[index],
      0
    );
  }
  // 在我们观察几个向量间的方向关系前，需要先实现一种将向量长度归一化为 1 的方法
  // 归一化向量，该方向的单位向量
  normalize() {
    return this.scaleBy(1 / this.length());
  }
  // 如果两个归一化后的向量的点积结果等于 1，则意味着这两个向量的方向相同。
  haveSameDirectionWith(other) {
    const dotProduct = this.normalize().dotProduct(other.normalize());
    return areEqual(dotProduct, 1);
  }
  // = -1， 反向
  haveOppositeDirectionTo(other) {
    const dotProduct = this.normalize().dotProduct(other.normalize());
    return areEqual(dotProduct, -1);
  }
  // = 0， 垂直
  isPerpendicularTo(other) {
    const dotProduct = this.normalize().dotProduct(other.normalize());
    return areEqual(dotProduct, 0);
  }
  // 叉积
  // 叉积仅对三维向量适用，它会产生垂直于两个输入向量的向量
  // 只适用于 3 维向量， 计算法向量， 计算三维坐标系
  // |a*b| = |a||b|sin0
  // 用来判断方向，两个向量的左右关系， 是否在三角形内外
  crossProduct({ others }) {
    return new Vector(
      this.vectors[1] * others[2] - this.vectors[2] * others[1],
      this.vectors[2] * others[0] - this.vectors[0] * others[2],
      this.vectors[0] * others[1] - this.vectors[1] * others[0]
    );
  }

  // 计算夹角
  angleBetween(other) {
    return toDegrees(
      Math.acos(this.dotProduct(other) / (this.length() * other.length()))
    );
  }

  // 当需要将一个向量的方向指向反向时，我们可以对这个向量进行 -1 缩放
  negate() {
    return this.scaleBy(-1);
  }

  // 投影
  // 在向量other上的投影
  projectOn(other) {
    // other的单位向量
    const otherStandardVect = other.normalize();
    // other的单位向量和one的点乘值
    const sv = this.dotProduct(otherStandardVect);
    return otherStandardVect.scaleBy(sv);
  }

  // 为了判断两个向量是否相等，可以对它们对应的分量使用 areEqual 函数
  equalTo({ components }) {
    return components.every((component, index) =>
      areEqual(component, this.vectors[index])
    );
  }

  // 单位向量与基底
}
```

## 法线

法线（Normal）是指垂直于曲面或多边形表面的向量。法线通常被用来计算光照和阴影，以及决定物体表面如何反射光线

## 向量的基

对于任何二维的向量点 C
[1,
2]

C = Ai + Bj, i 和 j 为基向量
基可以变化

## 线性相关

## 向量张成的空间

由基向量组合的所有向量形成的空间

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

<style lang="scss" scoped>
.wrapper {
  padding-left: 12px;
}
</style>
