// ## **订阅发布模式**
// 订阅和发布的功能都在事件总线中
export class EventEmitter {
  handlerMap = {
    // 事件类型type: [订阅者1, 订阅者2, ...]
    // click: [handler1, handler2, handler3]
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
