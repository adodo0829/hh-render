// 给定一个大小为 n 的数组 nums ，返回其中的多数元素。
// 多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。

/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  let len = nums.length;
  let map = Object.create(null);
  for (let i = 0; i < nums.length; i++) {
    const ele = nums[i];
    if (map[ele]) {
      map[ele]++;
    } else {
      map[ele] = 1;
    }
  }
  for (const num in map) {
    const v = map[num];
    if (v > len / 2) {
      return +num;
    }
  }
};
