import React from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-graphql'
import bem from 'utils/bem'
import DocAside from 'components/DocAside';
import { graphql } from 'gatsby'

import './style.sass'

const b = bem.lock('GraphqlFilters')

const exampleForType = (field) => {
  let exampleData = ""
  const type = field.input_type;

  if (type === 'item_id' || type == 'upload_id') {
    exampleData = '"123"';
  } else if (type === 'boolean') {
    return 'true';
  } else if (type === 'string') {
    exampleData = '"bike"';
  } else if (type === 'float') {
    exampleData = '19.99';
  } else if (type === 'integer') {
    exampleData = '3';
  } else if (type === 'date_time') {
    exampleData = '"2018-02-13T14:30:00+00:00"';
  } else if (type === 'date') {
    exampleData = '"2018-02-13"';
  } else if (type === 'StringMatchesFilter') {
    exampleData = '{ pattern: "bi(cycl|k)e", caseSensitive: false }';
  } else if (type === 'near') {
    exampleData = '{ latitude: 40.73, longitude: -73.93, radius: 10 }';
  } else {
    exampleData = type;
  }
  if (field.array) {
    return `[${exampleData}]`
  }
  return exampleData
}

const exampleForField = (field_name, query_field_name, field) => {
  let filter = `${query_field_name}: ${exampleForType(field)}`;

  if (filter.length > 20) {
    return `query {
      allProducts(
        filter: {
          ${field_name}: {
            ${filter}
          }
        }
        ) {
          title
          }
    }`;
  }

  return `query {
  allProducts(filter: { ${field_name}: { ${filter} } }) {
    title
  }
}`;
}

class GraphqlFiltersBlock extends React.Component {
  renderField(filters, name) {
    const attrs = filters[name]
    return (
      <div className={b('field')} key={name}>
        <h3 className={b('field__title')}>
          {name}
        </h3>
        <table className={b('filters')}>
          <tbody>
            {
               Object.keys(attrs).map(key => (
                <tr key="{key}" className={b('filter')}>
                  <td className={b('filter__content')}>
                    <div className={b('filter__title')}><span>{key}</span></div>
                    <div className={b('filter__description')}>
                      {attrs[key].description}
                    </div>
                  </td>
                  <td className={b('filter__example')}>
                    <pre
                      className="language-graphql"
                      dangerouslySetInnerHTML={{
                        __html: Prism.highlight(
                          exampleForField(name, key, attrs[key].input),
                          Prism.languages.graphql
                        )
                      }}
                    />
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    const filters = JSON.parse(this.props.data.fieldFiltersIntrospection.body)
    return (
      <div>
        {Object.keys(filters.meta).map(this.renderField.bind(this, filters.meta))}
        {Object.keys(filters.field_types).map(this.renderField.bind(this, filters.field_types))}
      </div>
    )
  }
}

class GraphqlFiltersPage extends React.Component {
  render() {
    return (
      <DocAside {...this.props}>
        <GraphqlFiltersBlock {...this.props} />
      </DocAside>
    );
  }
}

export default GraphqlFiltersPage

export const query = graphql`
  query GraphqlFiltersPageQuery {
    pages: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/.*docs.*/" } }
    ) {
      edges {
        node {
          path: fileAbsolutePath
          frontmatter {
            title
            copyFrom
            position
          }
        }
      }
    }
    fieldFiltersIntrospection {
      body
    }
  }
`

