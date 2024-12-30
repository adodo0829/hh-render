/**
 * 找到两个单链表相交的起始节点
 */
var getIntersectionNode = function (headA, headB) {
  // 遍历其中一个，遍历完后在另一条链表里继续找
  if (headA == null || headB == null) {
    return null;
  }

  let tempA = headA;
  // 把a的节点引用都存起来
  let map = new Map();
  while (tempA) {
    tempA = tempA.next;
    map.set(tempA, 1);
  }

  let tempB = headB;
  while (tempB) {
    if (map.has(tempB)) {
      return tempB;
    }
    tempB = tempB.next;
  }
  return null;
};

/**
 * 给你一个单链表的头节点 head,请你判断该链表是否为回文链表。
 * 如果是，返回 true ；否则，返回 false
 * 输入：head = [1,2,2,1]
 * 输出：true
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
// 回文的特征（规律）是什么？
// 对称？确定使用双指针夹闭
// 需要转成数组来操作
var isPalindrome = function (head) {
  let valList = [];
  while (head !== null) {
    // 复制链表值到数组列表中。
    valList.push(head.val);
    head = head.next;
  }
  // 知道了长度可以用双指针遍历
  let [i, j] = [0, valList.length - 1];
  // 使用双指针法判断是否为回文
  while (i < j) {
    if (valList[i] === valList[j]) {
      i++;
      j--;
    } else {
      return false;
    }
  }

  return true;
};

/**
 * 给你一个链表的头节点 head ，判断链表中是否有环
 */
var hasCycle = function (head) {
  if (head === null) {
    return false;
  }
  // 有环必然是next指向了之前的节点
  let set = new Set();
  while (head) {
    set.add(head);
    let nextNode = head.next;
    if (set.has(nextNode)) {
      return true;
    }
    head = nextNode;
  }
  return false;
  // 方法2：快慢指针
};
