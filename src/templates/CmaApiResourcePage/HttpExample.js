import React from 'react';
import bem from 'utils/bem';
import schemaExampleFor from 'utils/schemaExampleFor';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import queryString from 'qs';

import './HttpExample.sass';

const b = bem.lock('HttpExample');

const regexp = /{\(%2Fschemata%2F([^%]+)[^}]*}/g;

const toParam = schema => {
  const params = (
    schema.required ||
    Object.keys(schema.properties).slice(0, 2)
  ).reduce((acc, k) => {
    acc[k] = schema.properties[k]['example'];
    return acc;
  }, {});

  return Object.entries(params).length > 0 ?
    `?${queryString.stringify(params)}` : '';
};

const Headers = ({ children }) => (
  <div className={b('headers')}>{children}</div>
);

const Header = ({ name, children, value }) => (
  <div className={b('header')}>
    <span className="token keyword">{name}:&nbsp;</span>
    <span className="token string">{value || children}</span>
  </div>
);

const HttpStatus = ({ status }) => (
  <div>
    <span className="token punctuation">HTTP/1.1</span>&nbsp;
    <span className="token keyword">{status}</span>
  </div>
);

const HttpRequest = ({ method, url, hrefSchema }) => {
  const params =
    hrefSchema
      ? toParam(hrefSchema)
      : '';

  return (
    <div>
      <span className="token keyword">{method}</span>
      &nbsp;
      <span
        dangerouslySetInnerHTML={{
          __html:
            'https://site-api.datocms.com' +
            url.replace(
              regexp,
              '<span class="HttpExample__placeholder">:$1_id</span>',
            ) +
            params,
        }}
      />{' '}
      <span className="token punctuation">HTTP/1.1</span>
    </div>
  );
};

const JsonBody = ({ payload }) => (
  <div
    className="HttpExample__http-body language-json"
    dangerouslySetInnerHTML={{
      __html: Prism.highlight(
        JSON.stringify(payload, null, 2),
        Prism.languages.json,
      ),
    }}
  />
);

export default class HttpExample extends React.Component {
  render() {
    const { link } = this.props;
    return (
      <div className={b()}>
        <h6>Example request</h6>
        <div className="gatsby-highlight">
          <pre className="language-text">
            <code>
              <HttpRequest
                method={link.method}
                url={link.href}
                hrefSchema={link.hrefSchema}
              />
              <Headers>
                <Header name="X-Api-Version" value={2} />
                <Header name="Authorization">
                  Bearer <span className={b('placeholder')}>YOUR-API-KEY</span>
                </Header>
                <Header name="Accept" value="application/json" />
                {link.schema &&
                  link.method !== 'GET' &&
                  link.method !== 'DELETE' && (
                    <Header name="Content-Type" value="application/json" />
                  )}
              </Headers>
              {link.schema &&
                link.method !== 'GET' &&
                link.method !== 'DELETE' && (
                  <JsonBody payload={schemaExampleFor(link.schema)} />
                )}
            </code>
          </pre>
        </div>
        {link.targetSchema && (
          <>
            <h6>Example response</h6>
            <div className="gatsby-highlight">
              <pre className="language-text">
                <code>
                  <HttpStatus status="200 OK" />
                  <Headers>
                    <Header
                      name="Content-Type"
                      value="application/json; charset=utf-8"
                    />
                    <Header
                      name="Cache-Control"
                      value="cache-control: max-age=0, private, must-revalidate"
                    />
                    <Header name="X-RateLimit-Limit" value="30" />
                    <Header name="X-RateLimit-Remaining" value="28" />
                  </Headers>
                  <JsonBody payload={schemaExampleFor(link.targetSchema)} />
                </code>
              </pre>
            </div>
          </>
        )}
      </div>
    );
  }
}
