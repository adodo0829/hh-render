import { Graph } from "@antv/x6";

// 只负责渲染
export class Flow {
  constructor(options, data) {
    this.options = options;
    this.graph = new Graph(options);
    this.data = data;

    const { useDnd } = options;

    // 上下文准备
    // this.render();
  }

  render() {
    this.graph.fromJSON(this.data);
    this.graph.centerContent();
  }

  updateData(data) {
    this.data = data;
  }
}
