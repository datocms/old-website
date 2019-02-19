import React from 'react'
import bem from 'utils/bem'
import schemaExampleFor from 'utils/schemaExampleFor'
import Prism from 'prismjs'
import 'prismjs/components/prism-json'

import './HttpExample.sass';

const b = bem.lock('HttpExample');

const regexp = /{\(%2Fschemata%2F([^%]+)[^}]*}/g;

const Headers = ({ children }) => (
  <div className={b('headers')}>
    {children}
  </div>
)

const Header = ({ name, children, value }) => (
  <div className={b('header')}>
    <span className="token keyword">
      {name}:&nbsp;
    </span>
    <span className="token string">
      {value || children}
    </span>
  </div>
);

const HttpStatus = ({ status }) => (
  <>
    <span className="token punctuation">HTTP/1.1</span>&nbsp;
    <span className="token keyword">{status}</span>
  </>
);

const HttpRequest = ({ method, url }) => (
  <>
    <span className="token keyword">{method}</span>
    &nbsp;
    <span
      dangerouslySetInnerHTML={{
        __html: 'https://site-api.datocms.com' + url.replace(regexp, '<span class="HttpExample__placeholder">:$1_id</span>')
      }}
    /> <span className="token punctuation">HTTP/1.1</span>
  </>
);

const JsonBody = ({ payload }) => (
  <div
    className="HttpExample__http-body language-json"
    dangerouslySetInnerHTML={{
      __html: Prism.highlight(
        JSON.stringify(payload, null, 2),
        Prism.languages.json
      )
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
              <HttpRequest method={link.method} url={link.href} />
              <Headers>
                <Header name="X-Api-Version" value={2} />
                <Header name="Authorization">
                  Bearer <span className={b('placeholder')}>YOUR-API-KEY</span>
                </Header>
                <Header name="Accept" value="application/json" />
                {
                  link.schema && link.method !== 'GET' &&
                    <Header name="Content-Type" value="application/json" />
                }
              </Headers>
              {
                link.schema && link.method !== 'GET' &&
                  <JsonBody payload={schemaExampleFor(link.schema)} />
              }
            </code>
          </pre>
        </div>
        {
          link.targetSchema &&
            <>
              <h6>Example response</h6>
              <div className="gatsby-highlight">
                <pre className="language-text">
                  <code>
                    <HttpStatus status="200 OK" />
                    <Headers>
                      <Header name="Content-Type" value="application/json; charset=utf-8" />
                      <Header name="Cache-Control" value="cache-control: max-age=0, private, must-revalidate" />
                      <Header name="X-RateLimit-Limit" value="30" />
                      <Header name="X-RateLimit-Remaining" value="28" />
                    </Headers>
                    <JsonBody payload={schemaExampleFor(link.targetSchema)} />
                  </code>
                </pre>
              </div>
            </>
          }
      </div>
    );
  }
}



