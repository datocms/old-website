import React from 'react';
import bem from 'utils/bem';
import { navigate } from "@reach/router"

import './style.sass';

const b = bem.lock('Search');

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.initialQuery || '',
    }
  }

  render() {
    const { small, big, placeholder } = this.props;
    const { value } = this.state;

    return (
      <form 
        method="GET" 
        action="/search/docs" 
        className={b({ small, big })}
        onSubmit={(e) => {
          e.preventDefault();
          navigate(`/search/docs?q=${encodeURIComponent(value)}`);
        }}
      >
        <input
          value={value}
          onChange={(e) => this.setState({ value: e.target.value })}
          name="q"
          type="text"
          placeholder={placeholder || 'Search...'}
        />
      </form>
    );
  }
}
