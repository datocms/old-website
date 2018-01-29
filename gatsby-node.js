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
        const url = path.replace(`${__dirname}/src`, '').replace(/(\/index)?\.md$/, '')

        createPage({
          path: url,
          component: p.resolve(`./src/templates/DocPage/index.js`),
          context: { path },
        })
      });
    })
  ])
}
