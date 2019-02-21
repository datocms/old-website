const p = require('path');
const createPaginatedPages = require('gatsby-paginate');

const query = `
  {
    articles: allDatoCmsChangelogEntry(sort: { fields: [publicationDate], order: DESC }) {
      edges {
        node {
          id
          title
          slug
          content: contentNode {
            markdown: childMarkdownRemark {
              html
            }
          }
          publicationDate(formatString: "MMM D, YYYY")
          categories {
            name
            color { hex }
          }
        }
      }
    }
  }
`;

module.exports = async function changelog({
  graphql,
  actions: { createPage },
}) {
  const result = await graphql(query);

  createPaginatedPages({
    edges: result.data.articles.edges,
    createPage: createPage,
    pageTemplate: `./src/templates/ChangelogPage/index.js`,
    pageLength: 10,
    pathPrefix: 'changelog',
  });

  result.data.articles.edges.forEach(({ node: entry }) => {
    createPage({
      path: `/changelog/${entry.slug}/`,
      component: p.resolve(`./src/templates/ChangelogEntry/index.js`),
      context: { slug: entry.slug },
    });
  });
};
