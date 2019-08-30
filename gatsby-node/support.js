const p = require('path');

module.exports = async function support({ actions: { createPage } }) {
  const urls = ['support', 'support-success', 'support-error']

  urls.forEach(url => {
    createPage({
      path: url,
      component: p.resolve(`./src/templates/SupportPage/index.js`),
    });
  });
};
