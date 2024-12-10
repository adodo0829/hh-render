// 线性查找是一种最简单的查找算法，它逐个检查数据结构中的每个元素，直到找到所需的元素或检查完所有元素为止
// 无序数组
function lineSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    const ele = arr[i];
    if (ele === target) {
      return i;
    }
  }
  return -1;
}

function getMax(arr) {
  let max = arr[0];
  for (let i = 0; i < arr.length; i++) {
    const ele = arr[i];
    if (ele > max) {
      max = ele;
    }
  }
  return max;
}

// 有序数组，二分查找
let arr = [1, 2, 3, 4, 5, 6, 7, 8];
function binarySearch(arr, target) {
  // 前后指针，夹逼原理
  let len = arr.length;
  let [l, r, midIdx] = [0, len - 1, null];

  while (l < r) {
    midIdx = Math.floor((l + r) / 2);
    if (target < arr[midIdx]) {
      // 值在左侧
      r = midIdx - 1;
    } else if (target > arr[midIdx]) {
      // 值在右侧
      l = midIdx + 1;
    } else {
      // 值正好在中间
      return midIdx;
    }
  }

  return -1;
}

// 散列表查找
function getIntersectionNode(headA, headB) {
  if (!headA || !headB) {
    return null;
  }

  let hashMap = new Map(); // 散列表存一遍a链表节点

  let tempA = headA;
  while (tempA) {
    hashMap.set(tempA, 1);
    tempA = tempA.next;
  }

  let tempB = headB;
  while (tempB) {
    if (hashMap.has(tempB)) {
      return tempB;
    }
    tempB = tempB.next;
  }
}
