const p = require('path');
const groupBy = require('group-by');
const sortBy = require('sort-by');
const { parse, stringify } = require('flatted/cjs');
const slugs = require("github-slugger")();
const fieldTypes = require('../src/utils/fieldTypes.json');

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
    rawResources: cmaResources {
      body
    }
    fieldFiltersIntrospection {
      body
    }
  }
`

module.exports = async function docs({ graphql, actions: { createPage } }) {
  const result = await graphql(query);

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

    if (pagePath === '/docs/content-delivery-api/filtering') {
      headings = headings.concat(
        Object.keys(JSON.parse(result.data.fieldFiltersIntrospection.body).meta).map(name => ({
          id: `#${slugs.slug(name)}`,
          title: `${name} meta field`,
        })),
        Object.keys(JSON.parse(result.data.fieldFiltersIntrospection.body).field_types).map(name => ({
          id: `#${slugs.slug(name)}`,
          title: `${fieldTypes[name]} fields`,
        })),
      );
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
      context: {}
    };
  });

  const byChapter = groupBy(pages, 'chapter');

  Object.keys(byChapter).forEach((chapter) => {
    let pages = byChapter[chapter].sort(sortBy('position'));

    if (chapter === 'content-management-api') {
      const resources = parse(result.data.rawResources.body)
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
      const prevPage = index > 0 && menuItems[index - 1];
      const nextPage = index < menuItems.length - 1 && menuItems[index + 1];

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
