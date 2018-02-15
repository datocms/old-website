import React from 'react'
import bem from 'utils/bem'
import DatoCmsSearch from 'datocms-search/src/base'
import AutoSuggest from 'react-autosuggest'

import { Wrap, button, Space, Text } from 'blocks'
import './style.sass'

const token = 'd46fe8134ea916b42af4eaa0d06109';

const b = bem.lock('Search')

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', suggestions: [], isLoading: false };
  }

  componentDidMount() {
  }

  handleChange(event, { newValue, method }) {
    this.setState({
      value: newValue
    });
  }

  handleSuggestionsFetchRequested({ value }) {
    const client = new DatoCmsSearch(token, "production");

    client.search(value)
    .then((response) => {
      this.setState({ suggestions: response.results });
    })
  }

  handleSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    });
  }

  handleGetSuggestionValue(suggestion) {
    return suggestion.raw.title;
  }

  renderSuggestion(suggestion, { query }) {
    return (
      <div className={b('suggestion')}>
        <div
          className={b('suggestion-title')}
          dangerouslySetInnerHTML={{ __html: suggestion.title }}
        />
        <div
          className={b('suggestion-url')}
          dangerouslySetInnerHTML={{ __html: suggestion.url }}
        />
        <div
          className={b('suggestion-body')}
          dangerouslySetInnerHTML={{ __html: suggestion.body }}
        />
      </div>
    );
  }

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: "Type something!",
      value,
      onChange: this.handleChange.bind(this),
    };

    return (
      <div className={b()}>
        <AutoSuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested.bind(this)}
          onSuggestionsClearRequested={this.handleSuggestionsClearRequested.bind(this)}
          getSuggestionValue={this.handleGetSuggestionValue.bind(this)}
          renderSuggestion={this.renderSuggestion.bind(this)}
          inputProps={inputProps} 
        />
      </div>
    );
  }
}

