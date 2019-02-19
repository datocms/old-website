const redirects = {
  "/how-it-works/": "/docs/",
  "/legal/privacy/": "https://www.iubenda.com/privacy-policy/64648824/full-legal",
  "/legal/privacy-policy/": "https://www.iubenda.com/privacy-policy/64648824/full-legal",
  "/why-static/": "/",
  "/gallery/": "/use-cases/",
  "/api/*": "/docs/content-management-api/:splat",
  "/content-management-api/*": "/docs/content-management-api/:splat",
  "/docs/graphql/*": "/docs/content-delivery-api/:splat",
  "https://v2.datocms.com/*": "https://www.datocms.com/:splat"
}

module.exports = function redirects({ actions: { createRedirect } }) {
  Object.entries(redirects).forEach(([fromPath, toPath]) => {
    createRedirect({ fromPath, toPath, isPermanent: true });
  });
}

