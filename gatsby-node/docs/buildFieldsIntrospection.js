const fetch = require('node-fetch');

module.exports = async function buildFieldsIntrospection() {
  const response = await fetch('https://internal.datocms.com/introspection/field-filters');
  return await response.json();
}
