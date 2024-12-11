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
