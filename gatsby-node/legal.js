const p = require('path');
const query = `
  {
    files: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/.*legal.*/" } }
    ) {
      nodes {
        path: fileAbsolutePath
      }
    }
    iubendaDocs: allIubendaDoc {
      nodes {
        id
        slug
      }
    }
  }
`;

module.exports = async function legal({ graphql, actions: { createPage } }) {
  const {
    data: { files, iubendaDocs },
  } = await graphql(query);

  files.nodes.forEach(page => {
    const { path } = page;
    const url = path.replace(/^.*\/src/, '').replace(/(\/index)?\.md$/, '');

    createPage({
      path: url,
      component: p.resolve(`./src/templates/LegalPage/fromMarkdown.js`),
      context: { sourcePath: path },
    });
  });

  iubendaDocs.nodes.forEach(page => {
    const { id, slug } = page;

    createPage({
      path: `/legal/${slug}/`,
      component: p.resolve(`./src/templates/LegalPage/fromIubenda.js`),
      context: { id: id },
    });
  });
};
