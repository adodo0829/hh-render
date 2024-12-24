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
