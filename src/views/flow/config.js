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
  {
    type: 40,
    code: "start",
    name: "开始节点",
  },
  {
    type: 50,
    code: "end",
    name: "结束节点",
  },
];

export const NodeCodeMap = NodeTypeList.reduce((acc, cur) => {
  return {
    ...acc,
    [cur.code]: cur.type,
  };
}, {});

export const NodeTypeMap = NodeTypeList.reduce((acc, cur) => {
  return {
    ...acc,
    [cur.type]: cur.code,
  };
}, {});

export const NodeType2NameMap = NodeTypeList.reduce((acc, cur) => {
  return {
    ...acc,
    [cur.type]: cur.name,
  };
}, {});

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

export const StartNodeConf = {
  width: 120,
  height: 48,
  label: "开始节点",
  inherit: "rect",
  attrs: {
    body: {
      strokeWidth: 1,
      stroke: "#d8d8d8",
      fill: "#FFFFFF",
      rx: 24,
      ry: 24,
    },
    text: {
      fontSize: 14,
      fill: "#000000",
    },
  },
  ports: {
    ...ports,
    items: [
      {
        group: "bottom",
      },
    ],
  },
};

export const EndNodeConf = {
  width: 120,
  height: 48,
  label: "结束节点",
  inherit: "rect",
  attrs: {
    body: {
      strokeWidth: 1,
      stroke: "#d8d8d8",
      fill: "#FFFFFF",
      rx: 20,
      ry: 26,
    },
    text: {
      fontSize: 14,
      fill: "#000000",
    },
  },
  ports: {
    ...ports,
    items: [
      {
        group: "top",
      },
    ],
  },
};

export const emptyNodeProps = {
  // 业务属性
  nodeType: undefined, // 10:bussiness, 20:branch, 30:delay
  nodeId: undefined,
  nodeAlias: "",
  executeParentStoresFlag: 0,
  executeThisStoresFlag: 0,
  ruleId: undefined,
  remark: "",
  pos: "", // node唯一key
  // 位置属性: 在最后提交的时候赋值
  // fromNodePosList: [], // source nodes
  // toNodePosList: [], // target nodes
  // toNoPos: undefined, // 当前节点为条件节点时有值
  // toYesPos: undefined, // 当前节点为条件节点时有值
};
