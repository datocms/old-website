const methods = {
  instances: 'all',
  self: 'find'
};

const regexp = /{\(%2Fschemata%2F([^%]+)[^}]*}/g;

class ApiMethod extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: true };
  }

  rubyCode(resource, link, allPages = false) {
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

    const fix = string => string.replace(/": /g, '" => ').replace(/null/g, 'nil')

    const deserialize = (data, withId = false) => {
      const id = withId ? { id: data.id } : {};

      const attrs = {
        ...id,
        ...(sortObject(data.attributes) || {}),
        ...sortObject(
          Object.entries(data.relationships || {}).reduce((acc, [name, value]) => {
            acc[name] = value.data ? value.data.id : null;
            return acc;
          }, {})
        )
      }

      return attrs;
    }

    if (link.schema) {
      const example = schemaExampleFor(link.schema, !allPages);

      if (link.method === 'GET') {
        params.push(fix(JSON.stringify(example, null, 2)));
        if (allPages && link.targetSchema && link.targetSchema.properties.meta) {
          params.push(fix(JSON.stringify({ all_pages: true }, null, 2)));
        }
      } else if (example.data) {
        params.push(fix(JSON.stringify(deserialize(example.data), null, 2)));
      }
    }

    const namespace =
      resource.links.find(l => l.rel === 'instances') ?
        pluralize(resource.id) :
        resource.id;

    let call = `client.${namespace}.${methods[link.rel] || link.rel}`;
    if (params.length > 0) {
      if (allPages) {
        call += `(\n${params.join(',\n').replace(/^/gm, '  ')}\n)`;
      } else {
        call += `(${params.join(', ')})`;
      }
    }

    let returnCode = '';

    if (link.targetSchema) {
      const example = schemaExampleFor(link.targetSchema);
      const variable = resource.id;

      if (Array.isArray(example.data)) {
        const result = JSON.stringify(deserialize(example.data[0], true), null, 2).replace(/^/gm, '    # ').replace(/": /g, '" => ').replace(/null/g, 'nil');

        returnCode = `${call}.each do |${variable}|
  puts ${variable}.inspect${!allPages ? "\n" + result : ''}
end`;
      } else {
        const result = JSON.stringify(deserialize(example.data, true), null, 2).replace(/^/gm, '# ').replace(/": /g, '" => ').replace(/null/g, 'nil');
        returnCode = `${variable} = ${call}

puts ${variable}.inspect
${!allPages ? result : ''}
`;
      }
    }

    if (!allPages) {
      const code = `
require "dato"
client = Dato::Site::Client.new("YOUR-API-KEY")
${precode.length > 0 ? '\n' : ''}${precode.join('\n')}${precode.length > 0 ? '\n' : ''}
${returnCode}
${
  link.targetSchema && link.targetSchema.properties.meta ?
    '\n\n# if you want to fetch all the pages with just one call:\n\n' + this.rubyCode(resource, link, true) :
    ''
}`
      return code;
    } else {
      return returnCode;
    }

    return '';
  }

  jsCode(resource, link, allPages = false) {
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
    '\n\n// if you want to fetch all the pages with just one call:\n' + this.jsCode(resource, link, true) :
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

  render() {
    const { resource, link } = this.props;

    if (!resource || !link) {
      return null;
    }

    return (
      <div>
        <div className={b('example-title')}>
          {link.description}
        </div>

        {
          link.schema && link.method === 'GET' &&
            <div className={b('http')}>
              <div className={b('http-title')}>
                Query string parameters
              </div>
              <div className={b('attributes')}>
                <tbody>
                  {
                    Object.entries(schemaExampleFor(link.schema)).map(([name, example]) => (
                      <tr key={name} className={b('http-query')}>
                        <th className={b('http-query-name')}>
                          {name}
                        </th>
                        <td className={b('http-query-description')}>
                          {link.schema.properties[name].description}
                        </td>
                        <td className={b('http-query-example')}>
                          Example: <span>{example}</span>
                        </td>
                        <td className={b('http-query-type')}>
                          {link.schema.properties[name].type}
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
        }

        {
          this.state.open &&
            <div>

              <Http title="HTTP Request">
                <div className={b('example-call')}>
                  <span className={b('example-method')}>
                    {link.method}
                  </span>

                  <span
                    dangerouslySetInnerHTML={{
                      __html: 'https://site-api.datocms.com' + link.href.replace(regexp, '<span class="ApiPage__placeholder">:$1_id</span>')
                    }}
                  />
                </div>

                <div className={b('http-headers')}>
                  <div className={b('http-header')}>
                    <div className={b('http-header-name')}>
                      X-Api-Version:
                    </div>
                    <div className={b('http-header-value')}>
                      2
                    </div>
                  </div>
                  <div className={b('http-header')}>
                    <div className={b('http-header-name')}>
                      Authorization:
                    </div>
                    <div className={b('http-header-value')}>
                      Bearer <span className={b('placeholder')}>YOUR-API-KEY</span>
                    </div>
                  </div>
                  <div className={b('http-header')}>
                    <div className={b('http-header-name')}>
                      Accept:
                    </div>
                    <div className={b('http-header-value')}>
                      application/json
                    </div>
                  </div>
                  {
                    link.schema && link.method !== 'GET' &&
                      <div className={b('http-header')}>
                        <div className={b('http-header-name')}>
                          Content-Type:
                        </div>
                        <div className={b('http-header-value')}>
                          application/json
                        </div>
                      </div>
                  }
                </div>

                {
                  link.schema && link.method !== 'GET' &&
                    <div className={b('example-code')}>
                      <pre
                        className="language-json"
                        dangerouslySetInnerHTML={{
                          __html: Prism.highlight(
                            JSON.stringify(schemaExampleFor(link.schema), null, 2),
                            Prism.languages.json
                          )
                        }}
                      />
                    </div>
                }
              </Http>

              {
                link.targetSchema &&
                  <Http title="HTTP Response">
                    <div className={b('example-code')}>
                      <pre
                        className="language-json"
                        dangerouslySetInnerHTML={{
                          __html: Prism.highlight(
                            JSON.stringify(schemaExampleFor(link.targetSchema), null, 2),
                            Prism.languages.json
                          )
                        }}
                      />
                    </div>
                  </Http>
              }
              <Http title="JS client example">
                <div className={b('example-code')}>
                  <pre
                    className="language-javascript"
                    dangerouslySetInnerHTML={{
                      __html: Prism.highlight(this.jsCode(resource, link), Prism.languages.javascript)
                    }}
                  />
                </div>
              </Http>

              <Http title="Ruby client example">
                <div className={b('example-code')}>
                  <pre
                    className="language-javascript"
                    dangerouslySetInnerHTML={{
                      __html: Prism.highlight(this.rubyCode(resource, link), Prism.languages.ruby)
                    }}
                  />
                </div>
              </Http>
            </div>
        }
      </div>
    );
  }
}

class Http extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleToggle(e) {
    e.preventDefault();
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
      <div className={b('http')}>
        <a href="#" onClick={this.handleToggle.bind(this)} className={b('http-title', { open: this.state.open })}>
          {this.props.title}
        </a>
        { this.state.open && this.props.children }
      </div>
    );
  }
}


