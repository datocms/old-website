const p = require('path');
const groupBy = require('group-by');
const cartesianProduct = require('cartesian-product');

const query = `
{
    integrations: allDatoCmsIntegration {
      edges {
        node {
          slug
          type: integrationType {
            slug
          }
        }
      }
    }
    home: datoCmsHomePage {
      whosUsingDatocms {
        name
        logo {
          url
        }
      }
    }
    features: allDatoCmsFeature(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          id
          title
          description: descriptionNode {
            markdown: childMarkdownRemark {
              html
            }
          }
          image {
            url
            format
          }
        }
      }
    }
    reviews: allDatoCmsReview(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          id
          name
          role
          website
          quote: quoteNode {
            markdown: childMarkdownRemark {
              html
            }
          }
          image {
            fluid(maxWidth: 55) {
              base64
              aspectRatio
              src
              srcSet
              sizes
            }
          }
        }
      }
    }
  }
`;

module.exports = async function landing({ graphql, actions: { createPage } }) {
  const result = await graphql(query);
  const { home, features, reviews } = result.data;

  const integrations = result.data.integrations.edges
    .map(edge => edge.node)
    .map(integration => ({ slug: integration.slug, type: integration.type.slug }));

  const byType = groupBy(integrations, 'type');

  byType['static-generator'].forEach(({ slug }) => (
    createPage({
      path: `/cms/${slug}/`,
      component: p.resolve(`./src/templates/landing/SsgPage/index.js`),
      context: { slug, home, features, reviews },
    })
  ))

  byType['language'].forEach(({ slug }) => (
    createPage({
      path: `/cms/${slug}/`,
      component: p.resolve(`./src/templates/landing/LanguagePage/index.js`),
      context: { slug, home, features, reviews },
    })
  ))

  byType['framework'].forEach(({ slug }) => (
    createPage({
      path: `/cms/${slug}/`,
      component: p.resolve(`./src/templates/landing/FrameworkPage/index.js`),
      context: { slug, home, features, reviews },
    })
  ))

  cartesianProduct([
    byType['static-generator'],
    byType['cdn'].concat(byType['ci'])
  ]).forEach(([{ slug: ssgSlug }, { slug: cdnSlug }, ]) => (
    createPage({
      path: `/cms/${ssgSlug}/${cdnSlug}/`,
      component: p.resolve(`./src/templates/landing/SsgCdnPage/index.js`),
      context: { ssgSlug, cdnSlug, home, features, reviews },
    })
  ))

  cartesianProduct([
    byType['static-generator'],
    byType['git']
  ]).forEach(([{ slug: ssgSlug }, { slug: gitSlug }]) => (
    createPage({
      path: `/cms/${ssgSlug}/${gitSlug}/`,
      component: p.resolve(`./src/templates/landing/SsgGitPage/index.js`),
      context: { ssgSlug, gitSlug, home, features, reviews },
    })
  ))
}

