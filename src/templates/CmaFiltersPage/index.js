import React from 'react';
import 'prismjs/components/prism-graphql';
import bem from 'utils/bem';
import DocAside from 'components/DocAside';
import { Tabs, Tab } from 'components/Tabs';
import HttpExample from '../CodeExamples/HttpExample';
import JsExample from './JsExample';
import RubyExample from './RubyExample';
import fieldTypes from 'utils/fieldTypes.json';
import Anchor from 'components/Anchor';
import { parse } from 'flatted/cjs';
import humps from 'humps';

const b = bem.lock('CmaFilters');

const exampleForType = (queryFieldName, field) => {
  let exampleData = '';
  const type = field.input_type;

  if (type === 'item_id' || type === 'upload_id') {
    exampleData = '123';
  } else if (type === 'boolean') {
    return 'true';
  } else if (type === 'string') {
    exampleData = 'bike';
  } else if (type === 'enum') {
    exampleData = field.values[0];
  } else if (type === 'float') {
    exampleData = '19.99';
  } else if (type === 'integer') {
    exampleData = '3';
  } else if (type === 'date_time') {
    exampleData = '2018-02-13T14:30:00+00:00';
  } else if (type === 'date') {
    exampleData = '2018-02-13';
  } else if (queryFieldName === 'matches' || queryFieldName === 'not_matches') {
    exampleData = '{ pattern: bi(cycl|k)e, caseSensitive: false }';
  } else if (queryFieldName === 'near') {
    exampleData = '{ latitude: 40.73, longitude: -73.93, radius: 10 }';
  } else {
    exampleData = type;
  }
  if (field.array) {
    return `[${exampleData}]`;
  }

  return exampleData;
};

class CmaFiltersBlock extends React.Component {
  renderFilters(name, attrs) {
    return (
      <Tabs handlesAsCode>
        {Object.keys(attrs).map(key => {
          const filter = {
            name: name,
            type: key,
            exampleValue: exampleForType(key, attrs[key].input),
          };
          return (
            <Tab key={key} title={humps.camelize(key)}>
              <div className={b('filter__description')}>
                {attrs[key].description}
              </div>
              {this.renderExamples(filter)}
            </Tab>
          )
        })}
      </Tabs>
    );
  }

  renderExamples(filter) {
    const itemResource = parse(this.props.pageContext.itemResource)

    return(
      <Tabs>
          <Tab title="HTTP example">
            <HttpExample resource={itemResource} filter={filter} link={null} />
          </Tab>
          <Tab title="JS example">
            <JsExample resource={itemResource} filter={filter} />
          </Tab>
          <Tab title="Ruby example">
            <RubyExample resource={itemResource} filter={filter} />
          </Tab>
        </Tabs>
    );
  }

  render() {
    const { fieldsMetaInfo, fieldTypesInfo} = this.props.pageContext;

    return (
      <div>
        <h3 id="meta-fields">
          <Anchor id="meta-fields" />
          Meta fields
        </h3>
        {Object.keys(fieldsMetaInfo).map(name => (
          <React.Fragment key={name}>
            <h4 id={name} className={b('field__title')}>
              <Anchor id={name} />
              Filter by <code>{name}</code> meta field
            </h4>
            {this.renderFilters(name, fieldsMetaInfo[name])}
          </React.Fragment>
        ))}
        <h3>
          <Anchor id="field-types" />
          Filters available per field type
        </h3>
        {Object.keys(fieldTypesInfo).map(name => (
          <React.Fragment key={name}>
            <h4 id={name} className={b('field__title')}>
              <Anchor id={name} />
              {fieldTypes[name]} fields
            </h4>
            {this.renderFilters(name, fieldTypesInfo[name])}
          </React.Fragment>
        ))}
      </div>
    );
  }
}

class CmaFiltersPage extends React.Component {
  render() {
    return (
      <DocAside {...this.props}>
        <CmaFiltersBlock {...this.props} />
      </DocAside>
    );
  }
}

export default CmaFiltersPage;
