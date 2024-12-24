/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
  let len = temperatures.length;
  let res = new Array(len).fill(0);
  // res中更新i对应递增值
  // 单调递增的数组来存 值 对应的i
  let stack = [];
  for (let i = 0; i < len; i++) {
    let currT = temperatures[i];
    // 用一个栈记录还没算出下一个更大元素的那些数的下标
    // 单调栈总结：及时去掉无用数据，保持栈中元素有序

    // 思考，如何更新res[i], 从递增栈中取, 要取就得先push
    // 怎么进栈？当前值 小于 递增栈中索引对应的值
    // 怎么赋值res[i], 当前值大于递增栈的中索引对应的值
    // 将条件提到while循环内，可以减少无用遍历
    while (stack.length && currT > temperatures[stack[stack.length - 1]]) {
      // 当前值比栈索引大，更新栈索引对应的值
      const idx = stack.pop();
      res[idx] = i - idx;
    }

    stack.push(i);
  }

  return res;
};
