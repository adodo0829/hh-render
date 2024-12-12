// 一直一直触发，按固定频率执行: 用开关来控制

function throttle1(callback, limitTime) {
  let timeID = null;
  return function (...args) {
    // 非立即执行版， 最后一次执行
    if (timeID) {
      return;
    }
    timeID = setTimeout(() => {
      callback.apply(this, args);
      timeID = null;
    }, limitTime);
  };
}

// 立即执行版， 首次执行，最后一次也调用
function throttle2(fn, limitTime) {
  let timeID = null;
  let tempTime = 0;

  return function (...args) {
    // 首次系统时间一般都比limit大，会立即执行
    // 后面就是增量时间了
    const now = Date.now();
    clearTimeout(timeID);
    if (now - tempTime >= limitTime) {
      fn.apply(this, args);
      tempTime = Date.now();
    } else {
      // 为了最后一次触发可以调用函数
      timeID = setTimeout(() => {
        fn.apply(this, args);
      }, limitTime);
    }
  };
}
