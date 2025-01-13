/**
 * 给定一个字符串 s ，请你找出其中不含有重复字符的最长子串的长度。
 */
var lengthOfLongestSubstring = function (s) {
  // 1.查找 2.子串字符不重复
  // 1.暴力for循环，记录maxLen
  // 双指针，一个指针扫描整个串，一个指针扫描 最长子串

  let l = -1;
  let res = 0;
  const map = new Map();

  for (let r = 0; r < s.length; r++) {
    const currChar = s[i];

    if (map.has(currChar)) {
      let prevIdx = map.get(currChar);
      //   取最大值，保证窗口不包含重复字符
      l = Math.max(prevIdx, l);
    }

    map.set(currChar, r);
    res = Math.max(res, r - l);
  }

  return res;
};
