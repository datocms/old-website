import React from 'react';
import Prism from 'prismjs';
import humps from 'humps'
import sortObject from 'sort-object'
import pluralize from 'pluralize'
import bem from 'utils/bem'

import schemaExampleFor from 'utils/schemaExampleFor'

const regexp = /{\(%2Fschemata%2F([^%]+)[^}]*}/g;

const methods = {
  instances: 'all',
  self: 'find'
};

const b = bem.lock('ApiPage')

function example(resource, link, allPages = false) {
  let params = [];
  let precode = [];

  let placeholders = [];
  let match = regexp.exec(link.href);

  while (match != null) {
    placeholders.push(match[1]);
    match = regexp.exec(link.href);
  }

  placeholders.forEach(placeholder => {
    precode.push(`const ${humps.camelize(placeholder)}Id = '43';`);
    params.push(`${humps.camelize(placeholder)}Id`);
  });

  const deserialize = (data, withId = false) => {
    const id = withId ? { id: data.id } : {};

    const attrs = {
      ...id,
      ...sortObject(humps.camelizeKeys(data.attributes) || {}),
      ...sortObject(
        Object.entries(data.relationships || {}).reduce((acc, [name, value]) => {
          acc[humps.camelize(name)] = value.data ? value.data.id : null;
          return acc;
        }, {})
      )
    }
    return attrs;
  }

  if (link.schema) {
    const example = schemaExampleFor(link.schema, !allPages);

    if (link.method === 'GET') {
      params.push(JSON.stringify(example, null, 2));
      if (allPages && link.targetSchema && link.targetSchema.properties.meta) {
        params.push(JSON.stringify({ allPages: true }, null, 2));
      }
    } else if (example.data) {
      params.push(JSON.stringify(deserialize(example.data), null, 2));
    }
  }

  let returnCode;

  if (link.targetSchema) {
    const example = schemaExampleFor(link.targetSchema);

    if (Array.isArray(example.data)) {
      const singleVariable = humps.camelize(resource.id);
      const multipleVariable = humps.camelize(pluralize(resource.id));

      const result = JSON.stringify(deserialize(example.data[0], true), null, 2).replace(/^/gm, '    // ');

      returnCode = `.then((${multipleVariable}) => {
${multipleVariable}.forEach((${singleVariable}) => {
  console.log(${singleVariable});${!allPages ? "\n" + result : ''}
});
})`;
    } else {
      const variable = humps.camelize(resource.id);
      const result = JSON.stringify(deserialize(example.data, true), null, 2).replace(/^/gm, '  // ');;

      returnCode = `.then((${variable}) => {
console.log(${variable});${!allPages ? "\n" + result : ''}
})`;
    }
  } else {
    returnCode = `.then(() => {
console.log('Done!');
})`;

  }

  const namespace =
    resource.links.find(l => l.rel === 'instances') ?
      humps.camelize(pluralize(resource.id)) :
      humps.camelize(resource.id);

  if (!allPages) {
    const code = `
const SiteClient = require('datocms-client').SiteClient;
const client = new SiteClient("YOUR-API-KEY");
${precode.length > 0 ? '\n' : ''}${precode.join('\n')}${precode.length > 0 ? '\n' : ''}
client.${namespace}.${methods[link.rel] || link.rel}(${params.join(', ')})
${returnCode}
.catch((error) => {
console.log(error);
});
${
link.targetSchema && link.targetSchema.properties.meta ?
  '\n\n// if you want to fetch all the pages with just one call:\n' + example(resource, link, true) :
  ''
}`;
    return code;
  } else {
    const code = `
client.${namespace}.${methods[link.rel] || link.rel}(${params.join(', ')})
${returnCode}`;
    return code;
  }
}

export default function JsExample({ resource, link }) {
  return (
    <div className={b('example-code')}>
      <pre
        className="language-javascript"
        dangerouslySetInnerHTML={
          {
            __html: Prism.highlight(example(resource, link), Prism.languages.javascript)
          }
        }
      />
    </div>
  );
}
