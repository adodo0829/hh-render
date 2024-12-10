export class Customer {
  constructor(name) {
    this.name = name;
  }
  update(data) {
    console.log(`我是观察者 watcher ${this.name}，收到通知`, data);
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
        ob.update(msg); // 这里是批量发消息
      });
    }
  }
}
