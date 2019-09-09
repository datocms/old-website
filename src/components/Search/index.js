import React from 'react';
import bem from 'utils/bem';
import DatoCmsSearch from 'datocms-search/dist/datocms-search.base';
import AutoSuggest from 'react-autosuggest';
import { debounce } from 'debounce';

import './style.sass';

const token = 'd46fe8134ea916b42af4eaa0d06109';

const b = bem.lock('Search');

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', suggestions: [], isLoading: false };

    this.handleSuggestionsFetchRequested = debounce(
      this.handleSuggestionsFetchRequested.bind(this),
      300,
    );
  }

  componentDidMount() {}

  handleChange(event, { newValue, method }) {
    this.setState({
      value: newValue,
    });
  }

  async handleSuggestionsFetchRequested({ value }) {
    const client = new DatoCmsSearch(token);

    const searchResponse = await client.search(value);
    const communityResponse = await fetch(
      'https://community.datocms.com/search/query.json?include_blurbs=true&term=' + value
    );
    const body = await communityResponse.json();

    const suggestions = searchResponse.results.concat(this.parseCommunitySearch(body.topics));

    this.setState({ suggestions: suggestions });
  }

  parseCommunitySearch(topics) {
    if(!topics) {
      return [];
    }
    return topics.map((t) => {
      return {
        title: t.title,
        url: 'https://community.datocms.com/t/'+t.id,
        community: true,
      };
    })
  }

  handleSuggestionsClearRequested() {
    this.setState({
      suggestions: [],
    });
  }

  handleGetSuggestionValue(suggestion) {
    return suggestion.raw ?
      suggestion.raw.title.replace(/ - DatoCMS$/, '') :
      suggestion.title;
  }

  handleSelectSuggestion(event, { suggestion }) {
    if (suggestion.community) {
      window.open(suggestion.url, '_blank');
    } else {
      document.location = suggestion.url;
    }
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
        {suggestion.body && (
          <div
            className={b('suggestion-body')}
            dangerouslySetInnerHTML={{ __html: suggestion.body }}
          />
        )}
        {suggestion.community && (
          <div className={b('suggestion-community')}>
            Read more on the Community forum
          </div>
        )}
      </div>
    );
  }

  render() {
    const { value, suggestions } = this.state;
    const { small, big, placeholder } = this.props;

    const inputProps = {
      placeholder: placeholder || 'Search...',
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
