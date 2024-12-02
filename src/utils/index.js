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

const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED"; // 三种状态

// 实例化时立即执行，返回一个pm实例
class MyPromise {
  static resolve(value) {
    if (value instanceof MyPromise) {
      return value;
    }
    return new MyPromise((resolve, reject) => {
      resolve(value);
    });
  }
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }

  constructor(promiseCallback) {
    this.status = PENDING;
    this.value = undefined; // resolve 值
    this.reason = undefined; // reject 值
    // 状态的回调池
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    // 立即执行
    try {
      promiseCallback(resolve, reject);
    } catch (err) {
      // 如果在 executor 中直接抛出错误，得用 try-catch 捕获下，并走 reject
      reject(err);
    }

    // 两个处理函数
    function resolve(v) {
      if (v instanceof MyPromise) {
        v.then(resolve, reject);
      }
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = v;
        this.onFulfilledCallbacks.forEach((fn) => fn());
      }
    }
    function reject(reason) {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    }
  }

  // 示例方法
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
    onRejected = typeof onRejected === "function" ? onRejected : (v) => v;

    // then 每次都会返回一个Promise, 实现then链式调用
    let pm = new MyPromise((resolve, reject) => {
      // 判断p状态
      if (this.status === FULFILLED) {
        setTimeout(() => {
          let x = onFulfilled(this.value);
          // onFulfilled 有可能返回一个普通值，也有可能返回一个 Promise, 需要一个函数来判断和处理这个返回值 x
          resolvePromise(pm, x, resolve, reject);
        }, 0);
      }

      if (this.status === REJECTED) {
        setTimeout(() => {
          let x = onRejected(this.reason);
          resolvePromise(pm, x, resolve, reject);
        }, 0);
      }

      if (this.status === PENDING) {
        // 订阅
        this.onFulfilledCallbacks.push(() => {
          // PENDING状态下回调也要异步, 将状态回头推入池子中
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(pm, x, resolve, reject);
            } catch (err) {
              reject(err);
            }
          }, 0);
        });

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(pm, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
      }
    });

    return pm;
  }
  // catch() 相当于.then(null, () => {})
  catch(errorCallback) {
    return this.then(null, errorCallback);
  }
  // 1. finally 无论外边的Promise成功还是失败，都要走finally的回调，并且回调不带参数
  // 2. finally 不返回 Promise 时， 走 then 或者 catch 取决于外边 Promise
  // 3. 如果 finally 内部有 promise 并且有延迟处理，整个finally会等待
  // 4. finally的promise如果是reject，优先级更高
  // 5. finally的promise如果是resolve，则外边优先级更高
  finally(finallyCallback) {
    return this.then(
      (v) => {
        return MyPromise.resolve(finallyCallback()).then(() => value);
      },
      (reason) => {
        return MyPromise.resolve(finallyCallback()).then(() => {
          throw reason;
        });
      }
    );
  }

  // class静态方法
}

// 判断是否为 Promise
export function isPromise(x) {
  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    let then = x.then;
    return typeof then === "function";
  }
  return false;
}

export function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    reject(new TypeError("Chaining cycle detected for promise #<MyPromise>"));
  }
  let called = false; // 防止 resolve、reject 都调用的情况

  if (isPromise(x)) {
    try {
      // 防止 then 抛错 throw Error
      let then = x.then;
      if (typeof then === "function") {
        // 认定为 Promise
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        resolve(x);
      }
    } catch (err) {
      if (called) return;
      called = true;
      reject(err);
    }
  } else {
    resolve(x);
  }
}
