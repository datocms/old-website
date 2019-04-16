const { isAbsolute } = require("path")
const visit = require(`unist-util-visit`)

const withProtocol = /:\/\//;

module.exports = ({ getNode, markdownAST, markdownNode }) => {
  visit(markdownAST, 'link', node => {
    if (!node.url.includes('://') && !node.url.startsWith('#')) {
      const chunks = node.url.split(/#/);
      const path = chunks[0];
      const hash = chunks[1];

      let finalUrl = '';

      if (path.endsWith('/')) {
        finalUrl += path.slice(0, -1);
      } else {
        finalUrl += path;
      }

      if (hash) {
        finalUrl += `#${hash}`;
      }

      node.url = finalUrl;
    }
  })

  visit(markdownAST, 'code', node => {
    node.value = node.value.replace(/\t/g, '  ');
  });
}
