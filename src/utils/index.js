export function getRandomColor() {
  return [Math.random() * 255, Math.random() * 255, Math.random() * 255, 255];
}

export function debounce(func, delay, rightNow = false) {
  // - 延迟执行
  // - 延迟期间再被触发，重新计时
  let timeId = null; // 用闭包存储一个变量

  // 参数透传
  return function (...args) {
    if (timeId) {
      window.clearTimeout(timeId);
    }
    if (rightNow) {
      let callFlag = !timeId;
      if (callFlag) {
        func.apply(this, args);
      }
      timeId = setTimeout(() => {
        timeId = null;
      }, delay);
    } else {
      timeId = setTimeout(() => {
        func.apply(this, args);
        timeId = null;
      }, delay);
    }
  };
}

export function throttle(func, delay) {
  // 事件触发期间，n 秒内只执行一次
  let flag = true;
  return function (...args) {
    if (flag) {
      func.apply(this, args);
      flag = false;
      setTimeout(() => {
        flag = true;
      }, delay);
    }
  };
}
