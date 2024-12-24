// dynamic process 动态规划系列

// 1.在一个由 '0' 和 '1' 组成的二维矩阵内，找到只包含 '1' 的最大正方形，并返回其面积
// 正方形的特点，宽高相等
// 遍历扫描一遍矩阵，有相邻1的先记住位置 和 边长，如果满足先计算，如不满足继续往后遍历
// 假设当matrix[i][j] === "1"时，说明以i,j为右下点的正方有可能满足题意，那么组成正方形需要哪些坐标？
// dp[i-1][j-1] dp[i-1][j] dp[i][j-1] 三者； 用已经遍历过的节点来组装
/**
 * @param {character[][]} matrix
 * @return {number}
 */

var maximalSquare = function (matrix) {
  let w = matrix[0].length; // 宽
  let h = matrix.length; // 高
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
