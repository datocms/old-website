import React from 'react'
import sortObject from 'sort-object'
import bem from 'utils/bem'

import './ResourceAttributes.sass';

const b = bem.lock('ResourceAttributes');

function joinAnd(a, and = 'and') {
  if (a.length === 1) {
    return a[0];
  }

  return `${a.slice(0, -1).join(', ')} ${and} ${a.slice(-1)}`;
}

export default class ResourceAttributes extends React.Component {
  renderAttribute(name, schema) {
    let schemaType = schema.type || [];

    if (!Array.isArray(schema.type)) {
      schemaType = [schemaType];
    }

    const isOptional = schemaType.find(t => t === 'null');

    schemaType = schemaType.filter(type => type && type !== 'null');

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
              <>
                <div classname={b('attribute-description')}>
                  {schema.description}
                </div>
                {
                  !isOptional &&
                    <div className={b('attribute-required')}>
                      This attribute is required
                    </div>
                }
              </>
          }
        </div>
      </div>
    );
  }

  render() {
    const { resource } = this.props;
    const links = resource.links.map(l => l.title);

    if (!resource.attributes || Object.keys(resource.attributes).length === 0) {
      return null;
    }

    return (
      <div className={b()}>
        <h4 id="object">
          The {resource.title} object
        </h4>
        <p>
          A {resource.title} object is returned as part of the response body of each successful {joinAnd(links, 'or')} API call. The following table contains the list of all its fields along with their type, description and example values.
        </p>
        <h6>
          Object fields:
        </h6>
        <div className={b('attributes')}>
          {
            Object.entries(sortObject(resource.attributes)).map(([name, schema]) => (
              this.renderAttribute(name, schema)
            ))
          }
        </div>
        <hr />
      </div>
    );
  }
}

