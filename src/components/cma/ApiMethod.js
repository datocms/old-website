import React from 'react'
import bem from 'utils/bem'
import Prism from 'prismjs'

import { Tabs, Tab } from 'components/cma/Tabs';
import JsExample from 'components/cma/JsExample';
import RubyExample from 'components/cma/RubyExample';

import schemaExampleFor from 'utils/schemaExampleFor'

const b = bem.lock('ApiPage');

const regexp = /{\(%2Fschemata%2F([^%]+)[^}]*}/g;

export default class ApiMethod extends React.Component {
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
              <table>
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

        <Tabs>
          <Tab title="HTTP Request">
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

            {
                link.targetSchema &&
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
              }
          </Tab>

          <Tab title="JS client example">
            <JsExample
              resource={resource}
              link={link}
            />
          </Tab>

          <Tab title="Ruby client example">
            <RubyExample
              resource={resource}
              link={link}
            />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

