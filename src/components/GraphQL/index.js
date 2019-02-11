import React from 'react'
import GraphiQL from 'graphiql';
import 'whatwg-fetch';

import { Wrap } from 'blocks'

import Browser from 'components/Browser'
import 'graphiql/graphiql.css'
import './style.sass'

export default class CustomGraphiQL extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetcher: this.props.fetcher,
      query: '{ allFaqs { question answer } }',
      variables: '',
      response: '',
      schema: undefined,
      operationName: null,
      storage: null,
      defaultQuery: null,
      onEditQuery: null,
      onEditVariables: null,
      onEditOperationName: null,
      getDefaultFieldNames: null
    };
  }

  // Example of using the GraphiQL Component API via a toolbar button.
  handleClickPrettifyButton(event) {
    const editor = this.graphiql.getQueryEditor();
    const currentText = editor.getValue();
    const { parse, print } = require('graphql');
    const prettyText = print(parse(currentText));
    editor.setValue(prettyText);
  }

  render() {
    return (
      <div className="GraphQL">
        <Browser small title="DatoCMS GraphiQL" address="https://graphql.datocms.com/">
          <div className="GraphQL__inner">
            <GraphiQL
              ref={c => { this.graphiql = c; }}
              {...this.state}
            />
          </div>
        </Browser>
      </div>
    );
  }
}
