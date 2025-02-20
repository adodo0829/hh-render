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
      <div class="node-props" v-show="nodeInfoVisible">
        <h4>节点属性配置</h4>
        <el-form
          ref="nodeForm"
          :model="nodeForm"
          :rules="rules"
          label-width="100px"
        >
          <el-form-item label="节点类型" prop="nodeType">
            <span>{{ nodeForm.nodeType }}</span>
          </el-form-item>

          <el-form-item label="节点名称" prop="nodeId">
            <el-select v-model="nodeForm.nodeId" placeholder="请选择">
              <el-option label="功能节点1" value="111"></el-option>
              <el-option label="功能节点2" value="222"></el-option>
              <el-option label="功能节点3" value="333"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="节点别名" prop="nodeAlias">
            <el-input v-model.trim="nodeForm.nodeAlias"></el-input>
          </el-form-item>

          <el-form-item label="执行上级库存" prop="executeParentStoresFlag">
            <el-switch
              v-model="nodeForm.executeParentStoresFlag"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </el-form-item>

          <el-form-item label="执行本级库存" prop="executeThisStoresFlag">
            <el-switch
              v-model="nodeForm.executeThisStoresFlag"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </el-form-item>

          <el-form-item label="规则应用" prop="ruleId">
            <el-select v-model="nodeForm.ruleId" placeholder="请选择">
              <el-option label="规则1" value="111"></el-option>
              <el-option label="规则2" value="222"></el-option>
              <el-option label="规则3" value="333"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="节点备注" prop="remark">
            <el-input type="textarea" v-model.trim="nodeForm.remark"></el-input>
          </el-form-item>
        </el-form>

        <el-row>
          <el-button @click="onNodeEditCancel">取消</el-button>
          <el-button @click="onNodeEditSubmit" type="primary">确认</el-button>
        </el-row>
      </div>
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
  NodeCodeMap,
  NodeTypeMap,
  BussinessNodeConf,
  BranchNodeConf,
  DelayNodeConf,
  emptyNodeProps,
} from "./config";
import GraphUtil from "./utils";
import { getGraphOptions } from "./flow";
import FlowProps from "./flowProps.vue";
import { cloneDeep } from "lodash";

Graph.registerNode("bussiness", BussinessNodeConf, true);
Graph.registerNode("branch", BranchNodeConf, true);
Graph.registerNode("delay", DelayNodeConf, true);

let graphEngine = null;

export default {
  name: "Flow",
  components: {
    FlowProps,
  },
  data() {
    return {
      rules: {
        nodeId: [
          { required: true, message: "请选择节点名称", trigger: "change" },
        ],
        nodeAlias: [
          { required: true, message: "请输入节点别名", trigger: "blur" },
        ],
      },
      nodeRx: 0,
      nodeRy: 0,
      flowInfoVisible: true,
      nodeInfoVisible: false,
      nodeForm: {
        nodeType: undefined,
        nodeId: undefined,
        nodeAlias: "",
        executeParentStoresFlag: 0,
        executeThisStoresFlag: 0,
        ruleId: undefined,
        remark: "",
      },
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
          const oldNode = cells[0];
          const { data } = oldNode;
          const nodePos = oldNode.position();
          console.log("oldNode", nodePos);
          graph.removeCell(oldNode);
          const newId = GraphUtil.genNodeId(NodeTypeMap[data.nodeType]);
          const newNode = {
            id: newId,
            x: nodePos.x,
            y: nodePos.y,
            shape: NodeTypeMap[data.nodeType],
            data: {
              ...data,
              pos: newId,
            },
          };
          graph.addNode(newNode);
          // graph.cleanSelection();
          graph.resetSelection(newId);
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
        this.graphBlankClick();
      });
      graph.on("blank:click", () => {
        graph.getEdges().forEach((e) => {
          e.attr("line/stroke", "#A2B1C3");
        });
        this.graphBlankClick();
      });
      // 为条件边添加标签
      graph.on("edge:connected", ({ edge }) => {
        const sourceNode = edge.getSourceNode();
        console.log("edge:connected sourceNode", sourceNode);
        if (sourceNode.shape === "branch") {
          const branchNodeEdges = graph.getOutgoingEdges(sourceNode);
          if (branchNodeEdges.length === 1) {
            edge.setData({ isYes: 1 });
          } else if (branchNodeEdges.length === 2) {
            const dataEdge = branchNodeEdges.filter((edge) => !!edge.data)[0];
            const noDataEdge = branchNodeEdges.filter((edge) => !edge.data)[0];
            if (dataEdge) {
              const { isYes } = dataEdge.data;
              noDataEdge.setData({
                isYes: isYes === 1 ? 0 : 1,
              });
            }
          }

          branchNodeEdges.forEach((item) => {
            const { data } = item;
            const { isYes } = data;
            edge.setLabels({
              attrs: {
                label: {
                  text: isYes ? " 是 " : " 否 ",
                  fill: isYes ? "#00c172" : "red",
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
        this.graphNodeSelected(node);
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
      const dx = Math.ceil(e.clientX - this.nodeRx);
      const dy = Math.ceil(e.clientY - this.nodeRy);
      const p = graphEngine.clientToLocal(dx, dy);
      const key = GraphUtil.genNodeId(nodeType);
      const coverProps = {
        id: key,
        x: p.x,
        y: p.y,
        data: {
          ...cloneDeep(emptyNodeProps),
          pos: key,
          nodeType: NodeCodeMap[nodeType],
        },
      };
      graphEngine.addNode({
        ...coverProps,
        shape: nodeType,
      });
    },

    onNodeEditCancel() {},
    onNodeEditSubmit() {
      this.$refs["nodeForm"].validate((valid) => {
        if (!valid) return false;
        console.log("submit!");
      });
    },

    graphBlankClick() {
      if (this.flowInfoVisible) {
        return;
      }
      this.flowInfoVisible = true;
      this.nodeInfoVisible = false;
    },

    resetNodeForm() {
      this.nodeForm.nodeType = undefined;
      this.nodeForm.nodeId = undefined;
      this.nodeForm.nodeAlias = "";
      this.nodeForm.executeParentStoresFlag = 0;
      this.nodeForm.executeThisStoresFlag = 0;
      this.nodeForm.ruleId = undefined;
      this.nodeForm.remark = "";
    },

    graphNodeSelected(nodeIns) {
      if (!this.nodeInfoVisible) {
        this.nodeInfoVisible = true;
        this.flowInfoVisible = false;
      }
      console.log("node selected", nodeIns);
      const graphNodeData = nodeIns.getData();
      console.log(graphNodeData);

      Object.keys(this.nodeForm).forEach((k) => {
        this.nodeForm[k] = graphNodeData[k];
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
@keyframes moveBorder {
  0% {
    border-spacing: 0px;
  }
  50% {
    border-spacing: 10px;
  }
  100% {
    border-spacing: 0px;
  }
}

.x6-widget-selection-box {
  border: none;
  // border: 2px dashed #0062ff;
  // border-spacing: 20px;
  background-image: url("~@/assets/border.svg");
  background-repeat: no-repeat;
}
</style>
