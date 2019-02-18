const p = require('path');
const createPaginatedPages = require('gatsby-paginate');

const query = `
{
  articles: allDatoCmsBlogPost(sort: { fields: [publicationDate], order: DESC }) {
    edges {
      node {
        slug
        title
        coverImage {
          url
          fluid(maxWidth: 850) {
            base64
            aspectRatio
            src
            srcSet
            sizes
          }
        }
        publicationDate(formatString: "MMM D, YYYY")
        author {
          name
          avatar {
            url
            fluid(maxWidth: 80) {
              base64
              aspectRatio
              src
              srcSet
              sizes
            }
          }
        }
        excerpt: excerptNode {
          markdown: childMarkdownRemark {
            excerpt(pruneLength: 200)
          }
        }
      }
    }
  }
}
`;

module.exports = async function blog({ graphql, actions: { createPage } }) {
  const result = await graphql(query);

  createPaginatedPages({
    edges: result.data.articles.edges,
    createPage: createPage,
    pageTemplate: `./src/templates/BlogPage/index.js`,
    pageLength: 30,
    pathPrefix: 'blog'
  });

  result.data.articles.edges.forEach(({ node: article }) => {
    createPage({
      path: `/blog/${article.slug}/`,
      component: p.resolve(`./src/templates/ArticlePage/index.js`),
      context: { slug: article.slug },
    })
  });
}
