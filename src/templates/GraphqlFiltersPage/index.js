import React from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-graphql';
import bem from 'utils/bem';
import DocAside from 'components/DocAside';
import { graphql } from 'gatsby';
import { Tabs, Tab } from 'components/Tabs';
import fieldTypes from 'utils/fieldTypes.json';

const b = bem.lock('GraphqlFilters');

const exampleForType = field => {
  let exampleData = '';
  const type = field.input_type;

  if (type === 'item_id' || type === 'upload_id') {
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
    return `[${exampleData}]`;
  }

  return exampleData;
};

const exampleForField = (field_name, query_field_name, field) => {
  let filter = `${query_field_name}: ${exampleForType(field)}`;

  if (filter.length > 35) {
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
};

class GraphqlFiltersBlock extends React.Component {
  renderFilters(name, attrs) {
    return (
      <Tabs handlesAsCode>
        {Object.keys(attrs).map(key => (
          <Tab key="{key}" title={key}>
            <div className={b('filter__description')}>
              {attrs[key].description}
            </div>
            <pre className="language-graphql">
              <code
                dangerouslySetInnerHTML={{
                  __html: Prism.highlight(
                    exampleForField(name, key, attrs[key].input),
                    Prism.languages.graphql,
                  ),
                }}
              />
            </pre>
          </Tab>
        ))}
      </Tabs>
    );
  }

  render() {
    const filters = JSON.parse(this.props.data.fieldFiltersIntrospection.body);
    return (
      <div>
        <h3>Meta fields</h3>
        {Object.keys(filters.meta).map(name => (
          <React.Fragment key={name}>
            <h4 id={name} className={b('field__title')}>
              Filter by <code>{name}</code> meta field
            </h4>
            {this.renderFilters(name, filters.meta[name])}
          </React.Fragment>
        ))}
        <h3>Filters available per field type</h3>
        {Object.keys(filters.field_types).map(name => (
          <React.Fragment key={name}>
            <h4 id={name} className={b('field__title')}>
              {fieldTypes[name]} fields
            </h4>
            {this.renderFilters(name, filters.field_types[name])}
          </React.Fragment>
        ))}
      </div>
    );
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

export default GraphqlFiltersPage;

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
`;
