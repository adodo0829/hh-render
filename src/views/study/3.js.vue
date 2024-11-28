<template>
  <div>
    <a href="https://github.com/Troland/how-javascript-works/tree/master"
      >how-javascript-works</a
    >
    <h3>=====语法======</h3>
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

## **闭包的用途**
- **保存**（缓存数据，延长作用域链）（onclick = 一个立即执行函数，这个立即执行函数返回一个函数，形成闭包）【形成一个不销毁的栈内存，把一些值保存起来，比如索引（**选项卡**）】
    - 即：闭包中想要提供给外界调用访问的变量，相当于把一些值保存起来了
- **保护**（避免全局污染）：**形成私有作用域**，保护里面私有变量不受外面干扰，不与别人冲突
    - 希望函数内部的值不能被外部直接修改，但是可以通过return出去的方法让外部访问和间接修改
        - **jquery**（利用闭包保护机制，自执行函数私有作用域,里边有个类叫jquery，通过window.$=window.jquery把它暴露给全局)
    - 即：闭包中不希望外界访问的私有变量和参数，相当于保护私有变


# 构造函数
- 每次 new 出来的都是崭新出厂的全新对象，是互不相同的
- new 之后 this 才存在，this 指向实例化的对象；否则指向GO =》window

var obj = new Object()；new 做了什么
- **创建一个新对象**：
    - 创建一个新的空对象，并将其作为函数的上下文（`this`）对象。
- **设置原型链**：
    - 将新对象的原型（`__proto__`）设置为构造函数的 `prototype` 属性。这样，新对象就可以访问构造函数原型上的属性和方法。
- **执行构造函数**：
    - 使用新对象作为 `this` 执行构造函数代码。构造函数中的代码可以对新对象进行初始化操作，例如添加属性和方法。
- **返回新对象**：
    - 如果构造函数显式地返回一个对象，那么 `new` 表达式会返回这个对象。
    - 如果构造函数没有显式地返回对象，则 `new` 表达式会返回步骤 1 中创建的新对象。

function selfNew(Obj, ...args) {
  // 创建一个新对象，使用现有的对象来提供新创建的对象的 __proto__（原型）
  const newobj = Object.create(Obj.prototype)
  // 使用新对象作为 this 执行构造函数
  const result = Obj.apply(newobj, args);
  // 如果构造函数显式返回了一个对象，则返回该对象，否则返回新创建的对象
  return (result && typeof result === 'object') ? result : newobj;
}

## call/apply 更改 this 指向
function test() {
	console.log(1);
}
test(); //  test.call() 调用函数时，系统隐式的加了 .call

原型 prototype
prototype 是函数的属性，其值是个对象
## **prototype 是构造函数中的，构造出的每个实例对象的公共祖先**
## **所有被该构造函数构造出来的对象，都可以继承原型上的属性和方法**
constructor 指向构造函数本身
Handphone.prototype.constructor =》Handphone
constructor 可以被修改； Handphone.prototype.constructor = XXX
__proto__ 属性是实例化以后的结果， handphone1.__proto__  =》 Handphone.prototype

沿着原型__proto__往上不断找属性的这条链条叫做原型链
- 当访问一个对象的某个属性时，会先在这个对象本身属性上查找，如果这个对象本身没有这个属性时，它就会去他的`__proto__隐式原型`上去找（即它的构造函数的 prototype）。
- 如果还找不到，就去原型的原型（`即构造函数的prototype的__proto__`）上去找，....一直找到最顶层（`Object.prototype`）为止。
- 如果还没有找到，则返回 undefined。

对象构造函数继承
// 定义基类构造函数
function Person(name, age) {
  this.name = name;
  this.age = age;
}
// 在 Person 的原型上定义方法
Person.prototype.sayHello = function() {
  console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
};

// 定义子类构造函数
function Student(name, age, major) {
  Person.call(this, name, age); // 调用父类构造函数
  this.major = major;
}
// 设置原型链
Student.prototype = Object.create(Person.prototype);

// 修正 constructor 引用
Student.prototype.constructor = Student;

// 在 Student 的原型上定义方法
Student.prototype.study = function() {
  console.log(`${this.name} is studying ${this.major}.`);
};

链式操作 - return this

