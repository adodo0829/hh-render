# 场景&逻辑思考

## js 执行机制

```js
// 说一下以下代码执行后，输出的结果和顺序
setTimeout(function () {
  console.log("a");
});

new Promise(function (resolve) {
  console.log("b");
  for (let i = 1; i < 10; i++) {
    console.log(i);
    i === 10 && resolve();
  }
}).then(function () {
  console.log("c");
});

console.log("d");
```

## 事件委托

```js
function eventProxy(eventType, parentEle, targetEle, fn) {
  parentEle.addEventListener(eventType, (e) => {
    let currTarget = e.target // 通过 e.target 判断点击元素是不是li的
    while(!curTarget.matches(targetEle)) {
    // 看它是不是使用者监听的目标对象类型
    if (curTarget === element) {
        curTarget = null;
        break;
    }
    // 不相同则把当前对象设置成自己的父对象
    curTarget = curTarget.parentNode;
    })
    // 是，则先看当前对象有没有值，有值则执行回调函数
    curTarget && fn(e, curTarget);
  }
}
var ul = document.querySelector('ul');
listen('click', ul, 'li', function(event, el) {
    console.log(event, el);
});
```

## 实现深拷贝

判断入参类型，如果是数组，递归；如果是对象；同样

## 防抖

一种限制某个函数在一定时间内只能执行一次的技术，无论触发事件的频率有多高。这在处理诸如窗口调整大小、滚动、键盘输入等高频事件时非常有用，因为它可以减少函数执行的次数，从而提高性能

一直触发，等最后一次停止 n 秒后执行;

- 延迟执行
- 延迟期间再被触发，重新计时

## 节流

事件触发期间，n 秒内最多只执行一次；类似技能 cd 逻辑；在单位时间内无论触发多少次，我只执行 1 次；

节流（throttle）是一种限制函数执行频率的技术，确保函数在指定的时间间隔内最多只执行一次，无论触发事件的频率有多高。
这与防抖（debounce）不同，防抖是确保函数在事件触发后等待一定时间才执行，如果在这个等待时间内再次触发事件，则重新计时。

mousemove 和 scroll 滚动事件

## 异步编程

```js
// 迭代器： 指针，next()
// 对数据结构读取的一种方式，有序的，连续的，基于拉取的一种消耗数据的组织方式
// [Symbol.iterator]()  for (let k of Map) {}
function myIterator(arr) {
  let index = 0;
  return {
    next() {
      return index < arr.length
        ? { value: arr[index++], done: false }
        : { value: undefined, done: true };
    },
  };
}
// generator 生成器, 会返回迭代对象 iterator；iterator.next() 返回yield表达式后面的值
function* foo() {
  // yield（产出），每次暂停函数执行，有记忆功能
  yield "Hello world";
  // return 会终止产出
}
// 在第一次使用next()方法时，传递参数是无效的
let fs = require("fs");
function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, data) => {
        if (data) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  };
}
var readFile = promisify(fs.readFile);
function* read() {
  let value1 = yield readFile("./name.txt", "utf-8");
  let value2 = yield readFile(value1, "utf-8");
  let value3 = yield readFile(value2, "utf-8");
  console.log(value3);
}
var iter = read();
let { value, done } = iter.next();
value.then((res) => {
  console.log(res);
  let { value, done } = iter.next(res); // res 会赋值给value1
  value.then((val) => {
    let { value, done } = iter.next(val); // val 会赋值给value2
    value.then((val3) => {
      console.log(val3);
    });
  });
});
```

Promise 异步编程的一种解决方案;

- 状态不受外界影响, 状态不可逆
  - pending 进行中
  - resolve 已成功
  - reject 已失败
    特性：
    1.then 的返回值作为下一次 then 的执行参数
    2.resolve 导致抛出错误会被 reject 接收
    3.catch 等同于：then 第一个参数为 null ，第二个参数为 reject 的回调函数

