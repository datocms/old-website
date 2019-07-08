const redirectMappings = {
  '/how-it-works': '/docs',
  '/legal/privacy':
    'https://www.iubenda.com/privacy-policy/64648824/full-legal',
  '/legal/privacy-policy':
    'https://www.iubenda.com/privacy-policy/64648824/full-legal',
  '/why-static': '/',
  '/gallery': '/use-cases',
  '/api/*': '/docs/content-management-api/:splat',
  '/content-management-api/*': '/docs/content-management-api/:splat',
  '/docs/graphql/*': '/docs/content-delivery-api/:splat',
  '/docs/deployment/introduction': '/docs/general-concepts/deployment',
  '/docs/deployment/custom': '/docs/deployments/custom-webhook',
  '/docs/deployment/*': '/docs/deployments/:splat',
  '/docs/import': '/docs/guides',
  '/docs/jekyll/*': '/docs/static-generators/jekyll/:splat',
  '/docs/gatsby/*': '/docs/static-generators/gatsbyjs/:splat',
  '/docs/hugo/*': '/docs/static-generators/hugo/:splat',
  '/docs/middleman/*': '/docs/static-generators/middleman/:splat',
  '/docs/metalsmith/*': '/docs/static-generators/metalsmith/:splat',
  '/docs/other/*': '/docs/static-generators/other-ssg/:splat',
  '/cms/spike/*': '/docs/static-generators/other-ssg',
  '/docs/plugins/configuration-parameters': '/docs/guides/building-plugins/creating-a-new-plugin#configuration-parameters',
  '/docs/plugins/*': '/docs/guides/building-plugins/:splat',
  '/docs/search/*': '/docs/guides/installing-site-search/:splat',
  '/docs/introduction/*': '/docs/general-concepts/:splat',
  '/docs/backups': '/docs/guides/offline-backups',
  '/docs/general-concepts/links': '/docs/content-modelling/links',
  '/docs/general-concepts/trees': '/docs/content-modelling/trees',
  '/docs/general-concepts/modular-content':
    '/docs/content-modelling/modular-content',
  '/docs/general-concepts/single-instance':
    '/docs/content-modelling/single-instance',
  '/docs/general-concepts/data-migration':
    '/docs/content-modelling/data-migration',
  '/docs/general-concepts/data-model': '/docs/general-concepts/data-modelling',
  '/docs/general-concepts/custom-assets-domain': '/docs/guides/custom-assets-domain',
  '/docs/import/nodejs': '/docs/content-management-api/js-client',
  '/docs/guides/building-plugins/introduction': '/docs/guides/building-plugins',
  '/docs/static-websites': '/docs/general-concepts',
  '/blog/more-control-on-your-pricing-plan': '/blog/more-control-over-your-pricing-plan',
};

module.exports = function redirects({ actions: { createRedirect } }) {
  Object.entries(redirectMappings).forEach(([fromPath, toPath]) => {
    createRedirect({
      fromPath,
      toPath,
      isPermanent: true,
      redirectInBrowser: process.env.NODE_ENV == 'development',
    });
  });
};
