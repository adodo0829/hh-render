export class EventDispatcher {
  /**事件列表*/
  eventList = {};
  constructor() {}
  /**
   * 派发事件
   * @param type 事件类型
   * @param args 事件参数
   */
  dispatchEvent(type, ...args) {
    let arr = this.eventList[type];
    if (arr) {
      arr.forEach((item) => {
        item[0].apply(item[1], args);
      });
    }
  }

  /**
   * 监听事件
   * @param type       事件类型
   * @param listener   回调函数
   * @param thisObject 回调执行对象
   */
  addEventListener(type, listener, thisObject) {
    let arr = this.eventList[type];
    if (!arr) {
      arr = [];
      this.eventList[type] = arr;
    }
    arr.push([listener, thisObject]);
  }

  /**
   * 移除事件
   * @param type       事件类型
   * @param listener   回调函数
   * @param thisObject 回调执行对象
   */
  removeEventListener(type, listener, thisObject) {
    var arr = this.eventList[type];
    if (arr) {
      var len = arr.length;
      for (var i = len - 1; i >= 0; i--) {
        if (arr[i][0] == listener && arr[i][1] == thisObject) {
          arr.splice(i, 1);
        }
      }
    }
    if (arr && arr.length == 0) {
      this.eventList[type] = null;
      delete this.eventList[type];
    }
  }
}