```js
var promise = new Promise((resolve, reject) => {
  resolve(a);
});
promise.then(null, (reason) => {
  console.log("reject", reason);
});
promise.catch((reason) => {
  console.log("reject", reason);
});

// 4.pormise 状态一旦固化，就无法再改变
var promise = new Promise((resolve, reject) => {
  resolve("ok");
  console.log(a); // 这个报错因为状态固化，无法被捕获
});
// 5.catch 冒泡（可以捕获多层then的异常），then() 不传参数会被直接忽略
var promise = new Promise((resolve, reject) => {
  resolve(1);
});
promise
  .then((val) => {
    console.log("res", val);
    throw new Error("then error");
  })
  .then()
  .then()
  .catch((reason) => {
    console.log("reject", reason);
  });

// 6.值穿透指的是，链式调用的参数**不是函数时，会发生值穿透**，就传入的非函数值忽略，传入的是之前的函数参数。
// 7.异常穿透（then 中捕获到异常后不会传递给后续 catch）
```

Promise.all():
成功会返回新的 promise 对象数组
有一个失败就返回第一个失败的返回值

Promise.race()
任意一个 promise 失败或者成功, 就会返回第一个固化的 promise 的结果

Promise.resolve()
thenable 能把对象转为 promise

Promise.any()
接收一个 Promise 数组，数组中如有非 Promise 项，则此项当做成功
如果有一个 Promise 成功，则返回这个成功结果
如果所有 Promise 都失败，则报错

### 为什么 Promise 执行是同步，p.then 是异步

Promise 的构造函数在创建 Promise 对象时会立即执行传入的函数(执行器函数)。
这意味着 Promise 构造函数中的代码是同步的;
当你调用 p.then(...) 时，then 的回调函数会被推入任务队列并在当前的执行栈清空后才会执行;
then 的回调是在微任务队列中执行的，它会在所有同步代码执行完毕后再执行：

所以 then 为什么是异步的？
因为 then 方法本质上是利用了 JavaScript 的事件循环机制，在 Promise 被 resolve 或 reject 后，将`其回调`放入 微任务队列（Microtask Queue），等到当前所有同步代码执行完成后再执行。

这是 JavaScript 保持代码执行顺序一致性的一种设计，保证无论何时 .then() 注册，回调的执行都是异步的;

Promise 的设计解决了 JavaScript 异步编程中的几个重要问题，特别是关于回调地狱、错误处理，以及保持代码执行顺序一致性的问题。
下面是这种设计的关键好处和解决的问题

```js
// 1. 解决回调地狱问题
// 在没有 Promise 之前，异步操作通常是通过回调函数实现的，当多个异步操作嵌套在一起时，就会形成“回调地狱”——层层嵌套的代码导致代码结构难以维护、理解困难。
// 传统回调风格
doSomething((result1) => {
  doSomethingElse(result1, (result2) => {
    doThirdThing(result2, (result3) => {
      // callback hell...
    });
  });
});
// 使用 Promise，可以将这些嵌套的回调平铺成链式调用，代码的结构更清晰
doSomething()
  .then((result1) => doSomethingElse(result1))
  .then((result2) => doThirdThing(result2))
  .catch((error) => console.error(error));

// 2. 规范错误处理
// 在传统的回调中，错误处理需要在每个回调函数中手动添加，出错时代码的追溯和管理都很麻烦
// Promise 通过 .catch() 统一捕获错误，可以将异步错误管理集中化。所有被链式 .then() 连接的操作，出错时会进入 .catch() 中

// 3.保持代码执行顺序一致性
// Promise 的设计使得所有的 .then() 回调都是异步的。
// 保持一致性：无论 Promise 是立即 resolved 还是稍后才 resolved，.then() 回调的执行总是异步的，即始终在当前代码执行栈清空后才执行。这种一致性让我们可以更清晰地预期代码的执行顺序

// 避免同步回调带来的阻塞：同步执行的回调会阻塞当前执行，导致后续代码必须等待，而异步 .then() 可以在不阻塞的情况下处理后续逻辑，使代码执行更流畅
```

