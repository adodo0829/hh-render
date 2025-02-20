<template>
  <div class="props">
    <p>流程信息属性</p>
    <div class="row">
      <span>功能模块:</span>
      <span>入库</span>
    </div>
    <div class="row">
      <span>流程编码:</span>
      <span>InboundXXXX</span>
    </div>
    <div class="row">
      <span>功能名称:</span>
      <span>入库流程</span>
    </div>
    <div class="row">
      <span>业务类型:</span>
      <span>完整入库</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "xxx",
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.props {
  padding-left: 12px;
  .row {
    margin-bottom: 20px;
    span {
      &:first-child {
        margin-right: 12px;
        color: #817676;
      }
    }
  }
}
</style>
