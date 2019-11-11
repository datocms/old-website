import React from 'react';
import Prism from 'prismjs';
import humps from 'humps';
import sortObject from 'sort-object';
import pluralize from 'pluralize';
import bem from 'utils/bem';

import schemaExampleFor from 'utils/schemaExampleFor';

import './HttpExample.sass';

const b = bem.lock('HttpExample');

const regexp = /{\(%2Fschemata%2F([^%]+)[^}]*}/g;

const methods = {
  instances: 'all',
  self: 'find',
};

function example(resource, link, filter) {
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
        Object.entries(data.relationships || {}).reduce(
          (acc, [name, value]) => {
            acc[humps.camelize(name)] = value.data ? value.data.id : null;
            return acc;
          },
          {},
        ),
      ),
    };
    return attrs;
  };

  // if (link.hrefSchema) {
  //   const example = schemaExampleFor(link.hrefSchema, !allPages);
  //   params.push(JSON.stringify(example, null, 2));

  // }

  // if (link.schema) {
  //   const example = schemaExampleFor(link.schema, !allPages);

  //   if (example.data) {
  //     params.push(JSON.stringify(deserialize(example.data), null, 2));
  //   }
  // }
  const filterObject = `{
  "filter[${filter.name}][${filter.type}]": "${filter.exampleValue}"
}`;
  params.push(filterObject);

  let returnCode, output;

  if (link.targetSchema) {
    const example = schemaExampleFor(link.targetSchema);

    if (Array.isArray(example.data)) {
      const singleVariable = humps.camelize(resource.id);
      const multipleVariable = humps.camelize(pluralize(resource.id));

      output = JSON.stringify(deserialize(example.data[0], true), null, 2);

      returnCode = `  .then((${multipleVariable}) => {
    ${multipleVariable}.forEach((${singleVariable}) => {
      console.log(${singleVariable});
    });
  })`;
    } else {
      const variable = humps.camelize(resource.id);
      output = JSON.stringify(deserialize(example.data, true), null, 2);

      returnCode = `  .then((${variable}) => {
    console.log(${variable});
  })`;
    }
  } else {
    returnCode = `  .then(() => {
    console.log('Done!');
  })`;
  }

  const namespace = resource.links.find(l => l.rel === 'instances')
    ? humps.camelize(pluralize(resource.id))
    : humps.camelize(resource.id);

  const action = humps.camelize(methods[link.rel] || link.rel);

  const code = `const SiteClient = require('datocms-client').SiteClient;
const client = new SiteClient("YOUR-API-KEY");
${precode.length > 0 ? '\n' : ''}${precode.join('\n')}${
    precode.length > 0 ? '\n' : ''
  }
client.${namespace}.${action}(${params.join(', ')})
${returnCode}
.catch((error) => {
  console.log(error);
});`;
  return { code, output };
}

export default function JsExample({ resource, filter }) {

  const { code, output } = example(resource, resource.links[0], filter);

  const outputWithRun = `> node example.js\n\n${output}`;

  return (
    <div className={b()}>
      <div className={b('snippet')}>
        <pre className="language-javascript">
          <code
            dangerouslySetInnerHTML={{
              __html: Prism.highlight(
                code,
                Prism.languages.javascript,
              ),
            }}
          />
        </pre>
      </div>
      <div className={b('snippet')}>
        <div className={b('snippet__title')}>
          Result
        </div>
        <pre className="language-javascript">
          <code
            dangerouslySetInnerHTML={{
              __html: Prism.highlight(
                outputWithRun,
                Prism.languages.javascript,
              ),
            }}
          />
        </pre>
      </div>
    </div>
  );
}
