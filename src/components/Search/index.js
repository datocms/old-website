import React from 'react';
import bem from 'utils/bem';

import './style.sass';

const b = bem.lock('Search');

export default class Search extends React.Component {
  render() {
    const { small, big, placeholder, initialQuery } = this.props;

    return (
      <form method="GET" action="/search/docs" className={b({ small, big })}>
        <input
          defaultValue={initialQuery}
          name="q"
          type="text"
          placeholder={placeholder || 'Search...'}
        />
      </form>
    );
  }
}
