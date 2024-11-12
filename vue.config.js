const path = require("path");
const isDev = process.env.NODE_ENV === "development";
const port = 8000;

module.exports = {
  publicPath: isDev ? "" : "/",
  assetsDir: "static",
  filenameHashing: true,
  lintOnSave: isDev, // 把eslint校验打开， vscode安装eslint插件
  productionSourceMap: false,

  configureWebpack: {
    // module: {
    //   rules: [],
    // },
    resolve: {
      alias: {
        "@": path.resolve(process.cwd(), "./src"),
      },
    },
    devServer: {
      // proxy: {
      //   "/cst_wms_new": {
      // target: process.env.VUE_APP_BASE_URL,
      // 联调后端本地接口时打开下面注释
      // pathRewrite: {
      //   '^/cst_wms_new': '',
      // },
      //   },
      //   "/auth": {
      //     // target: process.env.VUE_APP_AUTH_URL,
      //   },
      // },
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      disableHostCheck: true,
      sockPort: 8001,
      sockHost: "localhost",
      https: false,
      port: port,
    },
  },

  chainWebpack: (config) => {
    config.plugins.delete("preload");
    config.plugins.delete("prefetch");
  },
};
