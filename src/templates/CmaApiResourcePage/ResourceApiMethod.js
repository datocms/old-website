import React from 'react'
import bem from 'utils/bem'
import { Tabs, Tab } from './Tabs'
import HttpExample from './HttpExample'
import JsExample from './JsExample'
import RubyExample from './RubyExample'

import './ResourceApiMethod.sass';

const b = bem.lock('ResourceApiMethod');
const regexp = /{\(%2Fschemata%2F([^%]+)[^}]*}/g;

export default class ResourceApiMethod extends React.Component {
  render() {
    const { resource, link } = this.props;
    const path = link.href.replace(regexp, ':$1_id');

    return (
      <div className={b()}>
        <h3 id={link.title.toLowerCase()}>
          {link.description}
        </h3>
        <p>
          To {link.description.toLowerCase()}, send a <code>{link.method}</code> request to the <code>{path}</code> endpoint{ ['POST', 'PUT'].includes(link.method) && ', passing the resource arguments in the request body'}. The following table contains the list of all the possible arguments, along with their type, description and examples values. All the arguments marked as required must be present in the request.
        </p>
        <Tabs>
          <Tab title="HTTP example">
            <HttpExample
              resource={resource}
              link={link}
            />
          </Tab>
          <Tab title="Javascript example">
            <JsExample
              resource={resource}
              link={link}
            />
          </Tab>
          <Tab title="Ruby example">
            <RubyExample
              resource={resource}
              link={link}
            />
          </Tab>
        </Tabs>
        <hr />
      </div>
    );
  }
}


