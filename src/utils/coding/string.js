/**
 * 1.实现一个函数 getItemOfString, 查找字符串中出现最多的项
 * 输入：'aswfswawbsdaawdaw'
 * 返回一个统计对象，key为字符，value为出现次数 { a: 5 }
 */
const s = "aswfswawbswdaawdaw";
function getItemOfString(s) {
  let hash = Object.create(null);
  for (const char of s) {
    hash[char] = (hash[char] || 0) + 1;
  }
  let [maxChar, maxCount] = ["", 0];
  Object.entries(hash).forEach((item) => {
    const char = item[0];
    const count = item[1];
    if (count > maxCount) {
      maxChar = char;
      maxCount = count;
    }
  });
  return {
    [maxChar]: maxCount,
  };
}

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

/**
 * 给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1。
- s = "leetcode" 返回 0.
- s = "loveleetcode" 返回 2.
 */
var str = "leetcode";
function firstUniqChar(str) {
  for (let i = 0; i < str.length; i++) {
    let curChar = str[i];
    // 唯一： 索引一致
    if (str.lastIndexOf(curChar) === str.indexOf(curChar)) {
      return i;
    }
  }
  return -1;
}
console.log(firstUniqChar(str));

/**
 * 实现 String.prototype.indexOf
 */
function myIndexOf(source, target) {
  if (source.length < target.length) return -1;
  for (let i = 0; i < source.length; i++) {
    // 切片对比
    let splitChar = source.slice(i, i + target.length);
    if (splitChar === s) {
      return i;
    }
  }
  return -1;
}

/**
 * 字符串的大小写取反（大写变小写小写变大写），例如 ’AbC' 变成 'aBc'
 */

function transformStr(str) {
  let tempArr = str.split("");
  let result = tempArr.map((char) => {
    return char === char.toUpperCase()
      ? char.toLowerCase()
      : char.toUpperCase();
  });
  return result.join("");
}
