// 定义node
import { Shape } from "@antv/x6";

export function getGraphOptions(opt) {
  return {
    container: opt.container,
    autoResize: true,
    background: {
      color: "#F2F7FA",
    },
    grid: {
      visible: true,
    },
    interacting: {
      nodeMovable: false,
    },
    scaling: {
      min: 0.5,
      max: 2,
    },
    panning: {
      enabled: true,
    },
    mousewheel: {
      enabled: true,
      factor: 1.05,
    },
    connecting: {
      router: "manhattan",
      connector: {
        name: "rounded",
        args: {
          radius: 8,
        },
      },
      anchor: "center",
      connectionPoint: "anchor",
    },
  };
}
