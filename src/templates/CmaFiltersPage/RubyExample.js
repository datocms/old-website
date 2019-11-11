import React from 'react';
import Prism from 'prismjs';
import sortObject from 'sort-object';
import pluralize from 'pluralize';
import bem from 'utils/bem';

import 'prismjs/components/prism-ruby';

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
    precode.push(`${placeholder}_id = "43"`);
    params.push(`${placeholder}_id`);
  });

  // const fix = string => string.replace(/": /g, '" => ').replace(/null/g, 'nil');

  const deserialize = (data, withId = false) => {
    const id = withId ? { id: data.id } : {};

    const attrs = {
      ...id,
      ...(sortObject(data.attributes) || {}),
      ...sortObject(
        Object.entries(data.relationships || {}).reduce(
          (acc, [name, value]) => {
            acc[name] = value.data ? value.data.id : null;
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
  //   params.push(fix(JSON.stringify(example, null, 2)));

  //   if (allPages && link.targetSchema && link.targetSchema.properties.meta) {
  //     params.push(fix(JSON.stringify({ all_pages: true }, null, 2)));
  //   }
  // }

  // if (link.schema) {
  //   const example = schemaExampleFor(link.schema, !allPages);

  //   if (example.data) {
  //     params.push(fix(JSON.stringify(deserialize(example.data), null, 2)));
  //   }
  // }

  const filterObject = `{
  "filter[${filter.name}][${filter.type}]": "${filter.exampleValue}"
}`;
  params.push(filterObject);

  const namespace = resource.links.find(l => l.rel === 'instances')
    ? pluralize(resource.id)
    : resource.id;

  let call = `client.${namespace}.${methods[link.rel] || link.rel}`;
  if (params.length > 0) {
    
    call += `(${params.join(', ')})`;
  }

  let returnCode = '';
  let output;

  if (link.targetSchema) {
    const example = schemaExampleFor(link.targetSchema);
    const variable = resource.id;

    if (Array.isArray(example.data)) {
      output = JSON.stringify(deserialize(example.data[0], true), null, 2)
        .replace(/": /g, '" => ')
        .replace(/null/g, 'nil');

      returnCode = `${call}.each do |${variable}|
  puts ${variable}.inspect
end`;
    } else {
      output = JSON.stringify(deserialize(example.data, true), null, 2)
        .replace(/": /g, '" => ')
        .replace(/null/g, 'nil');
      returnCode = `${variable} = ${call}

puts ${variable}.inspect
`;
    }
  }

  return { code: returnCode, output };
}

export default function RubyExample({ resource, filter }) {
  const { code, output } = example(resource, resource.links[0], filter);

  const outputWithRun = `> ruby example.rb\n\n${output}`;

  return (
    <div className={b()}>
      {example.title &&
        <h6 className={b('title')}>{example.title}</h6>
      }
      <div className={b('snippet')}>
        <pre className="language-ruby">
          <code
            dangerouslySetInnerHTML={{
              __html: Prism.highlight(
                code,
                Prism.languages.ruby,
              ),
            }}
          />
        </pre>
      </div>
      <div className={b('snippet')}>
        <div className={b('snippet__title')}>
          Result
        </div>
        <pre className="language-ruby">
          <code
            dangerouslySetInnerHTML={{
              __html: Prism.highlight(
                outputWithRun,
                Prism.languages.ruby,
              ),
            }}
          />
        </pre>
      </div>
    </div>
  );
}
