/**
 * 1.实现一个函数 getItemOfString, 查找字符串中出现最多的项
 * 输入：'aswfswawbsdaawdaw'
 * 返回一个统计对象，key为字符，value为出现次数 { a: 5 }
 */
const s = "aswfswawbswdaawdaw";
function getItemOfString(s) {}

/**
 * 实现报数序列
1.     1
2.     11 (1个1)
3.     21 （2个1）
4.     1211 （1个2，1个1）
5.     111221 （1个1,1个2,2个1）
*/
function calcSay(n) {
  let res = "1";
  if ((n = 1)) return res;
  let count = 1;
  for (let i = 1; i < n; i++) {
    // 重复的次数依赖上次结果, 遍历上一轮次的结果
    let temp = "";
    for (let j = 0; j < res.length; j++) {
      // 计算同一字符的个数 count
      if (res[j] === res[j + 1]) {
        count++;
      } else {
        // 如果不同就要计数了 count次res[j], count重计数
        temp = temp + `${count}${res[j]}`;
        count = 1;
      }
    }
    res = temp; // 读完, 更新报数目标
  }
  return res;
}

/*
编写一个函数来查找字符串数组中的最长公共前缀。如果不存在公共前缀，返回空字符串 `""`。
- **输入:** ["flower","flow","flight"] **输出:** "fl"
- **输入:** ["dog","racecar","car"] **输出:** ""
**/
let arr = ["flower", "flow", "flight"];
function longestCommonPrefix(arr) {
  let firstStr = arr[0];
  let res = "";
  // 所有项和第一项每个字符比较就完事了
  for (let i = 0; i < firstStr.length; i++) {
    let prefix = firstStr[i];
    for (let j = 1; j < arr.length; j++) {
      const str = arr[j];
      if (str[i] !== prefix) {
        return res;
      }
    }
    res = res + prefix;
  }

  return res;
}
