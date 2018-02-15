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
    client.search(value)
    .then(function(response) {
      this.setState({ suggestions: response.results });
    })
  }

  handleSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    });
  }

  handleGetSuggestionValue(suggestion) {
    return `${suggestion.first} ${suggestion.last}`;
  }

  renderSuggestion(suggestion, { query }) {
    return (
      <span>
        {suggestion.title}
      </span>
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
      <AutoSuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested.bind(this)}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested.bind(this)}
        getSuggestionValue={this.handleGetSuggestionValue.bind(this)}
        renderSuggestion={this.renderSuggestion.bind(this)}
        inputProps={inputProps} />
    );
  }
}

