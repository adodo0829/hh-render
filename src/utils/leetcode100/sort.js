// 排序系列

/**
 * 给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。
 * 你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素
 * 考察 堆排序
 * 堆是一种数据结构，通常可看成一棵树的数组
 * 先构造最大堆，然后将最大的数（数组第一个节点）与数组最后一个节点进行 k 次交换
 * （每次交换过后，要调整堆以维护其最大堆性质，且在这个调整过程中，不包含刚才的最后一个节点，最后将最后一个节点前移），
 * 则倒数第 k 个元素则为要求的第 k 个最大元素
 */

function quickSort(arr) {
  // 分左右数组，按基准排，组成新数组
  if (arr.length <= 1) {
    return arr;
  }

  let [leftArr, rightArr, pv] = [[], [], arr[0]];
  for (let i = 1; i < arr.length; i++) {
    const num = arr[i];
    if (num > pv) {
      leftArr.push(num);
    } else {
      rightArr.push(num);
    }
  }

  let res = [].concat(quickSort(leftArr), pv, quickSort(rightArr));
  return res;
}

// 插入排序
function insertSort(arr, left, right) {
  let temp, j;
  for (let i = left + 1; i <= right; i++) {
    temp = arr[i];
    j = i - 1;
    while (j >= left && arr[j] > temp) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = temp;
  }
  return ((right - left) >> 1) + left;
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

var findKthLargest = function (nums, k) {
  return quickSort(nums)[k - 1];
};
