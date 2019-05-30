const p = require('path');
const cartesianProduct = require('cartesian-product');
const createPaginatedPages = require('gatsby-paginate');
const slugify = require('slugify');

const query = `
  {
    plugins: allDatoCmsPlugin(sort: {fields: [installs], order: DESC}) {
      edges {
        node {
          packageName
          version
          author { name email }
          description
          tags { tag }
          title
          pluginType { code }
          fieldTypes { code }
          coverImage {
            url
            format
            fluid(maxWidth: 430) {
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
    pluginTypes: allDatoCmsPluginType {
      edges {
        node {
          code
        }
      }
    }
    fieldTypes: allDatoCmsPluginFieldType {
      edges {
        node {
          code
        }
      }
    }
  }
`;

module.exports = async function plugins({ graphql, actions: { createPage } }) {
  const result = await graphql(query);

  const combos = cartesianProduct([
    result.data.pluginTypes.edges.map(({ node }) => node.code).concat([null]),
    result.data.fieldTypes.edges.map(({ node }) => node.code).concat([null]),
  ]);

  const combosWithResults = {};

  combos.forEach(([pluginType, fieldType]) => {
    const parts = ['plugins'];

    if (pluginType) {
      parts.push(pluginType);
    }

    if (fieldType) {
      parts.push(fieldType);
    }

    const path = `/${parts.join('/')}`;

    const plugins = result.data.plugins.edges.filter(
      ({ node: plugin }) =>
        (!pluginType || plugin.pluginType.code === pluginType) &&
        (!fieldType || plugin.fieldTypes.some(f => f.code === fieldType)),
    );

    if (plugins.length > 0) {
      combosWithResults[path] = { plugins, pluginType, fieldType };
    }
  });

  Object.entries(combosWithResults).forEach(([pathPrefix, info]) => {
    createPaginatedPages({
      edges: info.plugins,
      createPage: createPage,
      pageTemplate: `./src/templates/PluginsPage/index.js`,
      pageLength: 24,
      pathPrefix: pathPrefix.substring(1),
      context: {
        combosWithResults,
        pluginType: info.pluginType,
        fieldType: info.fieldType,
      },
    });
  });

  result.data.plugins.edges.forEach(({ node: plugin }) => {
    createPage({
      path: `/plugins/i/${slugify(plugin.packageName)}/`,
      component: p.resolve(`./src/templates/PluginPage/index.js`),
      context: { packageName: plugin.packageName },
    });
  });
};
