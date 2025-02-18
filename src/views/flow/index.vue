<template>
  <div class="flow">
    <!-- 物料节点区 -->
    <div class="left">
      <h3>节点物料区</h3>
      <div class="node-wrapper" @dragstart="onNodeDragStart">
        <div
          draggable
          class="drag-node"
          v-for="item in nodeTypeList"
          :class="item.code"
          :key="item.code"
          :data-type="item.code"
          @mousedown="onNodeTypClick"
        >
          {{ item.name }}
        </div>
      </div>
    </div>

    <!-- 画布渲染区 -->
    <div class="center">
      <main ref="canvas-wrapper" @dragover="onNodeDragOver" @drop="onNodeDrop">
        <div id="flow-canvas" ref="canvas"></div>
      </main>
    </div>

    <!-- 元素属性区 -->
    <div class="right">
      <h3>属性编辑区</h3>
    </div>
  </div>
</template>

<script>
import { Graph, Shape } from "@antv/x6";
import {
  NodeTypeList,
  BussinessNodeConf,
  BranchNodeConf,
  DelayNodeConf,
} from "./config";
import GraphUtil from "./utils";

Graph.registerNode("bussiness", BussinessNodeConf, true);
Graph.registerNode("branch", BranchNodeConf, true);
Graph.registerNode("delay", DelayNodeConf, true);

let graphEngine = null;

export default {
  name: "xxx",
  components: {},
  data() {
    return {
      nodeRx: 0,
      nodeRy: 0,
    };
  },
  computed: {
    nodeTypeList() {
      return NodeTypeList;
    },
  },
  mounted() {
    this.initGraph();
  },
  methods: {
    initGraph() {
      if (graphEngine) graphEngine.dispose();
      const domContainer = this.$refs.canvas;
      const options = {
        container: domContainer,
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
          validateConnection(obj) {
            return obj.targetPort && obj.targetPort !== obj.sourcePort;
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
      const graph = new Graph(options);
      // add event system
      graph.on("node:mouseenter", () => {
        const container = this.$refs.canvas;
        const ports = container.querySelectorAll(".x6-port-body");
        GraphUtil.showPorts(ports, true);
      });
      graph.on("node:mouseleave", () => {
        const container = this.$refs.canvas;
        const ports = container.querySelectorAll(".x6-port-body");
        GraphUtil.showPorts(ports, false);
      });
      graphEngine = graph;
      graph.centerContent();
    },

    onNodeTypClick(e) {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const rect = e.target.getBoundingClientRect();
      const rx = Math.ceil(mouseX - rect.left);
      const ry = Math.ceil(mouseY - rect.top);
      this.nodeRx = rx;
      this.nodeRy = ry;
    },

    onNodeDragStart(e) {
      const nodeType = e.target.dataset.type;
      e.dataTransfer.setData("NodeType", nodeType);
    },
    onNodeDragOver(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    },
    onNodeDrop(e) {
      e.preventDefault();
      e.stopPropagation();
      const nodeType = e.dataTransfer.getData("NodeType");
      console.log("rxy", this.nodeRx, this.nodeRy);
      const dx = Math.ceil(e.clientX - this.nodeRx);
      const dy = Math.ceil(e.clientY - this.nodeRy);
      console.log("dxy", dx, dy);
      const p = graphEngine.clientToLocal(dx, dy);
      console.log("gxy", p.x, p.y);
      const coverProps = {
        id: `${nodeType}_${Math.random()}`,
        x: p.x,
        y: p.y,
        // todo：添加业务data
      };
      graphEngine.addNode({
        ...coverProps,
        shape: nodeType,
      });

      console.log("gIns", graphEngine);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./flow.scss";
</style>
