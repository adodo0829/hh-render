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
// let maxDepth = (root) => {
//   // 访问到空节点了，返回0
//   if (root == null) return 0;
//   // 左子树为根的子树的的深度
//   let leftMax = maxDepth(root.left);
//   let rightMax = maxDepth(root.right);
//   return 1 + Math.max(leftMax, rightMax);
// };
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

/**
 * 给定一个二叉树的根节点 root ，返回 它的 中序 遍历
 * 按照 左子树——根节点——右子树的 顺序
 */
var inorderTraversal = function (root) {
  let res = [];
  function recursion(treeNode) {
    if (node != null) {
      recursion(treeNode.left);
      res.push(treeNode.val);
      recursion(treeNode.right);
    }
  }
  recursion(root);
  return res;
};
var inorderTraversal = function (root) {
  const res = [];
  const stk = [];
  while (root || stk.length) {
    while (root) {
      stk.push(root); // stack存储完left节点， root在zhan底
      root = root.left;
    }
    root = stk.pop(); // zhan顶 弹出left节点
    res.push(root.val);
    root = root.right;
  }
  return res;
};

/**
 * 一个树是对称的，那么，它的左右子树是镜像对称的
 * 根节点的值相同
 * 一个树的右子树，和另一个树的左子树镜像对称
 */

// bfs实现
// 维护一个队列，起初，根节点（如果存在）的左右子树入列
// 每次出列一对节点，考察它们俩是否对称
// 如果不对称，那整个树就不对称，结束BFS，如果对称，则下一对节点入列
// 一个为 null 一个不为 null，直接返回 false; 都存在，但 root 值不同，直接返回 false
// 左子树的左子树，右子树的右子树，入列; 左子树的右子树，右子树的左子树
var isSymmetric = function (root) {
  if (!root) {
    return true;
  }

  let queue = [];
  // 初始值
  queue.push(root.left, root.right);
  // 队列循环
  while (queue.length) {
    // 需要节点索引，当前层节点总数
    const nodeCount = queue.length;
    for (let i = 0; i < nodeCount; i += 2) {
      // 当前层的节点成对出列
      const left = queue.shift();
      const right = queue.shift();
      // 左右只存在一个
      if ((left && right == null) || (left == null && right)) {
        return false;
      }
      // 左右都存在
      if (left && right) {
        if (left.val != right.val) {
          // 节点值不同，不对称
          return false;
        }
        queue.push(left.left, right.right); // 推入下一层的一对节点
        queue.push(left.right, right.left); // 推入下一层的一对节点
      }
    }
  }

  return true;
};

/**
 * 给定一个二叉树 root ，返回其最大深度
 * 二叉树的 最大深度 是指从根节点到最远叶子节点的最长路径上的节点数。
 */

var maxDepth = function (root) {
  if (!root) {
    return 0;
  }
  let leftCount = maxDepth(root.left);
  let rightCount = maxDepth(root.right);
  let level = Math.max(leftCount, rightCount) + 1;
  return level;
};
// 广度优先搜索的队列里存放的是「当前层的所有节点」
var maxDepth = function (root) {
  if (!root) return 0;
  let queue = [root];
  let depth = 0;
  while (queue.length) {
    let len = queue.length;
    while (len > 0) {
      const node = queue.shift();
      if (node.left != null) {
        queue.push(node.left);
      }
      if (node.right != null) {
        queue.push(node.right);
      }
      len--;
    }
    depth++;
  }

  return depth;
};
