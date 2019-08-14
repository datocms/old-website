const p = require('path');
const groupBy = require('group-by');
const { stringify } = require('flatted/cjs');
const slugs = require('github-slugger')();
const fieldTypes = require('../../src/utils/fieldTypes.json');
const sortBy = require('sort-by');
const { findTitle, findHtml, findHeadings } = require('./pageAnalysis');
const buildCmaResources = require('./buildCmaResources');
const buildFieldsIntrospection = require('./buildFieldsIntrospection');

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
            excerpt
            copyFrom
            template
          }
        }
      }
    }
    tutorials: allDatoCmsTutorial(sort:{fields:[position]}) {
      edges {
        node {
          title
          excerpt
          url
        }
      }
    }
  }
`;

module.exports = async function docs({ graphql, actions: { createPage } }) {
  const result = await graphql(query);
  const cmaResources = await buildCmaResources();
  const {
    meta: fieldsMetaInfo,
    field_types: fieldTypesInfo,
  } = await buildFieldsIntrospection();

  const rawPages = result.data.files.edges.map(edge => edge.node);

  const pages = rawPages.map(rawPage => {
    const {
      path,
      frontmatter: { template, excerpt },
    } = rawPage;
    const position = parseInt(p.basename(path).split('_')[0]);
    const isGuide = p.dirname(path).includes('05_guides');
    const originalTitle = findTitle(rawPage, rawPages);

    const rawHeadings = findHeadings(rawPage, rawPages);
    const minHeadingLevel = rawHeadings.reduce(
      (min, h) => (h.depth < min ? h.depth : min),
      100,
    );

    slugs.reset();

    let headings = rawHeadings
      .filter(h => h.depth === minHeadingLevel)
      .map(heading => ({
        id: `#${slugs.slug(heading.value, false)}`,
        title: heading.value,
      }));

    const pagePath = path
      .replace(/^.*\/src/, '')
      .replace(/(\/[0-9]+_index)?\.md$/, '')
      .replace(/\/[0-9]+_/g, '/');
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
        fieldTypesInfo,
      };
    }

    const html = findHtml(rawPage, rawPages);

    return {
      chapter: p
        .dirname(path)
        .split(p.sep)
        .pop(),
      path: pagePath,
      title: position === 1 ? 'Introduction' : originalTitle,
      originalTitle,
      repoPath: path.replace(
        /^.*\/src/,
        'https://github.com/datocms/website/blob/master/src',
      ),
      headings,
      position,
      isGuide,
      excerpt,
      html,
      template,
      context,
    };
  });

  const byChapter = groupBy(pages, 'chapter');

  Object.keys(byChapter).forEach(chapter => {
    let pages = byChapter[chapter].sort(sortBy('position'));

    if (chapter === '04_content-management-api') {
      const resources = cmaResources.map((resource, i) => {
        slugs.reset();
        const headings = [
          {
            id: '#object',
            title: 'Object fields',
          },
        ].concat(
          resource.links.map(link => ({
            id: `#${link.rel}`,
            title: link.title,
          })),
        );

        return {
          chapter,
          path: `/docs/content-management-api/resources/${resource.id.replace(
            /_/g,
            '-',
          )}`,
          title: resource.title,
          headings,
          template: 'CmaApiResourcePage',
          context: { resource: stringify(resource) },
        };
      });

      pages = pages.concat(resources);
    }

    const menuItems = pages.map(({ path, title, headings }) => ({
      path,
      title,
      headings,
    }));

    pages.forEach((page, index) => {
      const prevPage = index > 0 ? menuItems[index - 1] : null;
      const nextPage =
        index < menuItems.length - 1 ? menuItems[index + 1] : null;

      createPage({
        path: page.path,
        component: page.template
          ? p.resolve(`./src/templates/${page.template}/index.js`)
          : p.resolve(`./src/templates/DocPage/index.js`),
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

  const chaptersWhichAreGuides = [
    ...new Set(pages.filter(p => p.isGuide).map(p => p.chapter)),
  ];
  const guides = chaptersWhichAreGuides
    .sort((a, b) => parseInt(a.split(/_/)[0]) - parseInt(b.split(/_/)[0]))
    .map(chapterName => {
      const { path, originalTitle, excerpt } = byChapter[chapterName][0];
      return { path, title: originalTitle, excerpt };
    });

  createPage({
    path: '/docs/guides',
    component: p.resolve(`./src/templates/GuidesPage/index.js`),
    context: {
      guides,
      tutorials: result.data.tutorials.edges.map(edge => edge.node),
    },
  });
};
