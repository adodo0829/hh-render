import { Graph, Shape } from "@antv/x6";

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
    scaling: {
      min: 0.5,
      max: 2,
    },
    panning: {
      enabled: true,
    },
    mousewheel: {
      enabled: true,
      factor: 1.1,
    },
    connecting: {
      allowBlank: false,
      allowEdge: false,
      allowMulti: false,
      allowLoop: false,
      allowNode: false,
      // 节点连接校验
      validateConnection(obj) {
        const { sourceCell, targetPort, sourcePort } = obj;
        const outgoingEdges = this.getOutgoingEdges(sourceCell);
        if (sourceCell.shape === "branch") {
          if (outgoingEdges.length > 2) {
            return false;
          }
        }
        return targetPort && targetPort !== sourcePort;
      },
      router: "manhattan",
      connector: {
        name: "rounded",
        args: {
          radius: 8,
        },
      },
      anchor: "center",
      connectionPoint: "anchor",
      snap: {
        radius: 10,
      },
      createEdge() {
        return new Shape.Edge({
          attrs: {
            line: {
              stroke: "#A2B1C3",
              strokeWidth: 2,
              targetMarker: {
                name: "block",
                width: 8,
                height: 8,
              },
            },
          },
          zIndex: 0,
        });
      },
    },
  };
}
