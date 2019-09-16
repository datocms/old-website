import React from 'react';
import { Wrap, button, Space } from 'blocks';
import ResponsiveSticky from 'components/ResponsiveSticky';
import DatoCmsSearch from 'datocms-search/dist/datocms-search.base';
import highlighter from 'keyword-highlighter';
import Link from 'components/Link';

import bem from 'utils/bem';
import '../components/DocAside/style.sass';
import Layout from 'components/Layout';
import Search from 'components/Search';
import './search.sass';

const client = new DatoCmsSearch('d46fe8134ea916b42af4eaa0d06109');
const b = bem.lock('DocPage');
const s = bem.lock('Search');

export default class BrandingPage extends React.Component {
  state = {
    docsResults: null,
    communityResults: null,
  };

  async fetchcommunity(query) {
    const endpoint = 'https://community.datocms.com/search/query.json';

    const response = await fetch(
      `${endpoint}?include_blurbs=true&term=${encodeURIComponent(query)}`,
    );

    const { topics, posts } = await response.json();

    if (!posts) {
      return [];
    }

    return posts.map(post => {
      const topic = topics.find(t => t.id === post.topic_id);
      return {
        title: highlighter(query || '', topic.title),
        body: highlighter(query || '', post.blurb),
        url: `https://community.datocms.com/t/${topic.slug}/${topic.id}`,
        community: true,
      };
    });
  }

  async componentDidMount() {
    const query = new URLSearchParams(this.props.location.search).get('q');

    const [{ results: docsResults }, communityResults] = await Promise.all([
      client.search(query),
      this.fetchcommunity(query),
    ]);

    this.setState({ docsResults, communityResults });
  }

  handleMenuToggle(e) {
    e.preventDefault();
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }

  renderResult(result) {
    const query = new URLSearchParams(this.props.location.search).get('q');

    return (
      <a href={result.url} className={s('result')}>
        <div
          className={s('title')}
          dangerouslySetInnerHTML={{
            __html: result.title.replace(/ - DatoCMS$/, ''),
          }}
        />
        {result.body && (
          <div
            className={s('body')}
            dangerouslySetInnerHTML={{ __html: result.body }}
          />
        )}
        <div
          className={s('url')}
          dangerouslySetInnerHTML={{
            __html: highlighter(query || '', result.url),
          }}
        />
      </a>
    );
  }

  render() {
    const { docsResults, communityResults } = this.state;
    const query = new URLSearchParams(this.props.location.search).get('q');
    const results = this.state[`${this.props['*']}Results`];

    return (
      <Layout>
        <Wrap>
          <div className={b()}>
            <div className={b('mobile-toc')}>
              <button onClick={this.handleMenuToggle.bind(this)}>
                {this.state.isMenuOpen ? 'Close' : 'Open'} search facets
              </button>
            </div>

            <div
              className={b('menu', { open: this.state.isMenuOpen })}
              data-datocms-noindex
            >
              <ResponsiveSticky
                minWidth={900}
                top={100}
                bottomBoundary={`.${b()}`}
              >
                <ul className={b('menu-pages')}>
                  <li className={b('menu-page')}>
                    <Link
                      activeClassName="is-active"
                      to={`/search/docs?q=${encodeURIComponent(query)}`}
                    >
                      Docs results {docsResults && <>({docsResults.length})</>}
                    </Link>
                  </li>
                  <li className={b('menu-page')}>
                    <Link
                      activeClassName="is-active"
                      to={`/search/community?q=${encodeURIComponent(query)}`}
                    >
                      Community results{' '}
                      {communityResults && <>({communityResults.length})</>}
                    </Link>
                  </li>
                </ul>

                <Search small initialQuery={query} />
              </ResponsiveSticky>
            </div>

            <div className={b('content')}>
              <Space bottom={5}>
                <h1 className={b('content-title')}>
                  Search results for "{query}"
                </h1>
              </Space>

              {results &&
                results.length > 0 &&
                results.map(this.renderResult.bind(this))}
              {results && results.length === 0 && <div>No results found!</div>}
              {!results && <>Loading...</>}
            </div>
          </div>
        </Wrap>
      </Layout>
    );
  }
}
