const p = require('path');
const query = `
  {
    featureGroups: allDatoCmsGroupFeature {
      nodes {
        slug
      }
    }
  }
`;

module.exports = async function features({ graphql, actions: { createPage } }) {
  const {
    data: { featureGroups },
  } = await graphql(query);

  featureGroups.nodes.forEach(featureGroup => {
    createPage({
      path: `/features/${featureGroup.slug}`,
      component: p.resolve(`./src/templates/FeatureGroup/index.js`),
      context: { slug: featureGroup.slug },
    });
  });
};
