const query = `
{
  entries: allDatoCmsChangelogEntry(sort: { fields: [publicationDate], order: DESC }, limit: 10) {
    edges {
      node {
        title
        slug
        content: contentNode {
          markdown: childMarkdownRemark {
            excerpt(pruneLength: 100000)
            html
          }
        }
        publicationDate
        categories {
          name
          color { hex }
        }
      }
    }
  }
}`;

module.exports = {
  query,
  title: 'DatoCMS Product Changelog',
  description: 'Here we document our progress and announce product updates',
  setup: ({ title, description }) => {
    return { title, description };
  },
  serialize: ({ query: { site, entries } }) => {
    return entries.edges.map(({ node: entry }) => {
      return {
        title: entry.title,
        date: new Date(entry.publicationDate),
        description: entry.content.markdown.excerpt,
        url: `https://www.datocms.com/changelog/${entry.slug}/`,
        guid: `https://www.datocms.com/changelog/${entry.slug}/`,
        custom_elements: [{ "content:encoded": entry.content.markdown.html }],
      };
    });
  },
  output: "/product-changelog.xml",
};


