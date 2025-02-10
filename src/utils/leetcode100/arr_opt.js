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
 * 盛最多水的容器
 * 给定一个长度为 n 的整数数组 height 。
 * 有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i])
 * 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
 * 返回容器可以储存的最大水量
 */

var maxArea = function (height) {
  let maxArea = 0;
  // maxArea = minY * (maxX - minX)
  // 两个因子变量：柱子高度 和 柱子间距
  let [i, j] = [0, height.length - 1];
  while (i < j) {
    let h1 = height[i];
    let h2 = height[j];
    let minH = Math.min(h1, h2);
    let currArea = minH * (j - i);
    maxArea = Math.max(currArea, maxArea);
    // 移动指针，谁的高度小就移动谁，目的是找大的高度
    if (h1 < h2) {
      i++;
    } else {
      j--;
    }
  }
  return maxArea;
};

/**
 * 给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，
 * 同时还满足 nums[i] + nums[j] + nums[k] == 0 。请你返回所有和为 0 且不重复的三元组
 */

var threeSum = function (nums) {
  let result = [];
  if (!nums || nums.length < 3) {
    return result;
  }
  nums.sort((a, b) => a - b); // 从小到大排序
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) {
      break;
    }
    if (i && nums[i] === nums[i - 1]) {
      // 重复值跳过
      continue;
    }
    let [l, r] = [i + 1, nums.length - 1];
    while (l < r) {
      const target = nums[i] + nums[l] + nums[r];
      if (target === 0) {
        let tempAns = [nums[i], nums[l], nums[r]]
        result.push(tempAns);
        // 需要对结果集去重, 过滤重复值指针
        while (l < r && nums[l] === nums[l + 1]) {
          l++;
        }
        while (l < r && nums[r] === nums[r - 1]) {
          r--;
        }
        l++;
        r--;
      } else if (target < 0) {
        l++;
      } else {
        r--;
      }
    }
  }

  return result;
};
