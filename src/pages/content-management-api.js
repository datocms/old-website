import 'whatwg-fetch';
import React from 'react'
import Prism from 'prismjs'
import { graphql, Link } from 'gatsby'
import sortObject from 'sort-object'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-ruby'
import logo from 'images/dato_logo_full.svg'
import Helmet from 'react-helmet'
import { Link as ScrollLink, Element } from 'react-scroll'
import humps from 'humps'
import pluralize from 'pluralize'
import { parse } from 'flatted/cjs';

import bem from 'utils/bem'
import schemaExampleFor from 'utils/schemaExampleFor'
import buildCmaResources from 'utils/buildCmaResources'

import './content-management-api.sass'

// import apiTokenImage from '../docs/images/api-token.png';

const b = bem.lock('ApiPage')

const methods = {
  instances: 'all',
  self: 'find'
};

const regexp = /{\(%2Fschemata%2F([^%]+)[^}]*}/g;

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

class ApiPage extends React.Component {
  constructor(props) {
    super(...props)

    if (props.location.hash) {
      const chunks = props.location.hash.substr(1).split("-");

      this.state = {
        resources: parse(props.data.resources.body),
        activeLink: {
          resourceId: chunks[0],
          linkIndex: parseInt(chunks[1])
        }
      };
    } else {
      this.state = {
        resources: parse(props.data.resources.body),
        activeLink: null
      };
    }
  }

