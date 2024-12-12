// 一直一直点触发，n秒后才真正执行
function debounce1(callback, delay) {
  let timeID = null;
  return function (...args) {
    if (timeID) {
      // 取消timeID绑定的延迟执行的函数
      window.clearTimeout(timeID);
    }
    timeID = setTimeout(() => {
      callback.apply(this, args);
      timeID = null;
    }, delay);
  };
}

export function debounce(func, delay, rightNow = false) {
  // - 延迟执行
  // - 延迟期间再被触发，重新计时
  let timeId = null; // 用闭包存储一个变量

  // 参数透传
  return function () {
    if (timeId) {
      window.clearTimeout(timeId);
    }
    if (rightNow) {
      let callFlag = !timeId;
      if (callFlag) {
        func.apply(this, arguments);
      }
      timeId = setTimeout(() => {
        timeId = null;
      }, delay);
    } else {
      timeId = setTimeout(() => {
        func.apply(this, arguments);
        timeId = null;
      }, delay);
    }
  };
}
