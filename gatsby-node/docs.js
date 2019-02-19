const p = require('path');
const groupBy = require('group-by');
const { stringify } = require('flatted/cjs');
const slugs = require("github-slugger")();
const fieldTypes = require('../src/utils/fieldTypes.json');
const parser = require('json-schema-ref-parser');
const sortBy = require('sort-by');
const fetch = require('node-fetch');

const defaultLinksOrder = ['instances', 'self', 'create', 'update', 'destroy'];

const normalizeSchema = schema => {
  return Object.entries(schema.properties)
    .map(([resource, resourceSchema]) => ({
      id: resource,
      ...resourceSchema,
      attributes: resourceSchema.definitions.attributes
        ? resourceSchema.definitions.attributes.properties
        : {},
      links: resourceSchema.links
        .filter(l => !l.private)
        .map(link => ({
          ...link,
          position: defaultLinksOrder.includes(link.rel)
            ? defaultLinksOrder.indexOf(link.rel)
            : 99,
        }))
        .sort(sortBy('position')),
      position: resourceSchema.position || 99,
    }))
    .filter(resource => resource.links.length > 0)
    .sort(sortBy('position'));
};

const buildCmaResources = async () => {
  const response = await fetch('https://site-api.datocms.com/docs/site-api-hyperschema.json');
  const schema = await response.json();
  const deferencedSchema = await parser.dereference(schema);
  return normalizeSchema(deferencedSchema);
};

const buildFieldsIntrospection = async () => {
  const response = await fetch('https://internal.datocms.com/introspection/field-filters');
  return await response.json();
}

const findHtml = (page, pages) => {
  if (page.frontmatter.copyFrom) {
    const contentPage = pages.find(p => p.path.includes(page.frontmatter.copyFrom))
    return contentPage.html;
  }

  return page.html;
}

const findHeadings = (page, pages) => {
  if (page.frontmatter.copyFrom) {
    const contentPage = pages.find(p => p.path.includes(page.frontmatter.copyFrom))
    return contentPage.headings;
  }

  return page.headings;
}

const findFrontmatterValue = (value, page, pages) => {
  if (page.frontmatter[value]) {
    return page.frontmatter[value]
  }

  const contentPage = pages
    .find(p => p.path.includes(page.frontmatter.copyFrom))

  if (contentPage) {
    return contentPage.frontmatter[value]
  }

  return ''
}

const findTitle = findFrontmatterValue.bind(this, 'title');
const findPosition = findFrontmatterValue.bind(this, 'position');

const query = `
  {
    files: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/.*docs.*/" } }
    ) {
      edges {
        node {
          html
          path: fileAbsolutePath
          headings {
            value
            depth
          }
          frontmatter {
            title
            position
            copyFrom
            template
          }
        }
      }
    }
  }
`

module.exports = async function docs({ graphql, actions: { createPage } }) {
  const result = await graphql(query);
  const cmaResources = await buildCmaResources();
  const {
    meta: fieldsMetaInfo,
    field_types: fieldTypesInfo
  } = await buildFieldsIntrospection();

  const rawPages = result.data.files.edges.map(edge => edge.node);

  const pages = rawPages.map(rawPage => {
    const { path, frontmatter: { template } } = rawPage;
    const position = findPosition(rawPage, rawPages);
    const originalTitle = findTitle(rawPage, rawPages);

    const rawHeadings = findHeadings(rawPage, rawPages);
    const minHeadingLevel = rawHeadings.reduce((min, h) => h.depth < min ? h.depth : min, 100);

    slugs.reset();

    let headings = rawHeadings
      .filter(h => h.depth === minHeadingLevel)
      .map(heading => ({
        id: `#${slugs.slug(heading.value, false)}`,
        title: heading.value,
      }));

    const pagePath = path.replace(/^.*\/src/, '').replace(/(\/index)?\.md$/, '');
    let context = {};

    if (pagePath === '/docs/content-delivery-api/filtering') {
      headings = headings.concat(
        Object.keys(fieldsMetaInfo).map(name => ({
          id: `#${slugs.slug(name)}`,
          title: `${name} meta field`,
        })),
        Object.keys(fieldTypesInfo).map(name => ({
          id: `#${slugs.slug(name)}`,
          title: `${fieldTypes[name]} fields`,
        })),
      );

      context = {
        fieldsMetaInfo,
        fieldTypesInfo
      };
    }

    const html = findHtml(rawPage, rawPages);

    return {
      chapter: p.dirname(path).split(p.sep).pop(),
      path: pagePath,
      title: position === 1 ? 'Introduction' : originalTitle,
      originalTitle,
      repoPath: path.replace(/^.*\/src/, 'https://github.com/datocms/website/blob/master/src'),
      headings,
      position,
      html,
      template,
      context,
    };
  });

  const byChapter = groupBy(pages, 'chapter');

  Object.keys(byChapter).forEach((chapter) => {
    let pages = byChapter[chapter].sort(sortBy('position'));

    if (chapter === 'content-management-api') {

      const resources = cmaResources
        .map((resource, i) => {

          slugs.reset();
          const headings = [
            {
              id: '#object',
              title: 'Object fields',
            }
          ].concat(
            resource.links.map(link => ({ 
              id: `#${link.title.toLowerCase()}`,
              title: link.description
            }))
          );

          return {
            chapter,
            path: `/docs/content-management-api/resources/${resource.id.replace(/_/g, '-')}`,
            title: resource.title,
            headings,
            template: 'CmaApiResourcePage',
            context: { resource: stringify(resource) },
          };
        });

      pages = pages.concat(resources);
    }

    const menuItems = pages.map(({ path, title, headings }) => ({ path, title, headings }));

    pages.forEach((page, index) => {
      const prevPage = index > 0 ? menuItems[index - 1] : null;
      const nextPage = index < menuItems.length - 1 ? menuItems[index + 1] : null;

      createPage({
        path: page.path,
        component: (
          page.template ?
            p.resolve(`./src/templates/${page.template}/index.js`) :
            p.resolve(`./src/templates/DocPage/index.js`)
        ),
        context: {
          ...page.context,
          index,
          pageTitle: page.title,
          chapterTitle: pages[0].originalTitle,
          menuItems,
          html: page.html,
          repoPath: page.repoPath,
          prevPage,
          nextPage,
        },
      });
    });
  });
}
