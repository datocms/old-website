import React from 'react'
import DocAside from 'components/DocAside';
import { parse } from 'flatted/cjs';
import ResourceAttributes from './ResourceAttributes';
import ResourceMethod from './ResourceApiMethod';

export default class CmaApiResourcePage extends React.Component {
  render() {
    const resource = parse(this.props.pageContext.resource);

    return (
      <DocAside {...this.props}>
        <p>{resource.description}</p>
        <ResourceAttributes
          resource={resource}
        />
        {
          resource.links.map(link => (
            <ResourceMethod
              key={link.title}
              resource={resource}
              link={link}
            />
          ))
        }
      </DocAside>
    );
  }
}

