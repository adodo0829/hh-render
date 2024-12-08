// 1.顺序遍历
// for循环， while循环

for (let i = 0; i < 10; i++) {
  // console.log(i);
}

let i = 0;
while (i < 10) {
  // console.log(i);
  i++;
}

// 用于遍历对象的属性
const obj = { a: 1 };
for (const k in obj) {
  if (obj.hasOwnProperty(k)) {
    // console.log(k);
  }
  //   if (Object.prototype.hasOwnProperty.call(obj, k)) {
  //   }
}

// for ...of 遍历可迭代对象
// 用于遍历可迭代对象（如数组、字符串、Map、Set等）的值。
let arr = [1, 2, 3, { a: 1 }];
for (let v of arr) {
  // console.log(v);
}

/**
 * 深度优先遍历
 * 从某个顶点出发，首先访问这个顶点，然后找出刚访问这个结点的第一个未被访问的邻结点，然后再以此邻结点为顶点，继续找它的下一个顶点进行访问。
 * 重复此步骤，直至所有结点都被访问完为止。
 */

// 递归方式
function deepTravser1(node) {
  let nodeList = [];
  if (node) {
    nodeList.push(node);
    let childNodes = node.children;
    for (let i = 0; i < childNodes.length; i++) {
      const cNode = childNodes[i];
      deepTravser1(cNode);
    }
  }
  return nodeList;
}
// 循环的方式
function deepTravser2(node) {
  let tempNodes = [];
  if (node) {
    let stack = []; // 存放将来要访问的节点
    stack.push(node);
    while (stack.length) {
      let currNode = stack.pop(); // 正在访问的节点
      tempNodes.push(currNode);
      // 其余节点
      let childNodes = currNode.children;
      // for (let i = 0; i < childNodes.length; i++) {
      // 访问顺序不一样而已，先左侧子节点 还是 右侧子节点
      for (let i = childNodes.length - 1; i >= 0; i--) {
        const cNode = childNodes[i];
        stack.push(cNode);
      }
    }
  }

  return tempNodes;
}

/**
 * 广度优先遍历
 * 从根节点出发，一层一层的从上向下访问，同层节点从左往右访问，直到所有的节点都被访问到为止。
 */

// 递归写法, 不好用
// function wideTravser1(node) {
//   let tempNodes = [];
//   let idx = 0;
//   if (node) {
//     tempNodes.push(node);
//     wideTravser1(node.leftChildren);
//     node = tempNodes[idx++];
//     wideTravser1(node.rightChildren);
//   }

//   return tempNodes;
// }

function wideTravser(node) {
  let nodeList = [];
  let i = 0;

  while (node) {
    nodeList.push(node);
    node = nodeList[i];
    let childNodes = node.children;
    for (let j = 0; j < childNodes.length; j++) {
      const ele = childNodes[j];
      nodeList.push(ele);
    }

    i++;
  }

  return nodeList;
}

// 深度遍历广度遍历的区别？
// 1.深度优先不需要记住所有的节点, 所以占用空间小, 而广度优先需要先记录所有的节点占用空间大;
// 2.深度优先有回溯的操作(没有路走了需要回头), 所以相对而言时间会长一点
// 3.深度优先采用的是堆栈的形式, 即先进后出;  广度优先则采用的是队列的形式, 即先进先出