import 'whatwg-fetch';
import React from 'react'
import parser from 'json-schema-ref-parser';
import sortBy from 'sort-by'
import Prism from 'prismjs'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-ruby'
import 'prismjs/components/prism-ruby'

import ScrollableAnchor from 'react-scrollable-anchor'
import { Link, Element } from 'react-scroll'
import humps from 'humps'
import pluralize from 'pluralize'

import bem from 'utils/bem'
import { Wrap, button, Space, text } from 'blocks'
import schemaExampleFor from 'utils/schemaExampleFor'

import './api.sass'

const b = bem.lock('ApiPage')

const methods = {
  instances: 'all',
  self: 'find'
};

const regexp = /{\(%2Fschemata%2F([^%]+).*$/g;

class ApiPage extends React.Component {
  constructor(props) {
    super(...props)
    this.state = {
      resources: null,
      activeLink: null
    };
  }

  componentDidMount() {
    fetch('https://site-api.datocms.com/docs/site-api-hyperschema.json')
      .then(r => r.json())
      .then(schema => parser.dereference(schema))
      .then(schema => {
        const resources = Object.entries(schema.properties)
          .map(([resource, resourceSchema]) => ({
            id: resource,
            ...resourceSchema,
            links: resourceSchema.links.filter(l => !l.private),
            position: resourceSchema.position || 99
          }))
          .filter(resource => resource.links.length > 0)
          .sort(sortBy('position'));

        this.setState({ resources });
      })
  }

  rubyCode(resource, link) {

    let params = [];
    let precode = [];

    let placeholders = [];
    let match = regexp.exec(link.href);

    while (match != null) {
      placeholders.push(match[1]);
      match = regexp.exec(link.href);
    }

    placeholders.forEach(placeholder => {
      precode.push(`${placeholder}_id = "43";`);
      params.push(`${placeholder}_id`);
    });

    const fix = string => string.replace(/^{/g, '').replace(/}$/g, '').replace(/": /g, '" => ')

    if (link.schema) {
      const example = schemaExampleFor(link.schema);

      if (link.method === 'GET') {
        params.push(fix(JSON.stringify(example, null, 2)));
      } else {
        const attrs = {
          ...(example.data.attributes || {}),
          ...Object.entries(example.data.relationships || {}).reduce((acc, [name, value]) => {
            acc[name] = value.data ? value.data.id : null;
            return acc;
          }, {})
        }

        params.push(fix(JSON.stringify(attrs, null, 2)));
      }
    }

    const namespace =
      resource.links.find(l => l.rel === 'instances') ?
        pluralize(resource.id) :
        resource.id;

    let call = `client.${namespace}.${methods[link.rel] || link.rel}`;
    if (params.length > 0) {
      call += `(${params.join(', ')})`;
    }

    let returnCode = '';

    if (link.targetSchema) {
      const example = schemaExampleFor(link.targetSchema);
      const variable = resource.id;

      if (Array.isArray(example.data)) {
        returnCode = `${call}.each do |${variable}|
  puts ${variable}.inspect
end`;
      } else {
        returnCode = `${variable} = ${call}

puts ${variable}.inspect`;
      }
    }

    const code = `
require "dato"
client = Dato::Site::Client.new("YOUR_API_READWRITE_TOKEN")
${precode.length > 0 ? '\n' : ''}${precode.join('\n')}${precode.length > 0 ? '\n' : ''}
${returnCode}
`

    return code;
  }

  jsCode(resource, link) {

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

    if (link.schema) {
      const example = schemaExampleFor(link.schema);

      if (link.method === 'GET') {
        params.push(JSON.stringify(example, null, 2));
      } else {
        const attrs = {
          ...humps.camelizeKeys(example.data.attributes) || {},
          ...Object.entries(example.data.relationships || {}).reduce((acc, [name, value]) => {
            acc[humps.camelize(name)] = value.data ? value.data.id : null;
            return acc;
          }, {})
        }

        params.push(JSON.stringify(attrs, null, 2));
      }
    }

    let returnCode;

    if (link.targetSchema) {
      const example = schemaExampleFor(link.targetSchema);

      if (Array.isArray(example.data)) {
        const singleVariable = humps.camelize(resource.id);
        const multipleVariable = humps.camelize(pluralize(resource.id));

        returnCode = `.then((${multipleVariable}) => {
  ${multipleVariable}.forEach((${singleVariable}) => {
    console.log(${singleVariable});
  });
})`;
      } else {
        const variable = humps.camelize(resource.id);

        returnCode = `.then((${variable}) => {
  console.log(${variable});
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

    const code = `
const SiteClient = require('datocms-client').SiteClient;
const client = new SiteClient('YOUR_API_READWRITE_TOKEN');
${precode.length > 0 ? '\n' : ''}${precode.join('\n')}${precode.length > 0 ? '\n' : ''}
client.${namespace}.${methods[link.rel] || link.rel}(${params.join(', ')})
${returnCode}
.catch((error) => {
  console.log(error);
})
    `

    return code;
  }

  renderExample() {
    const { resources, activeLink: { resourceId, linkIndex } } = this.state;
    const resource = resources.find(r => r.id === resourceId);
    const link = resource.links[linkIndex];

    return (
      <div>
        <div className={b('example-title')}>
          {resource.title} / <span className={b('example-link-title')}>{link.title}</span>
        </div>

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

        {
          link.schema && link.method === 'GET' &&
            <div className={b('http')}>
              <div className={b('http-title')}>
                Query string parameters
              </div>
              <table className={b('http-queries')}>
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

        <div className={b('http')}>
          <div className={b('http-title')}>
            Ruby example
          </div>

          <div className={b('example-code')}>
            <pre
              className="language-javascript"
              dangerouslySetInnerHTML={{
                __html: Prism.highlight(this.rubyCode(resource, link), Prism.languages.ruby)
              }}
            />
          </div>
        </div>

        <div className={b('http')}>
          <div className={b('http-title')}>
            Javascript example
          </div>

          <div className={b('example-code')}>
            <pre
              className="language-javascript"
              dangerouslySetInnerHTML={{
                __html: Prism.highlight(this.jsCode(resource, link), Prism.languages.javascript)
              }}
            />
          </div>
        </div>

        <div className={b('http')}>
          <div className={b('http-title')}>
            HTTP Request
          </div>

          <div className={b('http-headers')}>
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
        </div>

        {
          link.targetSchema &&
            <div className={b('http')}>
              <div className={b('http-title')}>
                HTTP Response
              </div>
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
            </div>
        }
      </div>
    );
  }

  renderMenu() {
    const { resources } = this.state;

    return (
      <ul>
        {
          resources.map(resource => (
            <li key={resource.id} className={b('menu-category')}>
              <Link
                href={`#${resource.id}`}
                to={resource.id}
                activeClass="active"
                spy
                hashSpy
                smooth
                duration={500}
                containerId="container"
                offset={-50}
              >
                {resource.title}
              </Link>
            </li>
          ))
        }
      </ul>
    );
  }

  renderSchema() {
    const { resources, activeLink } = this.state;

    return (
      <div>
        {
          resources.map(resource => (
            <Element
              key={resource.id}
              name={resource.id}
            >
              <div className={b('resource')}>
                <h2 className={b('resource-title')}>
                  {resource.title}
                </h2>
                <div>
                  {
                    resource.links.map((link, i) => (
                      <div
                        key={link.title}
                        className={
                          b(
                            'link',
                            {
                              active: (
                                activeLink &&
                                  activeLink.resourceId === resource.id &&
                                  activeLink.linkIndex === i
                              )
                            }
                          )
                        }
                        onClick={
                          () => this.setState({
                            activeLink: {
                              resourceId: resource.id,
                              linkIndex: i,
                            }
                          })
                        }
                      >
                        <h4 className={b('link-title')}>
                          {link.title}
                        </h4>
                        {link.description}
                      </div>
                    ))
                  }
                </div>
              </div>
            </Element>
          ))
        }
      </div>
    );
  }

  render() {
    const { data } = this.props;
    const { resources, activeLink } = this.state;

    return (
      <div className={b()}>
        <div className={b('menu')}>
          { resources && this.renderMenu() }
        </div>
        <div className={b('content')} id="container">
          { resources && this.renderSchema() }
        </div>
        <div className={b('example')}>
          { activeLink && this.renderExample() }
        </div>
      </div>
    );
  }
}

export default ApiPage
