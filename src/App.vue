<template>
  <div id="app">
    <section id="nav">
      <router-link v-for="item in routeList" :to="item.path" :key="item.path">{{
        item.name
      }}</router-link>
    </section>
    <section id="content">
      <router-view />
    </section>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      routeList: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const { query } = this.$route;

      const { options } = this.$router;
      let menus = options.routes.filter((item) => item.path !== "/");

      if (!query.interview) {
        // menus
        menus = menus.filter((item) => item.name !== "interview");
      }
      this.routeList = menus;
    },
  },
};
</script>

<style lang="scss">
#app {
  display: flex;
  #nav {
    height: 100vh;
    width: 200px;
    overflow-y: auto;
    border-right: 1px solid #ccc;
    a {
      display: block;
      width: 100%;
      line-height: 20px;
      padding: 4px;
      font-weight: bold;
      color: #2c3e50;
      &.router-link-active {
        color: #35d152;
        background-color: #ccc;
      }
    }
  }
  #content {
    flex: 1;
    height: 100vh;
    overflow-y: auto;
  }
}
</style>
