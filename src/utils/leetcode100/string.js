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

/**
 * 给你一个字符串 s，找到 s 中最长的 回文子串
 */
function isPalindrome(str) {
  var len = str.length;
  var middle = parseInt(len / 2);
  for (var i = 0; i < middle; i++) {
    if (str[i] != str[len - i - 1]) {
      return false;
    }
  }
  return true;
}

var longestPalindrome = function (s) {
  // 遍历整个数组，找到连续一样的子字符串，然后逐位向两侧扩展，直到两侧不一致即可
  if (!s || s.length <= 1) {
    return s;
  }

  let [strIdx, strLen, n] = [-1, 0, s.length];

  for (let i = 0; i < n; i++) {
    let currLen = 1; // 当前子串长度
    let l = i - 1; //左侧开始遍历的指针
    while (s[i] === s[i + 1]) {
      currLen++;
      i++;
    }
    let r = i + 1; // 获取右侧开始遍历的指针
    while (s[l] === s[r] && s[l] !== undefined) {
      // 从连续字符两端开始像两侧扩展,直到越界或者不一致,一致的直接累积到当前长度中,修改左右指针
      currLen += 2;
      l--;
      r++;
    }

    if (currLen > strLen) {
      strLen = currLen;
      strIdx = l + 1;
    }
  }

  return s.slice(strIdx, strIdx + strLen);
};
