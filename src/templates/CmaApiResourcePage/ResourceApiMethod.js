import React from 'react';
import sortObject from 'sort-object';
import { Tabs, Tab } from './Tabs';
import HttpExample from './HttpExample';
import JsExample from './JsExample';
import RubyExample from './RubyExample';
import bem from 'utils/bem';

import Anchor from 'components/Anchor';

const b = bem.lock('ResourceAttributes');

const regexp = /{\(%2Fschemata%2F([^%]+)[^}]*}/g;

export default class ResourceApiMethod extends React.Component {
  renderAttribute(name, schema) {
    let schemaType = schema.type || [];

    if (!Array.isArray(schema.type)) {
      schemaType = [schemaType];
    }

    schemaType = schemaType.filter(type => type && type !== 'null');

    return (
      <tr key={name}>
        <td className={b('attribute-left')}>
          <code className={b('attribute-name')}>{name}</code>
          <code className={b('attribute-type')}>
            {schemaType.sort().join(', ')}
          </code>
        </td>
        <td>
          {schema.description && (
            <p>{schema.description}</p>
          )}
          {schema.required && (
            <>
              <p>
              {schema.required.sort().map(el => (
                <code>{el}</code>
              )).reduce((acc, curr) => [acc, ', ', curr])}
              </p>
              <div className={b('attribute-required')}>
                These attributes are required
              </div>
            </>
          )}
        </td>
      </tr>
    );
  }

  render() {
    const { resource, link } = this.props;
    const path = link.href.replace(regexp, ':$1_id');

    return (
      <>
        <h3 id={link.title.toLowerCase()}>
          <Anchor id={link.title.toLowerCase()} />
          {link.description}
        </h3>
        <p>
          To {link.description.toLowerCase()}, send a <code>{link.method}</code>{' '}
          request to the <code>{path}</code> endpoint
          {['POST', 'PUT'].includes(link.method) &&
            ', passing the resource arguments in the request body'}
          . The following table contains the list of all the possible arguments,
          along with their type, description and examples values. All the
          arguments marked as required must be present in the request.
        </p>

        {link.schema && (
          <>
          <h6>Arguments:</h6>
          <table className="ResourceAttributes">
            <tbody>
              {Object.entries(sortObject(link.schema.properties)).map(
                ([name, schema]) => this.renderAttribute(name, schema),
              )}
            </tbody>
          </table>
          </>
        )}

        <Tabs>
          <Tab title="HTTP example">
            <HttpExample resource={resource} link={link} />
          </Tab>
          <Tab title="Javascript example">
            <JsExample resource={resource} link={link} />
          </Tab>
          <Tab title="Ruby example">
            <RubyExample resource={resource} link={link} />
          </Tab>
        </Tabs>
      </>
    );
  }
}
