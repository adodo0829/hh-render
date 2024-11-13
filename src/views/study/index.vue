<template>
  <div>
    <div class="i-nav">
      <router-link
        v-for="item in interviewsList"
        :to="item.path"
        :key="item.path"
        >{{ item.name }}</router-link
      >
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "xxx",
  components: {},
  data() {
    return {
      interviewsList: [],
    };
  },
  mounted() {
    const interviewsList = this.$router.options.routes.filter(
      (item) => item.name === "Study"
    )[0].children;

    this.interviewsList = interviewsList;
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.i-nav {
  display: flex;
  background-color: #f4f4f4;
  a {
    padding: 4px 12px;
    background-color: #ccc;
    &.router-link-active {
      color: #06ce06;
      background-color: #fff;
    }
  }
}
</style>
