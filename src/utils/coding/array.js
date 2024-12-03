let nestArray = [
  {
    id: 1,
    title: "节点1",
    children: [
      {
        id: 11,
        title: "节点11",
        children: [
          {
            id: 111,
            title: "节点111",
            children: [],
          },
        ],
      },
      {
        id: 12,
        title: "节点12",
        children: [],
      },
    ],
  },
  {
    id: 2,
    title: "节点2",
    children: [
      {
        id: 21,
        title: "节点21",
        children: [],
      },
      {
        id: 22,
        title: "节点22",
        children: [],
      },
    ],
  },
];

// 提取出嵌套数据id为奇数的节点， 返回一个由于节点title组成的新数组
// 1.递归方式实现
function getOddNodesByRecursion(tree, res = []) {}
// 2.循环方式实现
function getOddNodesByTraversal(tree, res = []) {}

const flatArr = [
  { id: 1, pid: 0, name: "一级菜单A" },
  { id: 2, pid: 0, name: "一级菜单B" },
  { id: 3, pid: 0, name: "一级菜单C" },
  { id: 4, pid: 1, name: "二级菜单A-A" },
  { id: 5, pid: 1, name: "二级菜单A-B" },
  { id: 6, pid: 2, name: "二级菜单B-A" },
  { id: 7, pid: 4, name: "三级菜单A-A-A" },
  { id: 8, pid: 7, name: "四级菜单A-A-A-A" },
  { id: 9, pid: 8, name: "五级菜单A-A-A-A-A" },
  { id: 10, pid: 9, name: "六级菜单A-A-A-A-A-A" },
];
// 按照id和pid的依赖关系转成如下树形结构
const treeArr = [
  {
    id: 1,
    pid: 0,
    name: "xxx",
    children: [{ id: 4, pid: 1, name: "二级菜单A-A", children: [] }],
  },
];
