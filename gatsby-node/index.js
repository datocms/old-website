const blog = require('./blog');
const changelog = require('./changelog');
const docs = require('./docs');
const landing = require('./landing');
const legal = require('./legal');
const plugins = require('./plugins');
const redirects = require('./redirects');
const cma = require('./cma');

exports.createPages = async function (options) {
  const sections = [
    blog,
    changelog,
    docs,
    landing,
    legal,
    plugins,
    redirects,
    cma,
  ];

  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    console.log(`## Building ${section.name}...`);
    await section(options);
  }
}