# 对象属性遍历
hasOwnProperty 返回自身非原型的属性
for...in 会把原型上的属性也遍历
for(var key in car) {
  if(car.hasOwnProperty(key)) {
		console.log(key + ': ' + car[key])
  }
}
判断属性是否在对象内 console.log('color' in car);in 不会排除对象原型上属性

# 函数内部 this 指向
- 普通函数 this 指向 window
- 构造函数通过 new 调用 this 指向实例化对象

闭包、箭头函数、setTimeout 中 this
var x = {
  name: 'bw2',
  getName1: function() {
    console.log(this)
  },
  getName2: function() {
    setTimeout(() =》 {
      console.log(this)
    },0)
  },
  getName31: () =》 {
    console.log(this)
  },
  getName32: function() {
    return function() {
      console.log(this)
    }
  }
}

# 错误类型
SyntaxError 语法错误
ReferenceError 引用错误
RangeError 范围错误
TypeError 类型错误
URIError URI 错误
EvalError eval 函数执行错误
Error 构造函数
var err = new Error('代码错误');

try 中的错误，不影响外部代码和 finally 中代码的执行
try {
	console.log('正常执行1');
  console.log(a);
  console.log('正常执行2');
} catch(e) {
	console.log('e->', e);
  console.log('e.name->', e.name);
  console.log('e.message->', e.message);
} finally {
	console.log('正常执行3');
}
console.log('正常执行4');

throw 手动抛错 throw '出错啦'

# 垃圾回收
- 找出**不再使用的变量**
- **释放**其占用**内存**
- **固定**的时间间隔**运行**

## **标记清除 mark and sweep**
- 标记进入环境
- 离开环境时，排除全局变量和形成闭包的变量，然后清除

## **引用计数 reference counting**
- 循环引用时，无法清除变量可能引发内存溢出

解除闭包内存
function test1() {
	var a = 1;
  return function() {
  	a++;
    console.log(a);
  }
}
var test = test1();
test();
test();
test();
test = null;
</pre
    >

    <h3>=====DOM======</h3>
    <pre>
文档对象模型（Document Object Model）
用来**表示或操作** HTML 和 XML; 属于 **宿主对象**
DOM 结构树
判断dom元素类型
Object.prototype.toString.call(document) // '[object HTMLDocument]'
Object.prototype.toString.call(document.createElement('div')) // '[object HTMLDivElement]'
获取元素 document
获取父节点: Node.parentNode
获取子节点: Node.childNodes, 不止包含元素节点;获取的是子代子节点而不是全部的后代子节点
节点的增删改
createElement
createTextNode
appendChild
insertBefore
removeChild

DOM 对象 = 元素节点

节点：
元素节点、文本节点、属性节点、注释节点、document、DocumentFragment

DOM对象
var div = document.getElementsByTagName('div')[0];

-》 元素 -》 元素节点
nodeName nodeValue nodeType attributes hasChildNodes

元素 		-》 		构造函数实例化			 -》 		div节点
div				new HTMLDivElement()			removeChild(div)
						-》 div DOM对象						删除了节点，但DOM对象还存在内存
            		存储在内存中

 p.remove(); 元素销毁，删除自身和自身所有子节点

## **data-***
- 设置自定义属性
- HTML5内容
- IE9以下没有
### **dataset**
- 管理自定义属性 console.log(p.dataset);

# 元素视图的各个尺寸、滚动距离与偏移量
- `offsetParent` —— 返回一个指向最近的（指包含层级上的最近）包含该元素的定位元素或者最近的 `table`, `td`, `th`, `body` 元素。
- `offsetLeft/offsetTop` —— 是相对于 `offsetParent` 的左上角边缘的坐标。
- **`offsetWidth/offsetHeight` —— 元素的“外部” width/height，边框（border）尺寸计算在内。**

- `clientLeft/clientTop` —— 从元素左上角外角到左上角内角的距离。
对于从左到右显示内容的操作系统来说，它们始终是左侧/顶部 border 的宽度。
而对于从右到左显示内容的操作系统来说，垂直滚动条在左边，所以 `clientLeft` 也包括滚动条的宽度。
- **`clientWidth/clientHeight` —— 内容的 width/height，包括 padding，但不包括滚动条（scrollbar）。**

