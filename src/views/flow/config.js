export const NodeTypeList = [
  {
    type: 10,
    code: "bussiness",
    name: "业务节点",
  },
  {
    type: 20,
    code: "branch",
    name: "条件节点",
  },
  {
    type: 30,
    code: "delay",
    name: "延迟节点",
  },
];

// 连接桩
const portR = 4;

const ports = {
  // 连接桩分组
  groups: {
    top: {
      position: "top",
      attrs: {
        circle: {
          r: portR,
          magnet: true,
          stroke: "#5F95FF",
          strokeWidth: 1,
          fill: "#fff",
          style: {
            visibility: "hidden",
          },
        },
      },
    },
    right: {
      position: "right",
      attrs: {
        circle: {
          r: portR,
          magnet: true,
          stroke: "#5F95FF",
          strokeWidth: 1,
          fill: "#fff",
          style: {
            visibility: "hidden",
          },
        },
      },
    },
    bottom: {
      position: "bottom",
      attrs: {
        circle: {
          r: portR,
          magnet: true,
          stroke: "#5F95FF",
          strokeWidth: 1,
          fill: "#fff",
          style: {
            visibility: "hidden",
          },
        },
      },
    },
    left: {
      position: "left",
      attrs: {
        circle: {
          r: portR,
          magnet: true,
          stroke: "#5F95FF",
          strokeWidth: 1,
          fill: "#fff",
          style: {
            visibility: "hidden",
          },
        },
      },
    },
  },
  // 连接桩定义
  items: [
    {
      group: "top",
    },
    {
      group: "right",
    },
    {
      group: "bottom",
    },
    {
      group: "left",
    },
  ],
};

export const BussinessNodeConf = {
  width: 200,
  height: 60,
  label: "业务节点",
  inherit: "rect",
  attrs: {
    body: {
      strokeWidth: 1,
      stroke: "#d8d8d8",
      fill: "#FFFFFF",
    },
    text: {
      fontSize: 14,
      fill: "#0062ff",
    },
  },
  ports: { ...ports },
};
export const BranchNodeConf = {
  label: "条件节点",
  inherit: "rect",
  width: 200,
  height: 60,
  attrs: {
    body: {
      strokeWidth: 1,
      stroke: "#d8d8d8",
      fill: "#FFFFFF",
    },
    text: {
      fontSize: 14,
      fill: "#ffac00",
    },
  },
  ports: {
    ...ports,
    items: [
      {
        group: "top",
      },
      {
        group: "bottom",
      },
    ],
  },
};
export const DelayNodeConf = {
  label: "延迟节点",
  inherit: "rect",
  width: 200,
  height: 60,
  attrs: {
    body: {
      strokeWidth: 1,
      stroke: "#d8d8d8",
      fill: "#FFFFFF",
    },
    text: {
      fontSize: 14,
      fill: "#905fe9",
    },
  },
  ports: {
    ...ports,
    items: [
      {
        group: "top",
      },
      {
        group: "bottom",
      },
    ],
  },
};
