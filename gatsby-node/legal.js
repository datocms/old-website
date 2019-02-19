const p = require('path');
const query = `
  {
    files: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/.*legal.*/" } }
    ) {
      edges {
        node {
          path: fileAbsolutePath
        }
      }
    }
  }
`;

module.exports = async function legal({ graphql, actions: { createPage } }) {
  const { data: { files} } = await graphql(query);

  const pages = files.edges.map(edge => edge.node);

  pages.forEach((page) => {
    const { path } = page
    const url = path.replace(/^.*\/src/, '').replace(/(\/index)?\.md$/, '');

    createPage({
      path: url,
      component: p.resolve(`./src/templates/LegalPage/index.js`),
      context: { sourcePath: path },
    })
  })
}


