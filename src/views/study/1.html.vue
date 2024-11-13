<template>
  <div>
    <section>
      html超文本标记语言，由一系列的元素（elements）组成；元素可以告诉浏览器如何展示内容；
      <pre>
      文档类型声明（DOCTYPE）!DOCTYPE html ；
      html 元素：文档的根元素，所有的内容都包含在这个元素内。
      head 元素：包含文档的元数据，如字符集声明、页面标题和链接到 CSS 文件。
      body 元素：包含可见的页面内容
      标题和段落：h1 到 h6 定义标题，p 定义段落
      链接：a 元素用于创建链接
      图片：img 元素用于嵌入图片
      列表：ul 表示无序列表，ol 表示有序列表，li 表示列表项。
      表格：table 用于创建表格，tr 用于行，th 和 td 分别用于表头和单元格
      <a href="https://evelance.notion.site/Table-8dde6cdd0844459b96f2fc9ec7ba8793">表格：table注意事项</a>
      表单：form 用于创建表单，input 用于收集用户输入
      </pre>
    </section>

    <section>
      https://evelance.notion.site/56e3e25360914897ad0717fbd06a17d1
      <pre>
      ## 语义化的理解
- 用正确的标签做正确的事情，结构清晰，可读性高，方便维护
header / main / aside / section / article / footer / canvas / video / audio
- 利于 SEO（搜索引擎优化）

## SEO
一种搜索引擎的搜索规则，可利用它来提高网站在搜索结果中的排名
前端 SEO 实践与注意点：
- 实践：
    - head 标签中：
        - `title`：言简意赅，需要体现出页面的主要内容
        - `description`：对页面内容的高度概括
        - `keywords`：列举出网站重要关键词
- 注意点：
    - 重要内容不要 JS 输出，爬虫不会执行 JS 获取内容
    - 非装饰性图片必须加 alt
    - 提高网站访问速度
    </pre
      >
    </section>

    <section>
      <p>Web Worker</p>
      在 HTML
      页面中，如果在执行脚本时，页面的状态是不可响应的，直到脚本执行完成后，页面才变成可响应。
      web worker 是运行在后台的
      JS，独立于其他脚本，不会影响页面你的性能。并且通过 postMessage
      将结果回传到主线程。 这样在进行复杂计算操作的时候，就不会阻塞主线程了。
      如何创建 web worker: 1. 检测浏览器对于 web worker 的支持性 2. 创建 web
      worker 文件(js，回传函数等) 3. 创建 web worker 对象
      https://github.com/mdn/dom-examples/tree/main/web-workers
    </section>

    <section>
      Canvas 和 SVG 有什么区别 绘制方式：js xml 分辨率影响:
      逐像素，矢量图(独立于像素) 元素事件：不支持， 支持
      场景：频繁重绘，数据量大；svg是dom操作，不适用频繁重绘
    </section>
  </div>
</template>

<script>
export default {
  name: "HHHH",
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
