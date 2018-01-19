const p = require('path')

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return Promise.all([
    graphql(
      `
        {
          files: allMarkdownRemark(
            filter: { fileAbsolutePath: { regex: "/.*docs.*/" } }
          ) {
            edges {
              node {
                path: fileAbsolutePath
                frontmatter {
                  copyFrom
                  category
                }
              }
            }
          }
        }
      `
    )
    .then(result => {
      const pages = result.data.files.edges.map(edge => edge.node);

      pages.forEach((page) => {
        const { path, frontmatter: { copyFrom, category } } = page
        const url = path.replace(`${__dirname}/src`, '').replace(/\.md$/, '')

        const contentPath = copyFrom ?
          p.join(__dirname, 'src', 'docs', copyFrom) :
          path;

        createPage({
          path: url,
          component: p.resolve(`./src/templates/DocPage/index.js`),
          context: { path: contentPath },
        })
      });
    })
  ])
}
