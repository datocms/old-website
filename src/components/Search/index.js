import React from 'react';
import bem from 'utils/bem';
import DatoCmsSearch from 'datocms-search/dist/datocms-search.base';
import AutoSuggest from 'react-autosuggest';

import './style.sass';

const token = 'd46fe8134ea916b42af4eaa0d06109';

const b = bem.lock('Search');

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', suggestions: [], isLoading: false };
    this.debounceInterval = null;
  }

  componentDidMount() {}

  handleChange(event, { newValue, method }) {
    this.setState({
      value: newValue,
    });
  }

  handleSuggestionsFetchRequested({ value }) {
    const context = this;
    clearTimeout(this.debounceInterval);
    this.debounceInterval = setTimeout(() => {
      const client = new DatoCmsSearch(token, 'production');

      client.search(value).then(response => {
        context.setState({ suggestions: response.results });
      });
    }, 500);
  }

  handleSuggestionsClearRequested() {
    this.setState({
      suggestions: [],
    });
  }

  handleGetSuggestionValue(suggestion) {
    return suggestion.raw.title.replace(/ - DatoCMS$/, '');
  }

  handleSelectSuggestion(event, { suggestion }) {
    document.location = suggestion.url;
  }

  renderSuggestion(suggestion, { query }) {
    return (
      <div className={b('suggestion')}>
        <div
          className={b('suggestion-title')}
          dangerouslySetInnerHTML={{
            __html: suggestion.title.replace(/ - DatoCMS$/, ''),
          }}
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
    const { small, big } = this.props;

    const inputProps = {
      placeholder: 'Search...',
      value,
      onChange: this.handleChange.bind(this),
    };

    return (
      <div className={b({ small, big })}>
        <AutoSuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested.bind(
            this,
          )}
          onSuggestionsClearRequested={this.handleSuggestionsClearRequested.bind(
            this,
          )}
          onSuggestionSelected={this.handleSelectSuggestion.bind(this)}
          getSuggestionValue={this.handleGetSuggestionValue.bind(this)}
          renderSuggestion={this.renderSuggestion.bind(this)}
          inputProps={inputProps}
        />
      </div>
    );
  }
}
