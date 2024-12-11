/**
 * 1.编写一个程序，找到两个单链表相交的起始节点。
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

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * 给定一个二叉树, 找到该树中两个指定节点的最近公共祖先
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  // 找节点：遍历查找
  // 分场景： 节点在同侧，节点不在同侧

  let pNodeMap = new Map();
  let hasVisitedSet = new Set();

  function dfs(root) {
    if (root.left !== null) {
      pNodeMap.set(root.left.val, root);
      dfs(root.left);
    }

    if (root.right !== null) {
      pNodeMap.set(root.right.val, root);
      dfs(root.right);
    }
  }

  dfs(root);

  while (p != null) {
    hasVisitedSet.add(p.val);
    p = pNodeMap.get(p.val);
  }

  while (q != null) {
    if (hasVisitedSet.has(q.val)) {
      return q;
    }
    q = pNodeMap.get(q.val);
  }

  return null;
};
