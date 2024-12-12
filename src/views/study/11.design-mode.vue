<template>
  <div>
    <section>
      <h3>观察者模式</h3>
      <img
        style="width: 600px"
        src="https://evelance.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fa8956dcf-ca76-4292-926f-e00c0f962883%2FUntitled.png?table=block&id=7a8d0b3c-b382-4bb2-8954-17a6944e4bf0&spaceId=c9e7ae34-64f6-4cc4-9c74-4ce3b1d1ee92&width=1250&userId=&cache=v2"
        alt=""
      />
      <pre>
  ## 观察者模式
  定义是在对象之间定义一个**一对多的依赖**，当一个对象自身状态改变的时候，会自动通知给关心该状态的观察者；
  解决了主体对象与观察者之间功能的耦合，即一个对象状态改变给其他对象通知的问题；
  这种对象与对象，有点像 商家-顾客 的关系，顾客对商家的某个商品感兴趣，就被商家记住，等有新品发布，便会直接通知顾客
</pre
      >
      <button @click="handleObserver">观察者接受主题发消息</button>

      <button @click="handleEmit">发布订阅模式 发消息</button>
    </section>

    <section>
      <h3>发布订阅</h3>
      <img
        style="width: 600px"
        src="https://evelance.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F9faab839-61db-4e57-8593-bececd6409da%2FUntitled.png?table=block&id=ecc4a952-cca9-4e28-82f9-1f4d05422777&spaceId=c9e7ae34-64f6-4cc4-9c74-4ce3b1d1ee92&width=1340&userId=&cache=v2"
        alt=""
      />
      <pre>
  ## 发布订阅模式
  也是定义一对多的依赖关系，对象状态改变后，通知给所有关心这个状态的订阅者。
  订阅发布模式有订阅的动作，可以不和商家直接产生联系，只要能订阅上关心的状态即可，通常利用第三方媒介来做，而发布者也会利用三方媒介来通知订阅者。
  有点像 商家-APP-顾客 的关系，某个产品断货，顾客可以在APP上订阅上货通知，待上新，商家通过APP通知订阅的顾客
  在程序实现中，第三方媒介称之为 EventBus(事件总线/事件调度中心)，可以理解为订阅事件的集合，它提供订阅、发布、取消等功能。
  订阅者订阅事件，和发布者发布事件，都通过事件总线进行交互。
</pre
      >

      <pre>
两种模式的异同
- 观察者模式
    - 理解
        - 顾客（观察者）→ 商店（被观察者）
    - 行为
        - 观察者观察对象的改变，对象改变后通知观察者自身改变
        - 被观察者 自身管理 观察者以及后续的通知操作
- 发布订阅模式
    - 理解
        - 顾客（订阅者）→ 公众号（事件总线/调度中心） ← 商店（发布者）
    - 行为
        - 顾客通过公众号订阅商店，商店发布消息后通过公众号告知所有顾客
- 差异
    - **发布订阅模式其实就是观察者模式的进一步抽象**，把**订阅池和发布功能**抽离成了一个事件总线/调度中心，方便灵活使用

从概念上理解，两者没什么不同，都在解决对象之间解耦，通过事件的方式在某个时间点进行触发，监听这个事件的订阅者可以进行相应的操作。

在实现上有所不同，**观察者模式**中的**发布者自身来维护**订阅者，后续的一些列操作都要通过**发布者完成**；
订阅发布模式是订阅者和发布者中间会有一个**事件总线**，操作都要**经过事件总线**完成。
    </pre
      >
    </section>

    <section>
      <pre>
面向对象：把具有相同属性和行为的事物抽象成一个事物类别，通过实例化，让这个事物类别构造出一个具体的事物，这个具体的事物就是对象
class实例化： 属性和方法集合的抽象

封装：控制类的属性与方法的可访问方式：
- private	只有类的内部可访问
- public	完全开放访问
- protected	可供子类访问
 Symbol 实现方法私有化

const doAjax = Symbol('doAjax');
class HTTP {
	[doAjax](options) {
  	...
  }
}
多态：方法的重写和重载

继承：
实例的__p__指向构造函数的原型prototype
person1.__proto__ === Person.prototype
原型链是JavaScript中实现继承的机制。
当试图访问一个对象的属性时，如果该对象本身没有这个属性，JavaScript引擎会沿着原型链向上查找，直到找到该属性或者到达原型链的末端（Object.prototype的原型是null）。
      </pre>
    </section>

    <section>
      <h3>单例模式</h3>
      <p>
        一个类只有一个实例，访问的实例永远都是同一个；
        全局变量也是一种简单的单例模式； 其实就是对同一个对象引用的操作
      </p>
      <button @click="handleSingleMode">测试单例</button>
      <pre>
// Singleton.js 导出去是同一个实例的引用,也可以当做单例使用
class Singleton {
  constructor() {
    this.someMethod = () => {
      console.log('Doing something...');
    };
  }
}
const instance = new Singleton();
export default instance;

import singletonInstance from './Singleton.js';
const instance1 = singletonInstance;
const instance2 = singletonInstance;
console.log(instance1 === instance2); // 输出：true

      </pre>
    </section>
  </div>
</template>

<script>
import { EventEmitter } from "@/utils/designMode/emitter";
import { SingleMode } from "@/utils/designMode/single";
import { Customer, Subject } from "@/utils/designMode/observer";

export default {
  name: "xxx",
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {
    handleObserver() {
      const subject = new Subject();
      const ob1 = new Customer(1);
      const ob2 = new Customer(2);
      const ob3 = new Customer(3);

      // ob1,ob2关注商品 水
      subject.addListener("obWater", ob1);
      subject.addListener("obWater", ob2);
      subject.addListener("obTV", ob3);

      // 过了几天
      setTimeout(() => {
        subject.emitListener("obWater", "水降价=》来啊，购买啊");
        subject.emitListener("obTV", "tv降价了");
      }, 2000);
    },

    handleEmit() {
      const evBus = new EventEmitter();

      function add1(data) {
        console.log("我是执行 add1任务的", data);
      }
      function add2(data) {
        console.log("我是执行 add2任务的", data);
      }
      function del(data) {
        console.log("我是执行 delete任务的", data);
      }

      evBus.on("add", add1);
      evBus.on("add", add2);
      evBus.on("del", del);

      evBus.emit("add", 11);
      evBus.emit("del", 222);
    },

    handleSingleMode() {
      // 其实就是对同一个对象引用的操作
      let aIns = SingleMode.getInstance("xxxaa");
      let bIns = SingleMode.getInstance();
      aIns.getOptions();
      bIns.getOptions();
      console.log(aIns === bIns);
    },
  },
};
</script>
