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
 * 给你一个 非空 整数数组 nums ，除了某个元素只出现一次以外，其余每个元素均出现两次。
 * 找出那个只出现了一次的元素
 * 你必须设计并实现线性时间复杂度的算法来解决此问题，且该算法只使用常量额外空间
 */
var singleNumber = function (nums) {
  if (nums.length === 1) {
    return nums[0];
  }
  // 异或运算满足交换律 a⊕b=b⊕a
  // 任何数和0做异或运算，结果是自身，即 x ^ 0 = x。例如，5（101） ^ 0 = 5（101）。
  // 任何数和其自身做异或运算，结果是0，即 x ^ x = 0。例如，5（101） ^ 5（101） = 0。
  let res = 0;
  for (let i = 0; i < nums.length; i++) {
    res = res ^ nums[i];
  }
  return res;
};
