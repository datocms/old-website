const path = require('path')

module.exports = {
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        includePaths: [path.resolve(__dirname, "./src")]
      }
    },
    'gatsby-plugin-resolve-src',
  ],
};
