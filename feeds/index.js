const blog = require('./blog');
const changelog = require('./changelog');

module.exports = {
  query: `
    {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `,
  feeds: [blog, changelog],
};

