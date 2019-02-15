import React from 'react'
import bem from 'utils/bem'
import Prism from 'prismjs'
import sortObject from 'sort-object'

import ApiMethod from 'components/cma/ApiMethod'

const b = bem.lock('ApiPage');

export default class Resource extends React.Component {
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

  render() {
    const { resource } = this.props;

    return (
      <div className={b('resource')}>
        <h2 className={b('resource-title')}>
          {resource.title}
        </h2>
        <div className={b('resource-description')}>
          {resource.description}
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
        <div className={b('resource-section')}>
          <div className={b('resource-section-title')}>
            API Methods
          </div>
          {
            resource.links.map((link, i) => (
              <ApiMethod key={link.title} resource={resource} link={link} />
            ))
          }
        </div>
      </div>
    );
  }
}


