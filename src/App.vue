<template>
  <div id="app">
    <section id="nav">
      <router-link to="/">GLSL</router-link>
      <router-link to="/Coord">坐标系</router-link>
      <router-link to="/Vector">点&向量</router-link>
      <router-link to="/Matrix">矩阵</router-link>
    </section>
    <section id="content">
      <router-view />
    </section>
  </div>
</template>

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
      &.router-link-exact-active {
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
