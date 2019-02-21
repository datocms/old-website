const redirects = {
  '/how-it-works/': '/docs/',
  '/legal/privacy/':
    'https://www.iubenda.com/privacy-policy/64648824/full-legal',
  '/legal/privacy-policy/':
    'https://www.iubenda.com/privacy-policy/64648824/full-legal',
  '/why-static/': '/',
  '/gallery/': '/use-cases/',
  '/api/*': '/docs/content-management-api/:splat',
  '/content-management-api/*': '/docs/content-management-api/:splat',
  '/docs/graphql/*': '/docs/content-delivery-api/:splat',
  '/docs/deployment/*': '/docs/depoyments/:splat',
  '/docs/import': '/docs/guides',
  '/docs/jekyll/*': '/docs/static-generators/jekyll/:splat',
  '/docs/gatsby/*': '/docs/static-generators/gatsbyjs/:splat',
  '/docs/hugo/*': '/docs/static-generators/hugo/:splat',
  '/docs/middleman/*': '/docs/static-generators/middleman/:splat',
  '/docs/metalsmith/*': '/docs/static-generators/metalsmith/:splat',
  '/docs/plugins/*': '/docs/guides/building-plugins/:splat',
  '/docs/search/*': '/docs/guides/installing-site-search/:splat',
};

module.exports = function redirects({ actions: { createRedirect } }) {
  Object.entries(redirects).forEach(([fromPath, toPath]) => {
    createRedirect({ fromPath, toPath, isPermanent: true });
  });
};
