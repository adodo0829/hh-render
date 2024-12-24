// 1.给定一个二叉树, 找到该树中两个指定节点的最近公共祖先
var lowestCommonAncestor = function (root, p, q) {
  // 分场景： 节点在同侧，节点不在同侧，依次遍历左右子树
  let hashMap = new Map();
  // 找节点：遍历查找, 先把节点对应的父节点dou存起来
  function dfs(node) {
    if (node.left) {
      // l child v => parentNode
      hashMap.set(node.left.val, node);
      dfs(node.left);
    }
    if (node.right) {
      // r child v
      hashMap.set(node.right.val, node);
      dfs(node.right);
    }
  }
  dfs(root);

  // 从节点p向上遍历parentNode
  let visitedNodeSet = new Set();
  while (p) {
    visitedNodeSet.add(p.val);
    p = hashMap.get(p.val);
  }

  while (q) {
    if (visitedNodeSet.has(q.val)) {
      return q;
    }
    q = hashMap.get(q.val);
  }
  return null;
};

/**
 * 2.给你一棵二叉树的根节点 root ，翻转这棵二叉树，并返回其根节点
 */
var invertTree = function (root) {
  // 递归边界
  if (root == null) {
    return root;
  }
  // 先交换左右儿子
  [root.left, root.right] = [root.right, root.left];
  invertTree(root.left); // 翻转左子树
  invertTree(root.right); // 翻转右子树
  // 后交换左子树 和 右子树
  // 递归到最末端节点, 从最底下开始交互
  //   let left = invertTree(root.left);
  //   let right = invertTree(root.right);
  //   root.left = right;
  //   root.right = left;
  return root;
};

/**
 * 3.给你一棵二叉树的根节点，返回该树的 直径 。
 * 二叉树的 直径 是指树中任意两个节点之间最长路径的 长度 。这条路径可能经过也可能不经过根节点 root 。
 * 两节点之间路径的 长度 由它们之间边数表示。
 *
 * 深度，节点的深度取决于它的祖先节点的数量。
 * 高度，树中所有节点深度的最大值。
 */
// 深度，节点的深度取决于它的祖先节点的数量。
let maxDepth = (root) => {
  // 访问到空节点了，返回0
  if (root == null) return 0;
  // 左子树为根的子树的的深度
  let leftMax = maxDepth(root.left);
  let rightMax = maxDepth(root.right);
  return 1 + Math.max(leftMax, rightMax);
};
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function (root) {
  // left最长深度 + right最长深度
  let depth = 0;
  function dfs(rootNode) {
    if (rootNode == null) {
      return 0;
    }
    // 递归，获取左子树的深度
    let leftDeep = dfs(rootNode.left);
    // 递归，获取右子树的深度
    let rightDeep = dfs(rootNode.right);
    depth = Math.max(depth, leftDeep + rightDeep);
    return Math.max(leftDeep, rightDeep) + 1;
  }
  dfs(root);
  return depth;
};
