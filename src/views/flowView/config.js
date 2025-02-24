export const InitBussinessNode = {
  shape: "bussiness",
  width: 200,
  height: 60,
  label: "业务节点",
  //   inherit: "rect",
  //   attrs: {
  //     body: {
  //       strokeWidth: 1,
  //       stroke: "#d8d8d8",
  //       fill: "#FFFFFF",
  //     },
  //     text: {
  //       fontSize: 14,
  //       fill: "#0062ff",
  //     },
  //   },
  effect: ["data"],
  html(cell) {
    const { status } = cell.getData();
    console.log("xxxx", status);
    const div = document.createElement("div");
    div.className = `html-node bussiness ${status}`;
    return div;
  },
  tools: [
    {
      name: "button",
      args: {
        markup: [
          {
            tagName: "circle",
            selector: "button",
            attrs: {
              r: 14,
              stroke: "#fe854f",
              strokeWidth: 2,
              fill: "white",
              cursor: "pointer",
            },
          },
          {
            tagName: "text",
            textContent: "Btn",
            selector: "icon",
            attrs: {
              fill: "#fe854f",
              fontSize: 10,
              textAnchor: "middle",
              pointerEvents: "none",
              y: "0.3em",
            },
          },
        ],
        x: "100%",
        y: "100%",
        offset: { x: -20, y: -20 },
        onClick({ cell }) {
          console.log("xxxxx", cell);
        },
      },
    },
  ],
};
