<template>
  <div>
    <pre>
master
 - dev（release）
  - feature
    </pre>

    <h3>npm包管理</h3>
    <pre>
项目级 npmrc 》 用户级 npmrc 》 全局 npmrc 》 npm 内置 npmrc

npm link的本质是创建一个软连接
工作原理是 : 将其链接到全局 node 模块安装路径中 . 为目标 npm 模块的可执行 bin 文件创建软连接 将其连接到全局 node 命令安装路径中 

npx 可以直接执行 node_modules/.bin 下的文件 , 可以自动去 node_modules/.bin 路径和环境变量 $path 中检查命令是否存在 .
npx 会在执行模块时 优先安装依赖 , 但是在安装结束后便删除该依赖 , 优点是 : 避免全局安装模块

npm install ，就可以自动安装对应的模块：
- 发出 npm install 命令，查询 node_modules 目录之中是否已经存在指定模块
    - 若存在，不再重新安装
    - 若不存在
        - npm 向 registry 查询模块压缩包的网址
        - 下载压缩包，存放在根目录下的 `.npm` 目录里
        - 解压压缩包到当前项目的 `node_modules` 目录
    </pre>
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

<style lang="scss" scoped></style>
