/**
 * 1.编写一个程序，找到两个单链表相交的起始节点。
 */
var getIntersectionNode = function (headA, headB) {
  if (!headA || !headB) {
    return null;
  }

  let hashMap = new Map(); // 散列表查找,存节点

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
 * 2.给定一个二叉树, 找到该树中两个指定节点的最近公共祖先
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

/**
 * 3.给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。如果是，返回 true ；否则，返回 false
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
// 对称？
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
 * 4.给你一棵二叉树的根节点 root ，翻转这棵二叉树，并返回其根节点
 * 输入：root = [4,2,7,1,3,6,9]
 * 输出：[4,7,2,9,6,3,1]
 */

var invertTree = function (root) {
  // 递归边界
  if (root == null) {
    return root;
  }

  // [root.left, root.right] = [root.right, root.left]; // 先交换左右儿子
  // invertTree(root.left); // 翻转左子树
  // invertTree(root.right); // 翻转右子树

  // 后交换左子树 和 右子树
  // 递归到最末端节点, 从最底下开始交互
  let left = invertTree(root.left);
  let right = invertTree(root.right);

  root.left = right;
  root.right = left;

  return root;
};

// 5.在一个由 '0' 和 '1' 组成的二维矩阵内，找到只包含 '1' 的最大正方形，并返回其面积
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function (matrix) {
  // 正方形的特点，宽高相等
  // 遍历扫描一遍矩阵，有相邻1的先记住位置 和 边长，如果满足先计算，如不满足继续往后遍历
  // 假设当matrix[i][j] === "1"时，说明以i,j为右下点的正方有可能满足题意，那么组成正方形需要哪些坐标？
  // dp[i-1][j-1] dp[i-1][j] dp[i][j-1] 三者； 用已经遍历过的节点来组装

  let h = matrix.length; // 高
  let w = matrix[0].length; // 宽
  let dp = matrix;

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      dp[i][j] = +matrix[i][j];
    }
  }

  let area = 0;
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      let temp = dp[i][j];
      if (temp === 1 && i !== 0 && j !== 0) {
        // 计算面积, dp记录面积
        let minArea = Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
        let tempArea = (Math.sqrt(minArea) + 1) * (Math.sqrt(minArea) + 1);
        dp[i][j] = tempArea;
      }
      area = Math.max(area, dp[i][j]);
    }
  }

  return area;
};
