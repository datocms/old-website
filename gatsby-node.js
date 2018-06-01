const p = require('path')
const groupBy = require('group-by');
const cartesianProduct = require('cartesian-product');
const createPaginatedPages = require('gatsby-paginate');
const redirects = require('./redirects.json');

const createRedirects = ({ boundActionCreators: { createRedirect } }) => {
  Object.entries(redirects).forEach(([fromPath, toPath]) => {
    createRedirect({ fromPath, toPath, isPermanent: true });
  });
}

const articles = ({ graphql, boundActionCreators: { createPage } }) => {
  return graphql(
    `
      {
        articles: allDatoCmsBlogPost(sort: { fields: [publicationDate], order: DESC }) {
          edges {
            node {
              slug
              title
              coverImage {
                url
                sizes(maxWidth: 850) {
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
                  sizes(maxWidth: 80) {
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
                  html
                }
              }
            }
          }
        }
      }
    `
  )
  .then(result => {
    createPaginatedPages({
      edges: result.data.articles.edges,
      createPage: createPage,
      pageTemplate: `./src/templates/BlogPage/index.js`,
      pageLength: 10,
      pathPrefix: 'blog'
    });

    result.data.articles.edges.forEach(({ node: article }) => {
      createPage({
        path: `/blog/${article.slug}/`,
        component: p.resolve(`./src/templates/ArticlePage/index.js`),
        context: { slug: article.slug },
      })
    })
  })
}

const changelog = ({ graphql, boundActionCreators: { createPage } }) => {
  return graphql(
    `
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
    `
  )
  .then(result => {
    createPaginatedPages({
      edges: result.data.articles.edges,
      createPage: createPage,
      pageTemplate: `./src/templates/ChangelogPage/index.js`,
      pageLength: 10,
      pathPrefix: 'changelog'
    });

    result.data.articles.edges.forEach(({ node: entry }) => {
      createPage({
        path: `/changelog/${entry.slug}/`,
        component: p.resolve(`./src/templates/ChangelogEntry/index.js`),
        context: { slug: entry.slug },
      })
    })
  })
}

const findHtml = (page, pages) => {
  if (page.frontmatter.copyFrom) {
    const contentPage = pages
      .find(p => p.path.includes(page.frontmatter.copyFrom))

    return contentPage.html;
  }

  return page.html;
}

const docPages = ({ graphql, boundActionCreators: { createPage } }) => {
  return graphql(
    `
      {
        files: allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/.*docs.*/" } }
        ) {
          edges {
            node {
              html
              path: fileAbsolutePath
              frontmatter {
                template
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
      const { path, frontmatter: { copyFrom, template } } = page
      const url = path.replace(`${__dirname}/src`, '').replace(/(\/index)?\.md$/, '')
      const html = findHtml(page, pages);
      const repoPath = path.replace(__dirname, 'https://github.com/datocms/website/blob/master')

      createPage({
        path: url,
        component: (
          template ?
            p.resolve(`./src/templates/${template}/index.js`) :
            p.resolve(`./src/templates/DocPage/index.js`)
        ),
        context: { sourcePath: path, html, repoPath },
      })
    })
  })
}

const legalPages = ({ graphql, boundActionCreators: { createPage } }) => {
  return graphql(
    `
      {
        files: allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/.*legal.*/" } }
        ) {
          edges {
            node {
              path: fileAbsolutePath
            }
          }
        }
      }
    `
  )
  .then(result => {
    const pages = result.data.files.edges.map(edge => edge.node);

    pages.forEach((page) => {
      const { path } = page
      const url = path.replace(`${__dirname}/src`, '').replace(/(\/index)?\.md$/, '')

      createPage({
        path: url,
        component: p.resolve(`./src/templates/LegalPage/index.js`),
        context: { sourcePath: path },
      })
    })
  })
}

const landingPages = ({ graphql, boundActionCreators: { createPage } }) => {
  return graphql(
    `
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
                sizes(maxWidth: 55) {
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
    `
  )
  .then(result => {
    const { home, features, reviews } = result.data

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
  });
}

exports.createPages = (options) => {
  return Promise.all([
    docPages(options),
    legalPages(options),
    landingPages(options),
    articles(options),
    changelog(options),
    createRedirects(options),
  ]);
}

exports.modifyWebpackConfig = ({ config, stage }) => {
  if (stage === 'build-javascript') {
    config.merge((current) => {
      current.output.jsonpFunction = 'webpackJsonpDato';
      return current;
    });
  }

  return config;
}
