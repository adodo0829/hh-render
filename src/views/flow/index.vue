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
      <div class="flow-props" v-show="flowInfoVisible">
        <FlowProps />
      </div>
      <div class="node-props" v-show="nodeInfoVisible">节点属性</div>
    </div>
  </div>
</template>

<script>
import { Graph } from "@antv/x6";
import { Snapline } from "@antv/x6-plugin-snapline";
import { Selection } from "@antv/x6-plugin-selection";
import { Clipboard } from "@antv/x6-plugin-clipboard";
import { Keyboard } from "@antv/x6-plugin-keyboard";

import {
  NodeTypeList,
  BussinessNodeConf,
  BranchNodeConf,
  DelayNodeConf,
} from "./config";
import GraphUtil from "./utils";
import { getGraphOptions } from "./flow";
import FlowProps from "./flowProps.vue";

Graph.registerNode("bussiness", BussinessNodeConf, true);
Graph.registerNode("branch", BranchNodeConf, true);
Graph.registerNode("delay", DelayNodeConf, true);

let graphEngine = null;

export default {
  name: "xxx",
  components: {
    FlowProps,
  },
  data() {
    return {
      nodeRx: 0,
      nodeRy: 0,
      flowInfoVisible: true,
      nodeInfoVisible: false,
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
      const options = getGraphOptions({
        container: domContainer,
      });
      const graph = new Graph(options);
      graph.use(
        new Snapline({
          enabled: true,
        })
      );
      graph.use(
        new Selection({
          enabled: true,
          multiple: false,
          showNodeSelectionBox: true,
          pointerEvents: "none",
        })
      );
      graph.use(new Clipboard());
      graph.use(
        new Keyboard({
          enabled: true,
        })
      );
      graph.bindKey(["meta+c", "ctrl+c"], () => {
        const cells = graph.getSelectedCells();
        if (cells.length) {
          const cell = cells[0];
          const { shape } = cell;
          if (shape !== "edge") {
            graph.copy(cells);
          }
        }
        return false;
      });
      graph.bindKey(["meta+v", "ctrl+v"], () => {
        if (!graph.isClipboardEmpty()) {
          const cells = graph.paste({ offset: 32 });
          graph.cleanSelection();
          graph.select(cells);
        }
        return false;
      });
      graph.bindKey("backspace", () => {
        const cells = graph.getSelectedCells();
        if (cells.length) {
          graph.removeCells(cells);
        }
      });

      graphEngine = graph;
      graph.centerContent();

      // === add event system ===
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
      graph.on("node:click", () => {
        graph.getEdges().forEach((e) => {
          e.attr("line/stroke", "#A2B1C3");
        });
      });
      // 监听边的点击事件
      graph.on("edge:click", ({ edge }) => {
        graph.getEdges().forEach((e) => {
          e.attr("line/stroke", "#A2B1C3");
        });
        edge.attr("line/stroke", "#0062ff");
      });
      graph.on("blank:click", () => {
        graph.getEdges().forEach((e) => {
          e.attr("line/stroke", "#A2B1C3");
        });
      });
      // 为条件边添加标签
      graph.on("edge:connected", ({ edge }) => {
        const sourceNode = edge.getSourceNode();
        console.log("edge:connected sourceNode", sourceNode);
        if (sourceNode.shape === "branch") {
          const branchNodeEdges = graph.getOutgoingEdges(sourceNode);
          if (branchNodeEdges.length === 1) {
            edge.setData({ conditionInput: 1 });
          } else if (branchNodeEdges.length === 2) {
            const dataEdge = branchNodeEdges.filter((edge) => !!edge.data)[0];
            const noDataEdge = branchNodeEdges.filter((edge) => !edge.data)[0];
            if (dataEdge) {
              const { conditionInput } = dataEdge.data;
              noDataEdge.setData({
                conditionInput: conditionInput === 1 ? 0 : 1,
              });
            }
          }

          branchNodeEdges.forEach((item) => {
            const { data } = item;
            const { conditionInput } = data;
            edge.setLabels({
              attrs: {
                label: {
                  text: conditionInput ? " 是 " : " 否 ",
                  fill: conditionInput ? "#00c172" : "red",
                },
              },
              position: {
                distance: 0.5,
              },
            });
          });
        }
      });

      graph.on("node:selected", ({ node }) => {
        console.log("node:selected", node);
        // 获取数据，回填属性区
      });
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
      // console.log("rxy", this.nodeRx, this.nodeRy);
      const dx = Math.ceil(e.clientX - this.nodeRx);
      const dy = Math.ceil(e.clientY - this.nodeRy);
      // console.log("dxy", dx, dy);
      const p = graphEngine.clientToLocal(dx, dy);
      // console.log("gxy", p.x, p.y);
      const coverProps = {
        id: `node_${nodeType}_${Math.random()}`,
        x: p.x,
        y: p.y,
        // todo：添加业务data
      };
      graphEngine.addNode({
        ...coverProps,
        shape: nodeType,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./flow.scss";
</style>

<style lang="scss">
// reset x6
.x6-widget-selection-box {
  border: 2px dashed #0062ff;
}
</style>