微任务 - promise，process.nextTick() 优先级更高，优先执行

宏任务

- setTimeout 等
- 执行宏任务之前，**会先把队列中的微任务一个个执行**

### async / await

内置执行期 co 函数封装到了 await 内部;
async 函数会返回一个 Promise 对象，如果在函数中  return  一个直接量，async 会把这个直接量通过  Promise.resolve()  封装成 Promise 对象。

```js
async function fn() {}
console.log(fn); // [AsyncFunction: fn]
console.log(fn()); // Promise {<fulfilled>: undefined}
// 怎么才能使值不是undefined呢？很简单，函数有return返回值
async function fn(num) {
  return num;
}
console.log(fn); // [AsyncFunction: fn]
console.log(fn(10)); // Promise {<fulfilled>: 10}
fn(10).then((res) => console.log(res)); // 10
```

await 是在等待一个 async 函数完成; wait 等待的是一个表达式，这个表达式的计算结果是 Promise 对象或者其它值

```js
const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);

async function read() {
  // try 或者 catch 不显式的 return 值，默认走 resolve
  try {
    let value = await readFile("./first.tt", "utf-8");
    console.log("await 拿到的value", value);
    //  return 'async read 返回值'; // 走 resolve
  } catch (err) {
    console.log("try-catch捕获的错误", err);
    // return Promise.reject(err); // 走 reject
  }
  // try、catch中如果都return，下面一行代码就不执行了
  console.log("try-catch后边代码"); // 这里会执行
}

let promise = read();
promise.then(
  (val) => {
    console.log("then success:", val);
  },
  (err) => {
    console.log("then fail", err);
  }
);

console.log(1111);

// 生成器函数
function generator(arr) {
  let nextIdx = 0,
    len = arr.length;

  return {
    next() {
      return nextIdx < len
        ? { value: arr[nextIdx++], done: false }
        : { value: undefined, done: true };
    },
  };
}
// 应用：中间件
// https://evelance.notion.site/7-20-async-await-e2f51959b4e24933bf1cf8e8580cde75

function generatorToAsync(generatorFn) {
  return function () {
    const gen = generatorFn.apply(this, arguments); // gen有可能传参
    // 返回一个Promise
    return new Promise((resolve, reject) => {
      function go(key, arg) {
        let res;
        try {
          res = gen[key](arg); // 这里有可能会执行返回reject状态的Promise
        } catch (error) {
          return reject(error); // 报错的话会走catch，直接reject
        }

        // 解构获得value和done
        const { value, done } = res;
        if (done) {
          // 如果done为true，说明走完了，进行resolve(value)
          return resolve(value);
        } else {
          // 如果done为false，说明没走完，还得继续走

          // value有可能是：常量，Promise，Promise有可能是成功或者失败
          return Promise.resolve(value).then(
            (val) => go("next", val),
            (err) => go("throw", err)
          );
        }
      }

      go("next"); // 第一次执行
    });
  };
}

const asyncFn = generatorToAsync(gen);
asyncFn().then((res) => console.log(res));
```

## 浏览器事件循环逻辑

```js
document.body.style.backgroundColor = "orange";
console.log(1);
setTimeout(() => {
  document.body.style.backgroundColor = "green";
  console.log(2);
}, 100);
Promise.resolve(3).then((num) => {
  document.body.style.backgroundColor = "red";
  console.log(num);
});
console.log(4);
```

## 手写系列

```js
function myInstanceOf(instance, constructor) {
  var left = instance, // 左边是实例
    right = constructor, // 右边是构造函数
    proto = left.__proto__; // 拿到实例的原型
  while (proto) {
    if (proto === right.prototype) {
      return true;
    }
    // 没找到，就向上再找
    proto = proto.__proto__;
  }
  // 找到头都没找到，就是false
  return false;
}

function _new(fn, ...args) {
  const obj = Object.create(fn.prototype);
  const ret = fn.apply(obj, args);
  return ret instanceof Object ? ret : obj;
}
```
