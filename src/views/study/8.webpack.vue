<template>
  <div>
    <h3>构建工具 webpack</h3>
    <pre>
为什么要用：
- 实现项目工程的自动化：本地 和 线上 分离
    - 本地版本：
        - html，js，css分离
        - 模块化
        - 方便维护
        - es6
        - sass
    - 线上版本（webpack打包）：
        - 高性能
        - 体积小
        - 速度快

怎么玩：
webpack.config.js 配置

# loader
loader 是文件加载器，能够加载资源文件，并对这些文件进行一些处理，诸如编译、压缩等，最终一起打包到指定的文件中；
实质是一个转换器，将A文件进行编译形成B文件，操作的是文件

- 核心点
    - loader 是个函数，有个 source 参数，内容就是 .md 文件源码
    - 我们需要 .md 最终返回的是个vue组件字符串
        - 在函数中处理md语法转为 html标签
        - 最后返回这个这个拼凑的组件

module.exports = (source) =》 {
  return 'template xxxx template'
}

# plugin
plugin 赋予了 webpack 各种灵活的功能，例如打包优化、资源管理、环境变量注入等，目的是解决 loader 无法实现的其他事;
可以理解为打包产物加工器

## loader 与 plugin的区别
- 运行时机
loader 运行在打包文件之前
plugins 在整个编译周期都起作用



# 构建流程
webpack 的运行流程是一个串行的过程，它的工作流程就是将各个插件串联起来；
在运行过程中会广播事件，插件plugin只需要监听它所关心的事件，就能加入到这条webpack机制中，去改变webpack的运作，使得整个系统扩展性良好

从启动到结束会依次执行以下三大步骤:
- 初始化流程：从配置文件(webpack.config.js，)和 Shell 语句中读取与合并参数，并初始化需要使用的插件和配置插件等执行环境所需要的参数
- 编译构建流程：从 Entry 发出，针对每个 Module 串行调用对应的 Loader 去翻译文件内容，再找到该 Module 依赖的 Module，递归地进行编译处理
- 输出流程：对编译后的 Module 组合成 Chunk，把 Chunk 转换成文件，输出到文件系统

# 编写loader
其本质为函数，函数中的 this 作为上下文会被 webpack 填充，因此我们不能将 loader设为一个箭头函数
函数接受一个参数source，为 webpack 传递给 loader 的文件源内容；

函数中 this 是由 webpack 提供的对象，能够获取当前 loader 所需要的各种信息
函数中有异步操作或同步操作，异步操作通过 this.callback 返回，返回值要求为 string 或者 Buffer

// 导出一个函数，source为webpack传递给loader的文件源内容
module.exports = function(source) {
    const content = doSomeThing2JsString(source);

    // 如果 loader 配置了 options 对象，那么this.query将指向 options
    const options = this.query;

    // 可以用作解析其他模块路径的上下文
    console.log('this.context');

    /*
     * this.callback 参数：
     * error：Error | null，当 loader 出错时向外抛出一个 error
     * content：String | Buffer，经过 loader 编译后需要导出的内容
     * sourceMap：为方便调试生成的编译后内容的 source map
     * ast：本次编译生成的 AST 静态语法树，之后执行的 loader 可以直接使用这个 AST，进而省去重复生成 AST 的过程
     */
    this.callback(null, content); // 异步
    return content; // 同步
}

# 编写plugin
由于webpack基于发布订阅模式，在运行的生命周期中会广播出许多事件，插件通过监听这些事件，就可以在特定的阶段执行自己的插件任务

- 插件必须是一个函数或者是一个包含 apply(compiler) 方法的对象，这样才能访问compiler实例
- 传给每个插件的 compiler 和 compilation 对象都是同一个引用，因此不建议修改
异步的事件需要在插件处理完任务时调用回调函数通知 Webpack 进入下一个流程

class MyPlugin {
    // Webpack 会调用 MyPlugin 实例的 apply 方法给插件实例传入 compiler 对象
  apply (compiler) {
    // 找到合适的事件钩子，实现自己的插件功能
    compiler.hooks.emit.tap('MyPlugin', compilation =》 {
        // compilation: 当前打包构建流程的上下文
        console.log(compilation);
        // do something...
        compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync('MyPlugin', (htmlPluginData, callback) =》 {
          htmlPluginData.xxx = xxxx
          callback(null, htmlPluginData)
        })
    })
  }
}
在 emit 事件发生时，代表源文件的转换和组装已经完成，可以读取到最终将输出的资源、代码块、模块及其依赖，并且可以修改输出资源的内容

# webpack 热更新原理
1. 当修改了一个或多个文件；
2. 文件系统接收更改并通知 webpack；
3. webpack 重新编译构建一个或多个模块，并通知 HMR 服务器进行更新；
4. HMR Server 使用 webSocket 通知 HMR runtime 需要更新，HMR 运行时通过 HTTP 请求更新 jsonp；
5. HMR 运行时替换更新中的模块，如果确定这些模块无法更新，则触发整个页面刷新
    </pre>

    <h3>vite</h3>
    <pre>
# 组成
1.开发服务器，它基于 原生 ES 模块 提供了 丰富的内建功能，如速度快到惊人的 模块热更新（HMR）
2.一套构建指令，它使用 Rollup 打包你的代码，并且它是预配置的，可输出用于生产环境的高度优化过的静态资源

npm init vite@latest
    </pre>

    <h3>Babel</h3>
    <pre>
# Babel 的原理
Babel 的转译过程分为三个阶段:
1. 解析 Parse : 将代码解析生成抽象语法树（即AST），即词法分析与语法分析的过程
2. 转换 Transform: 对于 AST 进行变换一系列的操作，Babel 接受得到 AST 并通过 `babel-traverse` 对其进行遍历，在此过程中进行添加、更新及移除等操作
3. 生成 Generate: 将变换后的 AST 再转换为 JS 代码, 使用到的模块是 `babel-generator`

# 如何写一个 Babel 插件
Babel 解析成 AST，然后插件更改 AST，最后由 Babel 输出代码
module.exports = function(babel) {
  return {
    visitor: {}
  }
}
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
