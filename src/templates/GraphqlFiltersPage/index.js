import React from 'react'
import { parse } from 'flatted/cjs';
import { Wrap, button, Space, text } from 'blocks'
import Prism from 'prismjs'
import 'prismjs/components/prism-graphql'
import bem from 'utils/bem'
import DocAside from 'components/DocAside';

import './style.sass'

const b = bem.lock('GraphqlFilters')

const exampleForType = (intro, typeRef) => {
  if (typeRef.kind === 'LIST') {
    return `[${exampleForType(intro, typeRef.ofType)}]`;
  }

  if (typeRef.kind === 'NON_NULL') {
    return exampleForType(intro, typeRef.ofType);
  }

  const type = intro.__schema.types.find(type => type.name === typeRef.name);

  if (type.name === 'ID') {
    return '"123"';
  } else if (type.name === 'Boolean') {
    return 'true';
  } else if (type.name === 'String') {
    return '"bike"';
  } else if (type.name === 'Float') {
    return '19.99';
  } else if (type.name === 'Int') {
    return '3';
  } else if (type.name === 'DateTime') {
    return '"2018-02-13T14:30:00+00:00"';
  } else if (type.name === 'Date') {
    return '"2018-02-13"';
  } else if (type.name === 'StringMatchesFilter') {
    return '{pattern: "bi(cycl|k)e", caseSensitive: false}';
  } else if (type.name === 'LatLonNearFilter') {
    return '{latitude: 40.73, longitude: -73.93, radius: 10}';
  } else {
    return type.name;
  }
}

const exampleForField = (intro, type, field) => {
  let filter = `${field.name}: ${exampleForType(intro, field.type)}`;

  if (filter.length > 20) {
    return `query {
  allProducts(
    filter: {
      ${type.exampleFieldName}: {
        ${filter}
      }
    }
  ) {
    title
  }
}`;
  }

  return `query {
  allProducts(filter: {${type.exampleFieldName}: {${filter}}}) {
    title
  }
}`;
}

class GraphqlFiltersBlock extends React.Component {
  renderField(intro, type) {
    return (
      <div className={b('field')} key={type.name}>
        <h3 className={b('field__title')}>
          {type.docHints.title}
        </h3>
        <table className={b('filters')}>
          <tbody>
            {
              type.inputFields.map(field => (
                <tr key={field.name} className={b('filter')}>
                  <td className={b('filter__content')}>
                    <div className={b('filter__title')}><span>{field.name}</span></div>
                    <div className={b('filter__description')}>
                      {field.description}
                    </div>
                  </td>
                  <td className={b('filter__example')}>
                    <pre
                      className="language-graphql"
                      dangerouslySetInnerHTML={{
                        __html: Prism.highlight(
                          exampleForField(intro, type, field),
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
    const { data } = this.props;
    const intro = parse(data.cda.body);

    const filters = intro.__schema.types
      .find(type => type.name === 'ModelModelFilter')
      .inputFields
      .filter(field => field.type.kind === 'INPUT_OBJECT')
      .map(field => ({
        exampleFieldName: field.name,
        ...intro.__schema.types.find(type => type.name === field.type.name),
      }))
      .sort((a, b) => {
        return a.docHints.position - b.docHints.position;
      });

    const metaFilters = filters.filter(f => f.docHints.isMetaField);
    const fieldFilters = filters.filter(f => f.docHints.isField);

    return (
      <div>
        {metaFilters.map(this.renderField.bind(this, intro))}
        {fieldFilters.map(this.renderField.bind(this, intro))}
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
    cda {
      body
    }
  }
`

