export class SingleMode {
  // static不能被继承，只能被class调用
  static instance = null;
  static getInstance(options) {
    if (!SingleMode.instance) {
      SingleMode.instance = new SingleMode(options);
    }
    return SingleMode.instance;
  }

  constructor(options) {
    this.options = options;
  }

  getOptions() {
    console.log("xxxx", this.options);
  }
}

// Singleton.js 导出去是同一个实例的引用, 也可以当做单例使用
class Singleton {
  constructor() {
    this.someMethod = () => {
      console.log("Doing something...");
    };
  }
}
const instance = new Singleton();
export default instance;

export class Customer {
  constructor(name) {
    this.name = name;
  }
  getMsg(data) {
    console.log(`我是观察者${this.name}，收到通知`, data);
  }
}
// 定义商家(被观察者)，商家提供订阅、取消订阅、发布功能
export class Subject {
  constructor() {
    this.observerMap = {
      // 主题的每个事件类型对应了一堆 观察者
      // [type]: [ob1, ob2, ob3....]
    };
  }
  addListener(eType, customer) {
    if (!Array.isArray(this.observerMap[eType])) {
      this.observerMap[eType] = [];
    }
    if (!this.observerMap[eType].includes(customer)) {
      this.observerMap[eType].push(customer);
    }
  }
  removeListener(eType, customer) {
    const observers = this.observerMap[eType];
    if (observers && observers.length) {
      const filterObs = observers.filter((ob) => ob !== customer);
      this.observerMap[eType] = filterObs;
    }
  }
  emitListener(eType, msg) {
    // 给特定（关注该事件或者活动的）用户发消息
    const observers = this.observerMap[eType];
    if (observers && observers.length) {
      observers.forEach((ob) => {
        // 需要在这里处理不同观察者的逻辑
        ob.getMsg(msg); // 这里是批量发消息
      });
    }
  }
}

// ## **订阅发布模式**
// 订阅和发布的功能都在事件总线中
export class EventEmitter {
  handlerMap = {
    // 事件类型type: [订阅者1, 订阅者2, ...]
    // e.g. : click: [handler1, handler2, handler3]
  };
  // 添加
  on(type, handler, once) {
    if (!Array.isArray(this.handlerMap[type])) {
      this.handlerMap[type] = [];
    }
    if (!this.handlerMap[type].includes(handler)) {
      handler.once = once;
      this.handlerMap[type].push(handler);
    }
  }
  off(type, handler) {
    if (this.handlers[type]) {
      this.handlers[type] = this.handlers[type].filter((fn) => {
        return fn !== handler;
      });
    }
  }
  once(type, handler) {
    this.on(type, handler, false);
  }
  // 发布事件
  emit(type, ...args) {
    const currHandlers = this.handlerMap[type];
    if (currHandlers.length) {
      currHandlers.forEach((func) => {
        if (args.length) {
          func.apply(this, args);
        } else {
          func.call(this);
        }

        if (func.once) {
          this.off(type, func); // 调用一次就移除掉
        }
      });
    }
  }
}
