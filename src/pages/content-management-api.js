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
import Img from 'gatsby-image'

import bem from 'utils/bem'
import schemaExampleFor from 'utils/schemaExampleFor'
import buildCmaResources from 'utils/buildCmaResources'

import Resource from 'components/cma/Resource'

import './content-management-api.sass'

const b = bem.lock('ApiPage')

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

  renderMenu() {
    const { resources } = this.state;

    return (
      <div >
        <ul>
          <li className={b('menu-category')}>
            <a href="#overview">Overview</a>
          </li>
          <li className={b('menu-category')}>
            <a href="#authentication">
              Authentication
            </a>
          </li>
          <li className={b('menu-category')}>
            <a href="#rate-limits">
              API rate limits
            </a>
          </li>
          <li className={b('menu-category')}>
            <a href="#schema">
              JSON Schema
            </a>
          </li>
          <li className={b('menu-category', { spacer: true })}>
            <a href="#clients">Official clients</a>
          </li>
          {
            resources.map(resource => (
              <li key={resource.id} className={b('menu-category')}>
                <a href={`#${resource.id}`}>
                  {resource.title}
                </a>
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

  renderSchema() {
    const { resources, activeLink } = this.state;
    const { data } = this.props;

    return (
      <div className={b('content__text-block')}>
        <div className={b('title')}>
          Content Management API
        </div>

        <a id="overview" />
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

        <a id="authentication" />
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
              <Img fluid={data.apiTokenImage.childImageSharp.fluid} />
            </p>
            <p>
              Once you have the API Token, you need to pass it as a header
              in each Content Management API request.
            </p>
          </div>
        </div>

        <a id="rate-limits" />
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

        <a id="schema" />
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

        <a id="clients" />
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

        {
          resources.map(resource => (
            <React.Fragment key={resource.id}>
              <a id={resource.id} />
              <Resource resource={resource} />
            </React.Fragment>
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
        <div className={b('content')}>
          { resources && this.renderSchema() }
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
  apiTokenImage: file(relativePath: { eq: "images/api-token.png" }) {
    childImageSharp {
      fluid(maxWidth: 800) {
        ...GatsbyImageSharpFluid
      }
    }
  }
}
`