- **`scrollWidth/scrollHeight` —— 内容的 width/height，就像 `clientWidth/clientHeight` 一样，但还包括元素的滚动出的不可见的部分。**
- `scrollLeft/scrollTop` —— 从元素的左上角开始，滚动出元素的上半部分的 width/height。

浏览器可视区域的尺寸（窗口的宽高）
- `window.innerWidth`
- `window.innerHeight`

# 事件
绑定事件：绑定事件的处理函数
事件 + 事件的反馈 = 前端交互
事件句柄：div.onclick = function() {}
事件源：事件作用在谁身上，谁就是事件源

事件流有三个阶段
- 事件捕获阶段
- 处于目标阶段 - 代码按先后顺序执行（新版chrome先捕获后冒泡）
- 事件冒泡阶段

JS 事件委托（事件代理）是一种利用事件冒泡机制来优化事件处理的技术。
在 JS 的事件流中，事件会经历捕获阶段、目标阶段和冒泡阶段。
当一个元素上的事件被触发时，该事件会从最具体的目标元素（即被点击的元素）开始向上冒泡，依次传递到它的父元素、祖父元素等，直到到达文档的根节点。
事件委托就是利用这个冒泡机制，将事件处理程序绑定到目标元素的父元素或更外层的祖先元素上，当子元素上的事件触发时，会冒泡到外层的祖先元素，从而在外层元素的事件处理程序中进行处理
- 减少内存占用和提高性能
- 动态生成的子元素事件绑定

事件对象
event.target 和 event.currentTarget 的区别
- target	             当前触发事件的元素
- **currentTarget**	   绑定事件处理函数的元素

# **onmouseenter、onmouseleave**
只绑定在当前元素本身，不存在冒泡行为
mouseover，mouseout，mousemove
当鼠标移入某元素时触发，移入和移出其子元素时也会触发。

自定义事件 CustomEvent

Web Components 组件化
shadowDOM
通过Shadow DOM，可以创建具有特定结构和样式的元素，然后在页面上像使用普通元素一样使用这些自定义元素
    </pre>

    <h3>=====ES6+======</h3>
    <pre>
# let，const
不能在同一作用域中重复声明
没有声明提升，声明之前不可用，会产生一个暂时性死区
只在当前作用域下生效
let 本质上是就是为 js 增加了一个块级作用域
const 值不可被修改，不可重复声明，有块级作用域，const 存储引用类型值不保证不可被更改

# 函数默认值会在()内形成一个单独的作用域
function foo(x = 3) {
  let x = 2;
  console.log(x);
}
foo();
// Identifier 'x' has already been declared
// 函数默认值可以等效为 let x = 3 ，由于此刻就声明了x，
// 所以函数内部再次声明，报错

# 解耦赋值：对象，数组

# 箭头函数
- **没有自身 this**，this 由外层作用域决定
- **不能作为构造函数**使用，底层原理与普通函数不同
- **无法**通过 apply、call、bind 来**显式改变箭头函数 this 指向**
- **没有 arguments 对象**，用 rest 运算符替代
- yield 命令不能生效，在 generator 函数中

# 对象属性描述符
defineProperty
var obj = {};
Object.defineProperty(obj, 'a', {
	value: 2,
  configurable: true,
  writable: true,
  enumerable: true
});
getter/setter
obj.a; //属性获取 [[Get]] 默认操作
obj.a = 3; // 赋值操作[[Put]]
get, set 应该成对出现
var obj = {
	get a() {
  	return this._a; // 返回私有变量_a
  },
  set a(val) {
  	this._a = val * 2;
  }
}

# Object.assign
- 浅拷贝
var clone = Object.create(
  Object.getPrototypeOf(obj), 
  Object.getOwnPropertyDescriptors(obj)
)
assign 拷贝是无法拿到 set 方法的
同名属性替换
var tar = {a: {b: 1, c: 2}}
var source = {a: {b: 'hhhh'}}
console.log(Object.assign(tar, source)) // {a: {b: 'hhhh'}}

# **super**
- 指向的是对象的原型对象
- 对象的简写的方法上才能使用

