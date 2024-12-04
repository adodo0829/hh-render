const MarkdownIt = require('markdown-it');
const MdContainer = require('markdown-it-container');
const { stripScript, stripTemplate, genInlineComponentText, stripStyle } = require('./utils');
const hljs = require('highlight.js');

/**
 * `{{ }}` => `<span>{{</span> <span>}}</span>`
 * @param  {string} str
 * @return {string}
 */
const replaceDelimiters = function(str) {
  return str.replace(/({{|}})/g, '<span>$1</span>');
};

/**
 * renderHighlight
 * @param  {string} str
 * @param  {string} lang
 */

const renderHighlight = function(str, lang) {
  if (!(lang && hljs.getLanguage(lang))) {
    return '';
  }

  try {
    return replaceDelimiters(hljs.highlight(lang, str).value);
  } catch (err) {}
};

module.exports = (source) => {
  // 构造Markdown操作
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function(str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          if (lang === 'bash') {
            return `<pre class="hljs"><code>${renderHighlight(str, lang)}</code></pre>`;
          } else if (['js', 'jsx'].includes(lang)) {
            return `<code-js-jsx><div slot="code">${renderHighlight(
              str,
              lang
            )}</div></code-js-jsx>`;
          }

          return `<code-opt><div class="code-block-wrapper" slot="code">${renderHighlight(
            str,
            lang
          )}</div></code-opt>`;
        } catch (__) {}
      }
      return ''; // use external default escaping
    },
  }).use(MdContainer, 'EXAMPLE', {
    validate(parmas) {
      return parmas.trim().match(/^EXAMPLE\s*(.*)$/);
    },
    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^EXAMPLE\s*(.*)$/);
      if (tokens[idx].nesting === 1) {
        // 开标签
        const description = m && m.length > 1 ? m[1] : '';
        const content = tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : '';
        return `<div class="meg-docs-code-display">
                ${description ? `<div>${md.render(description)}</div>` : ''}
                <!--meg-demo: ${content}:meg-demo-->`;
      } else {
        // 闭标签
        return `</div>\n`;
      }
    },
  });

  // 获取从MD解析的内容，将其解析成最终的vue
  const content = md.render(source);

  const startTag = '<!--meg-demo:';
  const startTagLen = startTag.length;
  const endTag = ':meg-demo-->';
  const endTagLen = endTag.length;

  // 记录MD中出现的所有代码单元的字符串，原理是最终把每个EXAMPLE里面的代码组织称一个vue component,然后再传入到最终生成的vue组件里面去做渲染
  let componentsStr = '';
  let id = 0; // Example id
  let output = []; // template 部分的输出
  let start = 0; // 开始解析content的index,从0开始

  let commentStart = content.indexOf(startTag);
  let commentEnd = content.indexOf(endTag, commentStart + startTagLen);

  let styleStr = '';

  while (commentStart !== -1 && commentEnd !== -1) {
    output.push(content.slice(start, commentStart));

    const commentContent = content.slice(commentStart + startTagLen, commentEnd);
    // 抽离 template,script,style

    const script = stripScript(commentContent);
    const html = stripTemplate(commentContent);
    styleStr = stripStyle(commentContent);

    let exampleComponentContent = genInlineComponentText(html, script);

    const exampleComponentName = `meg-demo${id}`;

    output.push(`<${exampleComponentName}/>`);
    componentsStr += `${JSON.stringify(exampleComponentName)}: ${exampleComponentContent},`;

    // 继续寻找下一个
    id++;
    start = commentEnd + endTagLen;
    commentStart = content.indexOf(startTag, start);
    commentEnd = content.indexOf(endTag, commentStart + startTagLen);
  }

  // 需要额外处理 有import 语句的情况
  const startImport = 'import';
  const startImportLen = startImport.length;
  const endImport = ';';
  const endImportLen = endImport.length;

  const importOutput = [];

  let statementStart = 0;
  let statementStr = '';

  let startIndex = componentsStr.indexOf(startImport);
  let endIndex = componentsStr.indexOf(endImport, startIndex + startImportLen);

  while (startIndex !== -1 && endIndex !== -1) {
    const statementSlice = componentsStr.slice(statementStart, startIndex);

    const slice = componentsStr.slice(startIndex, endIndex + endImportLen);
    importOutput.push(slice);

    statementStr += statementSlice;

    statementStart = endIndex + endImportLen;
    startIndex = componentsStr.indexOf(startImport, endIndex + endImportLen);
    endIndex = componentsStr.indexOf(endImport, startIndex);
  }

  const lastStatementSlice = componentsStr.slice(statementStart, componentsStr.length);
  statementStr += lastStatementSlice;

  let pageScript = '';
  if (statementStr) {
    pageScript = `<script>
            ${importOutput.join('')}
            export default {
                name: 'component-doc',
                components: {${statementStr}}
            }
        </script>`;
  } else if (content.indexOf('<script>') === 0) {
    start = content.indexOf('</script>') + '</script>'.length;
    pageScript = content.slice(0, start);
  }

  // 加入剩余的template部分
  output.push(content.slice(start));

  return `
    <template>
      <section class="content meg-doc meg-doc-markdown">
        ${output.join('')}
      </section>
    </template>
    ${pageScript}
    <style lang="scss">${styleStr}</style>
  `;
};