  componentDidMount() {
    buildCmaResources(fetch).then(resources => {
      this.setState({ resources });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.hash !== nextProps.location.hash) {
      const chunks = nextProps.location.hash.substr(1).split("-");

      this.setState({
        activeLink: {
          resourceId: chunks[0],
          linkIndex: parseInt(chunks[1])
        }
      });
    }
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

  renderExample() {
    const { resources, activeLink: { resourceId, linkIndex } } = this.state;

    const resource = resources && resources.find(r => r.id === resourceId);
    const link = resource && resource.links[linkIndex];

    if (!resource || !link) {
      return null;
    }

    return (
      <div>
        <div className={b('example-title')}>
          {resource.title} / <span className={b('example-link-title')}>{link.description}</span>
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

        <Http title="HTTP Request">
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
    );
  }

  renderMenu() {
    const { resources } = this.state;

    return (
      <div >
        <ul>
          <li className={b('menu-category')}>
            <ScrollLink
              href={`#overview`}
              to="overview"
              activeClass="active"
              spy
              smooth
              duration={500}
              containerId="container"
              offset={-50}
            >
              Overview
            </ScrollLink>
          </li>
          <li className={b('menu-category')}>
            <ScrollLink
              href={`#authentication`}
              to="authentication"
              activeClass="active"
              spy
              smooth
              duration={500}
              containerId="container"
              offset={-50}
            >
              Authentication
            </ScrollLink>
          </li>
          <li className={b('menu-category')}>
            <ScrollLink
              href={`#rate-limits`}
              to="rate-limits"
              activeClass="active"
              spy
              smooth
              duration={500}
              containerId="container"
              offset={-50}
            >
              API rate limits
            </ScrollLink>
          </li>
          <li className={b('menu-category')}>
            <ScrollLink
              href={`#schema`}
              to="schema"
              activeClass="active"
              spy
              smooth
              duration={500}
              containerId="container"
              offset={-50}
            >
              JSON Schema
            </ScrollLink>
          </li>
          <li className={b('menu-category', { spacer: true })}>
            <ScrollLink
              href={`#clients`}
              to="clients"
              activeClass="active"
              spy
              smooth
              duration={500}
              containerId="container"
              offset={-50}
            >
              Official clients
            </ScrollLink>
          </li>
          {
            resources.map(resource => (
              <li key={resource.id} className={b('menu-category')}>
                <ScrollLink
                  href={`#${resource.id}`}
                  to={resource.id}
                  activeClass="active"
                  spy
                  smooth
                  duration={500}
                  containerId="container"
                  offset={-50}
                >
                  {resource.title}
                </ScrollLink>
              </li>
            ))
          }
        </ul>
        <div className={b('menu-back')}>
          <Link to="/docs">
            ‹ Go back to docs
          </Link>
        </div>
      </div>
    );
  }

  renderAttribute(name, schema) {
    let schemaType = schema.type || [];

    if (!Array.isArray(schema.type)) {
      schemaType = [schemaType];
    }

    schemaType = schemaType.filter(type => type);

    return (
      <div key={name} className={b('attribute')}>
        <div className={b('attribute-left')}>
          <div className={b('attribute-name')}>
            {name}
          </div>
          <div className={b('attribute-type')}>
            {schemaType.sort().join(', ')}
          </div>
        </div>
        <div className={b('attribute-right')}>
          {
            schema.description &&
              <div className={b('attribute-description')}>
                {schema.description}
              </div>
          }
          {
            schema.example &&
              <div className={b('attribute-example')}>
                Example:
                {
                  JSON.stringify(schema.example, null, 2).split(/\r\n|\r|\n/).length === 1 ?
                    <span>&nbsp;{JSON.stringify(schema.example)}</span>
                    :
                    <div className={b('attribute-example-code')}>
                      <pre
                        className="language-javascript"
                        dangerouslySetInnerHTML={{
                          __html: Prism.highlight(
                            JSON.stringify(schema.example, null, 2),
                            Prism.languages.javascript
                          )
                        }}
                      />
                    </div>
                }
              </div>
          }
        </div>
      </div>
    );
  }

  renderSchema() {
    const { resources, activeLink } = this.state;

    return (
      <div>
        <div className={b('title')}>
          Content Management API
        </div>

        <Element name="overview">
          <div className={b('resource')}>
            <h2 className={b('resource-title')}>
              Overview
            </h2>
            <div className={b('resource-description')}>
              <p>
                DatoCMS is a headless, API-first content management system (CMS)
                that provides everything you need to power your web or mobile projects.
                To learn more about DatoCMS, visit <Link to="/">our website</Link> or
                refer <Link to="/docs/">to our documentation site</Link> to understand
                what we do.
              </p>
              <p>
                This document is a detailed reference to DatoCMS's Content
                Management API.
              </p>
              <p>
                The Content Management API is used to manage the content of your
                DatoCMS projects. This includes creating, updating, deleting, and
                fetching content of your projects. To use the Content Management
                API, you will need to authenticate yourself with an API token.
                Read more about it in <Link to="/content-management-api/#authentication">Authentication</Link>.
              </p>
              <p>
                The Content Management APIs also include many GET requests.
                However, it is highly recommended that you always use the&nbsp;
                <Link to="/docs/content-delivery-api/">Content Delivery API</Link> to deliver
                content to your public-facing web or mobile projects.
              </p>
            </div>
          </div>
        </Element>

        <Element name="authentication">
          <div className={b('resource')}>
            <h2 className={b('resource-title')}>
              Authentication
            </h2>
            <div className={b('resource-description')}>
              <p>
                In order to make any Content Management API (CMA) requests,
                you need to first obtain a full-access API token. To retrieve
                this API token, enter your project administrative area
                (ie. http://your-project.admin.datocms.com) and go to the&nbsp;
                <em>Settings > API Tokens</em> section:
              </p>
              <p>
                {/* <img src={apiTokenImage} /> */}
              </p>
              <p>
                Once you have the API Token, you need to pass it as a header
                in each Content Management API request.
              </p>
            </div>
          </div>
        </Element>

        <Element name="rate-limits">
          <div className={b('resource')}>
            <h2 className={b('resource-title')}>
              API rate limits
            </h2>
            <div className={b('resource-description')}>
              <p>
                API Rate limits specify the number of requests a client can make to DatoCMS APIs in a specific time frame.
                By default the Management API enforces rate limits of 30 requests per 3 seconds. Higher rate limits may apply depending on your current plan.
              </p>
              <p>
                The following table lists all headers returned in every response by the Content Management API which give a client information on rate limiting:
              </p>
              <table>
                <thead>
                  <tr>
                    <th>Header</th><th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>X-RateLimit-Limit</th><td>The maximum amount of requests which can be made in 3 seconds.</td>
                  </tr>
                  <tr>
                    <th>X-RateLimit-Remaining</th><td>The remaining amount of requests which can be made until the next 3-seconds reset.</td>
                  </tr>
                  <tr>
                    <th>X-RateLimit-Reset</th><td>If present, indicates the number of seconds until the next request can be made.</td>
                  </tr>
                </tbody>
              </table>
              <p>
                When a client gets rate limited, the API responds with the <code>429 Too Many Requests</code> HTTP status code and sets the
                value <code>X-RateLimit-Reset</code> header to an integer larger than 0 specifying the time before the limit
                resets and another request will be accepted.
              </p>
              <p>
                Our Ruby and JS API clients take care of rate limit errors and will automatically retry the request after the
                right amount of time.
              </p>
            </div>
          </div>
        </Element>

        <Element name="schema">
          <div className={b('resource')}>
            <h2 className={b('resource-title')}>
              JSON Schema
            </h2>
            <div className={b('resource-description')}>
              <p>
                The Content Management API exposes a machine-readable JSON
                schema that describes what resources are available via the API,
                what their URLs are, how they are represented and what operations
                they support.
              </p>
              <p>
                This schema follows the <a href="http://json-schema.org/">JSON Schema format</a>,
                combined with the draft <a href="http://tools.ietf.org/html/draft-fge-json-schema-validation-00">Validation</a> and&nbsp;
                <a href="http://tools.ietf.org/html/draft-luff-json-hyper-schema-00">Hypertext</a> extensions.
              </p>
              <p>
                The latest version of the API schema will always be available at the
                following URL:
              </p>
              <div className={b('resource-url')}>
                https://site-api.datocms.com/docs/site-api-hyperschema.json
              </div>
            </div>
          </div>
        </Element>


        <Element name="clients">
          <div className={b('resource')}>
            <h2 className={b('resource-title')}>
              Official clients
            </h2>
            <div className={b('resource-description')}>
              <p>
                DatoCMS ships with an official API client for <a href="https://github.com/datocms/js-datocms-client">Javascript</a> and <a href="https://github.com/datocms/ruby-datocms-client">Ruby</a>.
                In this document you will find examples of usage with both clients for each endpoint the API exposes.
              </p>
              <p>
                Both clients are built upon the API <Link to="/content-management-api/#schema">JSON Schema</Link>, so they're guaranteed to be up-to-date with the API itself.
              </p>
            </div>
          </div>
        </Element>

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
                <div className={b('resource-description')}>
                  {resource.description}
                </div>

                <div className={b('resource-section')}>
                  <div className={b('resource-section-title')}>
                    API Methods
                  </div>
                  <div>
                    {
                      resource.links.map((link, i) => (
                        <a
                          key={link.title}
                          href={`#${resource.id}-${i}`}
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
                        >
                          <h4 className={b('link-title')}>
                            {link.description}
                          </h4>
                        </a>
                      ))
                    }
                  </div>
                </div>

                <div className={b('resource-section')}>
                  <div className={b('resource-section-title')}>
                    Resource Attributes
                  </div>
                  <div className={b('attributes')}>
                    {
                      Object.entries(sortObject(resource.attributes)).map(([name, schema]) => (
                        this.renderAttribute(name, schema)
                      ))
                    }
                  </div>
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
        <Helmet title="DatoCMS">
          <title>Content Management API Reference - DatoCMS</title>
        </Helmet>
        <div className={b('menu')}>
          <Link className={b('logo')} to="/">
            <img src={logo} />
          </Link>
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

export const query = graphql`
query ApiPageQuery {
  resources: cmaResources {
    body
  }
}
`
