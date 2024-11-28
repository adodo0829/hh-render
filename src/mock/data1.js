export const arr1 = [
  { id: 2, pid: 0, name: "一级菜单B" },
  { id: 4, pid: 1, name: "二级菜单A-A" },
  { id: 9, pid: 7, name: "四级菜单A-A-A-A" },
  { id: 5, pid: 1, name: "二级菜单A-B" },
  { id: 6, pid: 2, name: "二级菜单B-A" },
  { id: 7, pid: 4, name: "三级菜单A-A-A" },
  { id: 8, pid: 6, name: "三级级菜单B-A-A" },
  { id: 10, pid: 3, name: "2级菜单C-A" },
  { id: 3, pid: 0, name: "一级菜单C" },
  { id: 1, pid: 0, name: "一级菜单A" },
];

export const nestTree = [
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
