const needToRelacePath = "/js/app.js";

class SelfHtmlWebpackPlugin {
  constructor(options) {
    this.options = options || {};
  }

  getJsFilePath() {
    return this.options.assetsDir + "/js/app";
  }

  getInjectContent() {
    return `
			<script type="text/javascript">console.log("%c MEGVII HETU MONITOR ", "background:blue;color:white;");</script></html>
			`;
  }

  apply(compiler) {
    const pluginName = "SelfHtmlWebpackPlugin";

    if (compiler.hooks) {
      compiler.hooks.compilation.tap(pluginName, (compilation) => {
        compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync(
          pluginName,
          (htmlPluginData, callback) => {
            const injectStr = this.getInjectContent();
            htmlPluginData.html = htmlPluginData.html.replace(
              "</html>",
              injectStr
            );

            // 替换index.html静态配置
            const { assets } = htmlPluginData;
            const { js = [] } = assets;
            const pathPrefix = this.getJsFilePath();
            const realPath =
              js.filter((path) => path.includes(pathPrefix))[0] || "";
            const replacePrefix = this.options.isProd ? "/web-eoms" : "";
            htmlPluginData.html = htmlPluginData.html.replace(
              needToRelacePath,
              replacePrefix + realPath
            );
            callback(null, htmlPluginData);
          }
        );
      });
    }
  }
}

module.exports = SelfHtmlWebpackPlugin;
