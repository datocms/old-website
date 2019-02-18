const p = require('path');
const sortBy = require('sort-by');
const { parse, stringify } = require('flatted/cjs');

const query = `
{
  files: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/.*content-management-api.*/"}}) {
    edges {
      node {
        path: fileAbsolutePath
        html
        frontmatter {
          title
          position
        }
      }
    }
  }
  rawResources: cmaResources {
    body
  }
}
`

module.exports = async function cma({ graphql, actions: { createPage } }) {
  const result = await graphql(query);

  const resources = parse(result.data.rawResources.body)
    .map((resource) => {
      const path = `/content-management-api/resources/${resource.id.replace(/_/g, '-')}`;

      return {
        path,
        title: resource.title,
        context: {
          rawResource: stringify(resource),
          title: resource.title,
        },
      };
    })

  const staticPages = result.data.files.edges.map(edge => edge.node)
    .map(({ html, path, frontmatter: { title, position } }) => ({
      path: path.replace(/^.*\/src/, '').replace(/(\/index)?\.md$/, ''),
      position,
      title,
      context: {
        html,
        title,
      },
    }))
    .sort(sortBy('position'));

  const menuItems = staticPages
    .concat(resources)
    .map(({ path, title }) => ({ path, title }));

  staticPages.concat(resources).forEach((page) => {
    createPage({
      path: page.path,
      component: p.resolve(`./src/templates/CmaPage/index.js`),
      context: {
        ...page.context,
        menuItems,
      },
    })
  });

}
