/**
 * 编写一个程序，找到两个单链表相交的起始节点。
 */
var getIntersectionNode = function (headA, headB) {
  if (!headA || !headB) {
    return null;
  }

  let hashMap = new Map(); // 散列表查找

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
};



