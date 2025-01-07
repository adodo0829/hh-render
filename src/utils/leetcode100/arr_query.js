// 数组查找系列

/**
 * 给定一个大小为 n 的数组 nums ，返回其中的多数元素。
 * 多数元素: 是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素
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
    const count = map[num];
    if (count > len / 2) {
      return +num;
    }
  }
};

/**
 * 给你一个含 n 个整数的数组 nums ，其中 nums[i] 在区间 [1, n] 内。
 * 请你找出所有在 [1, n] 范围内但没有出现在 nums 中的数字，并以数组的形式返回结果。
 *
 * nums = [4,3,2,7,8,2,3,1] 输出：[5,6]
 * nums = [1,1] 输出：[2]
 */

var findDisappearedNumbers = function (nums) {
  let arr = Array(len)
    .fill()
    .map((_, index) => index + 1);
  let set = new Set(nums);
  return arr.filter((i) => !set.has(i));
};
