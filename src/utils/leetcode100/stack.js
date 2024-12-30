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

/**
 * 给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。
 * 你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。
 * 返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。
 *
 * 输入：[7,1,5,3,6,4]
 * 输出：5
 * 卖出价格需要大于买入价格
 * prices = [7,6,4,3,1]
 * 输出：0；在这种情况下, 没有交易完成, 所以最大利润为 0。
 */
var maxProfit = function (prices) {
  // let v = 0;
  // let n = prices.length;
  // for (let i = 0; i < n; i++) {
  //   let prev = prices[i];
  //   for (let j = i + 1; j < n; j++) {
  //     let curr = prices[j];
  //     let temp = curr - prev;
  //     v = Math.max(v, temp);
  //   }
  // }
  // return v;
  let maxGap = 0;
  let minPrice = +Infinity;
  // 贪心算法求最大差值
  for (let i = 0; i < prices.length; i++) {
    const currPrice = prices[i];
    // 直接算，不用判断
    minPrice = Math.min(currPrice, minPrice);
    maxGap = Math.max(maxGap, currPrice - minPrice);
  }
  return maxGap;
};
