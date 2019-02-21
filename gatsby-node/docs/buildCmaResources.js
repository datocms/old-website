const fetch = require('node-fetch');
const sortBy = require('sort-by');
const parser = require('json-schema-ref-parser');

const defaultLinksOrder = ['instances', 'self', 'create', 'update', 'destroy'];

const normalizeSchema = schema => {
  return Object.entries(schema.properties)
    .map(([resource, resourceSchema]) => ({
      id: resource,
      ...resourceSchema,
      attributes: resourceSchema.definitions.attributes
        ? resourceSchema.definitions.attributes.properties
        : {},
      links: resourceSchema.links
        .filter(l => !l.private)
        .map(link => ({
          ...link,
          position: defaultLinksOrder.includes(link.rel)
            ? defaultLinksOrder.indexOf(link.rel)
            : 99,
        }))
        .sort(sortBy('position')),
      position: resourceSchema.position || 99,
    }))
    .filter(resource => resource.links.length > 0)
    .sort(sortBy('position'));
};

module.exports = async function buildCmaResources() {
  const response = await fetch(
    'https://site-api.datocms.com/docs/site-api-hyperschema.json',
  );
  const schema = await response.json();
  const deferencedSchema = await parser.dereference(schema);
  return normalizeSchema(deferencedSchema);
};
