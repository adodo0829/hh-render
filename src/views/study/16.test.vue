<template>
  <div>
    <p>
      <button @click="arrToTree">arrToTree递归</button>
      <button @click="arrToTree1">arrToTree循环</button>
      <button @click="tree2Arr1">tree2Arr递归</button>
      <button @click="tree2Arr2">tree2Arr2循环</button>
    </p>
  </div>
</template>

<script>
import { arr1 } from "@/mock/data1";

export default {
  name: "xxx",
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {
    arrToTree() {
      flatArr2Tree(arr1);
      function flatArr2Tree(arr) {
        let rootNodes = [];
        let childNodes = [];
        for (let i = 0; i < arr.length; i++) {
          const node = arr[i];
          if (node.pid === 0) {
            rootNodes.push(node);
          } else {
            childNodes.push(node);
          }
        }
        // 处理并返回rootNodes
        function transformToTree(rootNodes, childNodes) {
          for (let j = 0; j < rootNodes.length; j++) {
            const pNode = rootNodes[j];
            for (let k = 0; k < childNodes.length; k++) {
              const cNode = childNodes[k];
              if (cNode.pid === pNode.id) {
                // 递归的条件：再怎么继续找
                let currChildren = [cNode];
                // 存在子节点
                if (Array.isArray(pNode.children)) {
                  pNode.children.push(cNode);
                } else {
                  pNode.children = currChildren;
                }
                // 继续深层次找
                transformToTree(currChildren, childNodes);
              }
            }
          }
        }
        // 首次调用
        transformToTree(rootNodes, childNodes);
        console.log("rootNodes", rootNodes);
        return rootNodes;
      }
    },
    arrToTree1() {
      function formatArr2Tree(arr) {
        let parentNodes = [];
        for (let i = 0; i < arr.length; i++) {
          const node = arr[i];
          if (node.pid === 0) {
            parentNodes.push(node);
          } else {
            // 直接挂到父节点下，覆写原数组对象
            const currPNode = arr.find((c) => c.id === node.pid);
            if (Array.isArray(currPNode.children)) {
              currPNode.children.push(node);
            } else {
              currPNode.children = [node];
            }
          }
        }
        return parentNodes;
      }

      let tree = formatArr2Tree(arr1);
      console.log("tree", tree);
    },
    tree2Arr1() {},
    tree2Arr2() {},
  },
};
</script>
