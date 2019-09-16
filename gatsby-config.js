require('dotenv').config();
const path = require('path');
const fetch = require('node-fetch');
const { stringify } = require('flatted/cjs');
const camelcaseKeys = require('camelcase-keys');
const feeds = require('./feeds');

module.exports = {
  siteMetadata: {
    siteUrl: `https://www.datocms.com`,
  },
  plugins: [
    'gatsby-plugin-react-helmet',

    {
      resolve: 'gatsby-plugin-sass',
      options: {
        includePaths: [path.resolve(__dirname, './src')],
      },
    },

    'gatsby-plugin-resolve-src',

    {
      resolve: `gatsby-source-datocms`,
      options: {
        apiToken: process.env.DATO_API_TOKEN,
        previewMode: process.env.PREVIEW_MODE,
      },
    },

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/docs`,
        name: 'doc',
      },
    },

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/legal`,
        name: 'legal',
      },
    },

    'gatsby-transformer-sharp',

    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-plugin-sharp`,
          `gatsby-remark-copy-linked-files`,
          {
            resolve: 'gatsby-remark-emojis',
            options: {
              active: true,
              // Select the size (available size: 16, 24, 32, 64)
              size: 24,
              styles: {
                display: 'inline',
                margin: '0',
                'margin-top': '1px',
                position: 'relative',
                top: '5px',
                width: '24px',
              },
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: 60,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              linkImagesToOriginal: true,
              sizeByPixelDensity: false,
            },
          },
          {
            resolve: `gatsby-remark-normalize-relative-urls`,
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
            },
          },
          {
            resolve: 'gatsby-remark-toc',
            options: {
              include: ['src/docs/05_guides/01_building-plugins/06_sdk-reference.md'],
              mdastUtilTocOptions: {
                heading: 'Table of Contents',
              },
            },
          },
          {
            resolve: `gatsby-remark-images-datocms`,
            options: {
              apiToken: process.env.DATO_API_TOKEN,
              maxWidth: 900,
            },
          },
        ],
      },
    },

    `gatsby-plugin-catch-links`,
    `gatsby-plugin-netlify`,
    `gatsby-plugin-sitemap`,

    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-22858312-5`,
        anonymize: true,
      },
    },

    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: 'GTM-KDSG44T',
      },
    },

    {
      resolve: `gatsby-plugin-feed`,
      options: feeds,
    },

    {
      resolve: `gatsby-source-json`,
      options: {
        resolve: (createNode, digest) =>
          fetch('https://account-api.datocms.com/plans', {
            headers: { Accept: 'application/json' },
          })
            .then(res => res.json())
            .then(res => stringify(camelcaseKeys(res.data, { deep: true })))
            .then(blob =>
              createNode({
                id: 'Plans',
                children: [],
                parent: null,
                internal: {
                  type: 'Plans',
                  contentDigest: digest(blob),
                },
                body: blob,
              }),
            ),
      },
    },

    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/search/*`] },
    },

    `gatsby-plugin-netlify-cache`,
  ],
};
