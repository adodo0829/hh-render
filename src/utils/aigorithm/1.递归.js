// 阶乘问题， n阶的值
function factorial(n) {
  // n*n-1*n-2,.... n * (n-1)!
  let res = 1;
  if (n === 1) {
    return res;
  }
  res = n * factorial(n - 1);
  return res;
}

let r = factorial(5);
console.log(r);

// 深克隆
function cloneDeep(obj) {
  // 类型判断
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  let tempObj;

  if (obj instanceof Array) {
    tempObj = [];
    for (let i = 0; i < obj.length; i++) {
      tempObj[i] = cloneDeep(obj[i]);
    }
  }

  if (obj instanceof Object) {
    tempObj = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        tempObj[key] = cloneDeep(obj[key]);
      }
    }
  }

  return tempObj;
}

let a = {
  a: 1,
  b: 2,
  c: {
    d: 1,
  },
};

console.log(cloneDeep(a) === a);
