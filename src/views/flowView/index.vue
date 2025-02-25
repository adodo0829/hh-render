<template>
  <div class="flow-view" ref="canvas"></div>
</template>

<script>
import { Graph, Shape } from "@antv/x6";
import dataJson from "./demo.json";
import { getGraphOptions } from "./util";
import { InitBussinessNode } from "./config";

Shape.HTML.register(InitBussinessNode);

let graphEngine;

export default {
  name: "xxx",
  components: {},
  data() {
    return {};
  },
  mounted() {
    this.initFlowGraph();
  },
  methods: {
    initFlowGraph() {
      if (graphEngine) graphEngine.dispose();

      const domContainer = this.$refs.canvas;
      const options = getGraphOptions({
        container: domContainer,
      });
      const graph = new Graph(options);
      //   graph.fromJSON(dataJson);
      graph.addNode({
        shape: "bussiness_init",
        x: 60,
        y: 100,
        data: {
          status: "init",
        },
      });

      graphEngine = graph;
      graph.centerContent();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>

<style lang="scss">
.html-node {
  width: 100%;
  height: 100%;
  border: 2px solid #d8d8d8;
}
</style>
