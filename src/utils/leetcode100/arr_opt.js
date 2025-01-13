// 数据操作

/**
 * 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
 * 请注意 ，必须在不复制数组的情况下原地对数组进行操作
 */

var moveZeroes = function (nums) {
  function swap(arr, a, b) {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
  }
  let [fast, last] = [0, 0];
  while (fast < nums.length) {
    if (nums[fast] !== 0) {
      // [nums[fast], nums[last]] = [nums[last], nums[fast]]
      swap(nums, fast, last); // 如果都是非0，原地赋值
      last++; // 让后指针紧跟着
    }
    fast++;
  }
};

/**
 * 比特位计数
 * 给你一个整数 n ，对于 0 <= i <= n 中的每个 i ，计算其二进制表示中 1 的个数 ，返回一个长度为 n + 1 的数组 ans 作为答案
 */
const countOnes = (x) => {
  let ones = 0;
  // 0 & 0 = 0
  // 0 & 1 = 0
  // 1 & 0 = 0
  // 1 & 1 = 1
  //   按位与
  //   let result = a & b;  // 结果为 1，因为 101 & 011 = 001
  while (x > 0) {
    x &= x - 1;
    ones++;
  }
  return ones;
};
var countBits = function (n) {
  let res = [];
  let i = 0;
  while (i <= n) {
    const byteStr = i.toString(2);
    const countOf1 = byteStr.split("").filter((s) => s === "1").length;
    res[i] = countOf1;
    i++;
  }

  return res;
};

/**
 * 给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。
 * 时间复杂度为 O(n)
 */

