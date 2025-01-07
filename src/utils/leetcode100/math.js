// 数学逻辑类

// 异或运算是将两个数的二进制形式对位数进行判断运算
// 不同数值结果为1，否则为0
// 异或运算满足交换律 a⊕b=b⊕a
// 任何数和0做异或运算，结果是自身：即 x ^ 0 = x。例如，5（101） ^ 0 = 5（101）。
// 任何数和其自身做异或运算，结果是0：即 x ^ x = 0。例如，5（101） ^ 5（101） = 0。

/**
 * 两个整数之间的 汉明距离 指的是这两个数字对应二进制位不同的位置的数目。
 * 给你两个整数 x 和 y，计算并返回它们之间的汉明距离。
 */
var hammingDistance = function (x, y) {
  let temp = x ^ y;
  temp = temp.toString(2);
  let count = 0;
  for (let i = 0; i < temp.length; i++) {
    const item = temp[i];
    if (item === "1") {
      count++;
    }
  }
  return count;
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

  let res = 0;
  for (let i = 0; i < nums.length; i++) {
    res = res ^ nums[i];
  }
  return res;
};
