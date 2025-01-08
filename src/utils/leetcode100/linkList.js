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

/**
 * 给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。
 * 输入：l1 = [2,4,3], l2 = [5,6,4],输出：[7,0,8]
 * 输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9],输出：[8,9,9,9,0,0,0,1]
 */
var addTwoNumbers = function (l1, l2) {
  // 保留进位符1，往后加，最后进位要创建新节点
  // 创建一个哨兵节点（temp node），当成初始的「空链表」。
  // 循环结束后，哨兵节点的下一个节点就是最终要返回的链表头节点
  let tempNode = new ListNode();
  let curr = tempNode;
  let sum = 0;
  // 遍历链表
  while (l1 || l2 || sum) {
    // 如果l1有值
    if (l1) {
      sum = sum + l1.val;
      l1 = l1.next;
    }
    // 如果l2有值
    if (l2) {
      sum = sum + l2.val;
      l2 = l2.next;
    }
    // 计算本次的总和，个位数作为新链表节点的值
    let nodeVal = sum % 10; // 取新节点值
    let newNode = new ListNode(nodeVal);
    curr.next = newNode;
    curr = curr.next;
    sum = Math.floor(sum / 10); // 取进位值
  }
  return tempNode.next;
};