# Symbol
应用场景1：使用 Symbol 来作为对象属性名
const gender = Symbol('gender')
const obj = {
  name: 'Sunshine_Lin',
  [gender]: '男'
}
Symbol作为属性的属性不会被枚举出来，这也是 JSON.stringfy(obj) 时，Symbol 属性会被排除在外的原因
使用 Symbol 来替代常量
使用 Symbol 定义类的私有属性
class Login {
  constructor(username, password) {
    const PASSWORD = Symbol()
    this.username = username
    this[PASSWORD] = password
  }
  checkPassword(pwd) { return this[PASSWORD] === pwd }
}
const login = new Login('123456', 'hahah')
console.log(login.PASSWORD) // 报错

# iterator 迭代器
对数据结构的读取的一种方式，有序的，连续的，基于拉取的一种消耗数据的组织方式
- [] 数据
- arguments、nodeList、Map、Set、WeakMap、WeakSet 类数组
- TypeArray 二进制数据的缓存区，有点像数组

function myIterator(arr) {
  let index = 0;
  return {
    next() {
      return index 《 arr.length 
          ? { value: arr[index++], done: false }
          : { value: undefined, done: true }
    }
  }
}
for...of 遍历含有iterator的对象
for await of 批量异步队列 同步执行

function fn (time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${time}毫秒后我成功啦！！！`)
    }, time)
  })
}
async function asyncFn () {
  const taskArr = [fn(3000), fn(1000), fn(1000), fn(2000), fn(500)]
  for await (let x of taskArr) {
    console.log(x)
  }
}
# Array.of()
- 代替 new Array()
console.log(Array.of());
console.log(Array.of(1, 2));
Array.from(arrayLike 类数组)

# ES Module
- `export { add, minus }` 导出一个模块
- `import { add, minus } from 'xxx'`

- `export default {}` 导出一个对象
- `import obj from 'xxx'`

# 运算符
?. 取一个可能不存在的值
obj?.dog?.name // undefined

?? undefined 和 null 才算假值
0 || 'Lance' // 假值取右边 Lance

或等于(||=)   a ||= b 等同于 a || (a = b);
且等于(&&=)   a &&= b 等同于 a && (a = b);

Promise.any： 当有成功的时候，返回最快那个成功
- 接收一个 Promise 数组，数组中如有非 Promise 项，则此项当做成功
- **如果有一个 Promise 成功**，则返回这个成功结果
- 如果所有 Promise 都失败，则报错
Promise.any([fn(2000, true), fn(3000), fn(1000, true)]).then(res => {
  console.log(res) // 1秒后 输出  1000毫秒后我成功啦
}, err => {
  console.log(err)
})

# Set
- 成员唯一（基本类型去重，复杂类型不去重）
- 类数组结构
# Map
键名可以为任何值（包括函数、对象或任何原始值）
会把复杂类型 toString 后设置为键名
var m = new Map([['name', 'zhangsan'], ['age', 10]]);

- Set 是**有序列表**，类似于数组，但是没有重复值
- Map 是存储许多键值对的**有序列表**，**key 和 value 支持所有数据类型**
- 都是有序列表
- set 值不重复；map 键不重复
Map 与 Object 区别
- Object 的键只能是 字符串 or Symbol；Map 可以是任意类型
- Map 可以通过 size 获取元素个数，Object 得遍历
- Map 是有序的；Object 是无序的
- **Map 可迭代**；Object 只能遍历，或通过 Object.entries/values/keys 迭代

WeakMap、WeakSet
- 没有迭代接口
- **成员只能是对象**

# Proxy
- `Object.defineProperty(obj, prop, descriptor)` 是直接处理 obj，然后当操作 obj 时，会在 set、get 方法中进行拦截
    - **对 obj 本身操作**
    - 给 obj 上新增没有的属性

- Proxy(target, handler) 是通过处理 obj 以后，是**返回了一个代理对象**，你是通过操作这个代理对象，来对数据做操作的
    - 创建一个 obj 的代理，中间隔了一层交流
    - 相比 defineProperty 少了个 prop 参数，因为是对已有的 obj 操作、处理

- defineProperty 给对象增加属性用
- proxy 代理对象，通过重写 handler 对象，间接达到修改 target 的目的

let target = {
  a: 1,
  b: 2
}
let proxy = new Proxy(target, {
  get(target, prop) {
    console.log('This is property value ' + target[prop]);
    return target[prop];
  },
  set(target, prop, value) {
    console.log(1111)
    target[prop] = value;
  }
});

console.log("proxy.a", proxy.a); // 走了代理 This is ...
console.log("target.a", target.a); // 直接访问，没走代理。没显示 This is ...
proxy.b = 3;
console.log("target.b", target.b); // 3
console.log("proxy.b", proxy.b); // 3
console.log(proxy); // Proxy {a: 1, b: 2}

- Object.defineProperty 没法直接处理数组
- Proxy 可以

let proxy = new Proxy(target, {
  get(target, prop) {
    return 'GET: ' + prop + ' = ' + target[prop];
  },
  set(target, prop, value) {
    target[prop] = value;
    console.log('SET: ' + prop + ' = ' + value);
  },
  has(target, prop) {
    return Reflect.has(target, prop);
  },
  deleteProperty(target, prop) {
  	delete target[prop];
    console.log(1);
  }
});

function deepClone(org, tar) {
    let target = tar || {},
        toStr = Object.prototype.toString,
        arrType = '[object Array]';

    for (var key in org) {
      if (org.hasOwnProperty(key)) {
        let value = org[key];
        if (typeof value === 'object' && value !== null) {
          if (toStr.call(value) === arrType) {
            target[key] = [];
          } else {
            target[key] = {};
          }
          deepClone(value, target[key]);
        } else {
          target[key] = value;
        }
      }
    }
    return target;
  }
}

# class
### **static**
- 可以修饰属性和方法
- 不会被继承，只能通过类来调用
- 只在 Class 类中生效
Person.say()

class A {}
class B extends A {
  constructor() {
    super();  // ES6 要求，子类的构造函数必须执行一次 super 函数，否则会报错。
  }
}
当做对象使用
class A {
  c() {
    return 2;
  }
}

class B extends A {
  constructor() {
    super();
    console.log(super.c()); // 2
  }
}
let b = new B();
上面代码中，子类 B 当中的 `super.c()`，就是将 `super` 当作一个对象使用。
这时，`super` 在普通方法之中，指向 `A.prototype`，所以 `super.c()` 就相当于 `A.prototype.c()`。

**通过 super 调用父类的方法时，super 会绑定子类的 this。**
class A {
  constructor {
    this.x = 1;
  }
  s() {
    console.log(this.x);
  }
}

class B extends A {
  constructor {
    super();
    this.x = 2;
  }
  m() {
    super.s();
  }
}

let b = new B();
b.m(); // 2

# 模块化
为什么用到 IIFE
立即执行函数执行完后作用域销毁，自身的 AO，GO 都销毁，
只剩下 return 返回值和返回值持有的函数中的变量的引用（e.g. 闭包），这样做到了变量的私有化

缺点
- 相互依赖关系一旦复杂，不好捋顺
- 模块一旦变多，又出现全局变量可能覆盖的问题
    - 进一步解决：namespace 命名空间

## **模块化发展**
无模块化 
→ CommonJS规范（nodejs） : exports = module.exports
→ AMD规范 
→ CMD规范 
→ ES6模块化

CommonJs和ES6区别
CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用

运行时加载(全量): CommonJS 模块就是对象；即在输入时是先加载整个模块，生成一个对象，然后再从这个对象上面读取方法，这种加载称为“运行时加载”。
编译时加载(按需): ES6 模块不是对象，而是通过 export 命令显式指定输出的代码，import时采用静态命令的形式。即在import时可以指定加载某个输出值，而不是加载整个模块，这种加载称为“编译时加载”

import
- 静态导入
    - 初始化加载
        - `import xxx from './xxx';` ，`script` 依赖 `type="module"`
- 动态导入 import() 不是在调用方法，只是动态导入的一种规定的语法
    - 按需加载
        - `import('./xxx');` 不依赖 `type="module"`
            - `import('./xxx').then(module => console.log(module));`
</pre
    >

    <h1>专题系列</h1>
    <pre>
# WeakMap使用场景
const oBtn1 = document.querySelector('#btn1');
const oBtn2 = document.querySelector('#btn2');

const oBtnMap = new WeakMap();
oBtnMap.set(oBtn1, handleBtn1Click);
oBtnMap.set(oBtn2, handleBtn2Click);

oBtn1.addEventListener('click', oBtnMap.get(oBtn1), false);
oBtn2.addEventListener('click', oBtnMap.get(oBtn2), false);

oBtn1.remove();
oBtn2.remove();
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
