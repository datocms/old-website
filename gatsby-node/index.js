const blog = require('./blog');
const changelog = require('./changelog');
const docs = require('./docs');
const landing = require('./landing');
const legal = require('./legal');
const plugins = require('./plugins');
const support = require('./support');
const redirects = require('./redirects');

exports.createPages = async function(options) {
  const sections = [blog, changelog, docs, landing, legal, plugins, support, redirects];

  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    console.log(`## Building ${section.name}...`);
    await section(options);
  }
};
