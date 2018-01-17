require('dotenv').config()
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
    'gatsby-transformer-remark',
    {
      resolve: `gatsby-source-datocms`,
      options: {
        apiToken: process.env.DATO_API_TOKEN,
      },
    }
  ],
};
