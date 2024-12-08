let arr = [4, 333, 1, 2, 7, 10, 223, 122, 34];
let arr1 = [4, 3, 1, 222, 7, 10, 223, 122, 34];
let arr2 = [4, 3, 111, 2, 7, 10, 223, 122, 34];

// 1.冒泡排序是一种交换排序，基本思想是：两两比较相邻记录的关键字，如果反序则交换，直到没有反序的记录为止。
// 一轮对比，两两比较，把大往后放, 需要len-1轮对比
function bubleSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length; j++) {
      let t1 = arr[j];
      let t2 = arr[j + 1];
      if (t1 > t2) {
        // 大的靠后，小得靠前
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  console.log("bbbb", arr);
  return arr;
}

// 优化，对比轮次缩减
function bubleSort(arr) {
  let i = arr.length - 1; // 缩小下一轮需要冒泡的数组的范围, 每一轮都是找最大的

  while (i > 0) {
    let pos = 0;
    for (let j = 0; j < arr.length; j++) {
      let t1 = arr[j];
      let t2 = arr[j + 1];
      if (t1 > t2) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        pos = j;
      }
    }
    i = pos;
  }

  return arr;
}

bubleSort(arr);

// 2.快速排序的基本思想是：
// 通过一趟排序将待排记录分割成独立的两部分，其中一部分记录的元素均比另一部分记录的元素小，继而再分别对这两部分记录递归的进行同样的排序操作。
// 怎么分割：设置基准值； 把数组中第一个元素当做一个基准值，称为“基准”（Pivot）
// 重新排序数列，把所有比基准值小的元素摆放在基准前面，所有比基准值大元素摆放在基准后面。
// 在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作；
// 递归地把小于基准值元素的子数列和大于基准值元素的子数列排序

// ## **分区（Partition）思路**
// 首先把未排序数组的第一个（最左边）元素设置为基准，把它的位置叫做 `l` ：

function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  let [leftList, rightList, pv] = [[], [], arr[0]];

  for (let i = 1; i < arr.length; i++) {
    const item = arr[i];
    if (item < pv) {
      leftList.push(item);
    } else {
      rightList.push(item);
    }
  }

  let res = [].concat(quickSort(leftList), pv, quickSort(rightList));
  return res;
}

console.log("qqqq", quickSort(arr1));

// 归并排序
// 利用归并的思想实现的排序方法，该算法采用经典的分治策略
// （分治法将问题分成一些小的问题然后递归求解，而治的阶段则将分的阶段得到的各答案"修补"在一起，即分而治之)。

function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  // 先拆
  let len = arr.length;
  let midIdx = Math.floor(len / 2);
  let leftArr = arr.slice(0, midIdx);
  let rightArr = arr.slice(midIdx);

  let l = mergeSort(leftArr);
  let r = mergeSort(rightArr);

  // 后合
  return mergeArr(l, r);
}

// 最小粒度的数组都是1位
function mergeArr(l, r) {
  let res = [];

  // 两边的起始元素相互比较，始终将小的一方的头元素弹出，并push到准备好的容器result中
  while (l.length && r.length) {
    if (l[0] <= r[0]) {
      res.push(l.shift());
    } else {
      res.push(r.shift());
    }
  }

  //   只有左侧有值时
  while (l.length) {
    res.push(l.shift());
  }
  //   只有右侧有值时
  while (r.length) {
    res.push(r.shift());
  }

  return res;
}

console.log("mmm", mergeSort(arr2));
