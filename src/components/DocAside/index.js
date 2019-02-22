import React from 'react';
import Link from 'components/Link';
import { Wrap, Space } from 'blocks';
import Helmet from 'react-helmet';
import Lightbox from 'react-images';

import bem from 'utils/bem';

import Layout from 'components/Layout';
import Search from 'components/Search';
import ResponsiveSticky from 'components/ResponsiveSticky';

import './style.sass';

const b = bem.lock('DocPage');

export default class DocAside extends React.Component {
  constructor(props) {
    super(props);
    this.state = { image: null, isMenuOpen: false };
  }

  handleOpenKayako(e) {
    e.preventDefault();
    window.kayako.maximize();
  }

  handleMenuToggle(e) {
    e.preventDefault();
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }

  componentDidMount() {
    this.contentBody.addEventListener('click', event => {
      if (event.target.classList.contains('gatsby-resp-image-image')) {
        let link = event.target;

        while (!link.classList.contains('gatsby-resp-image-link')) {
          link = link.parentElement;
        }

        this.setState({ image: link.href });
        event.preventDefault();
        event.stopPropagation();
      }
    });
  }

  render() {
    const {
      index,
      pageTitle,
      chapterTitle,
      menuItems,
      repoPath,
      html,
    } = this.props.pageContext;

    return (
      <Layout>
        <Helmet title={`${pageTitle} - ${chapterTitle} - DatoCMS`} />
        <Wrap>
          <div className={b()}>
            <div className={b('mobile-toc')}>
              <p>You're reading <em>"{chapterTitle}"</em></p>
              <button onClick={this.handleMenuToggle.bind(this)}>
                { this.state.isMenuOpen ? 'Close' : 'Open'} this guide's chapters
              </button>
            </div>

            <div className={b('menu', { open: this.state.isMenuOpen })} data-datocms-noindex>
              <ResponsiveSticky minWidth={900} top={100} bottomBoundary={`.${b()}`}>
                <ul className={b('menu-pages')}>
                  {
                    menuItems.length > 1 ?
                    menuItems.map(menuItem => (
                      <li key={menuItem.path} className={b('menu-page')}>
                        <Link
                          exact
                          to={menuItem.path}
                          activeClassName="is-active"
                        >
                          {menuItem.title}
                        </Link>
                        {menuItem.headings.length > 0 && (
                          <ul className={b('menu-page__sections')}>
                            {menuItem.headings.map(heading => (
                              <li
                                key={heading.id}
                                className={b('menu-page__section')}
                              >
                                <Link
                                  to={menuItem.path + heading.id}
                                  activeClassName="is-active"
                                >
                                  {heading.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))
                    :
                    <>
                      <li className={b('menu-page')}>
                        <Link
                          exact
                          to={menuItems[0].path}
                          activeClassName="is-active"
                        >
                          Introduction
                        </Link>
                      </li>
                      {
                        menuItems[0].headings.map(heading => (
                          <li key={heading.id} className={b('menu-page')}>
                            <Link
                              exact
                              to={menuItems[0].path + heading.id}
                              activeClassName="is-active"
                            >
                              {heading.title}
                            </Link>
                          </li>
                        ))
                      }
                    </>
                  }
                </ul>

                <Search small />

                <div className={b('menu-back')}>
                  <Link to="/docs">‹ Go back to Docs page</Link>
                </div>
              </ResponsiveSticky>
            </div>

            <div className={b('content')}>
              <Space bottom={5}>
                <h6 className={b('content-category')}>
                  {menuItems.length > 1 && index > 0
                    ? chapterTitle
                    : 'Documentation'}
                </h6>
                <h1 className={b('content-title')}>
                  {index === 0 ? chapterTitle : pageTitle}
                </h1>
              </Space>

              <div className="content-body" ref={x => (this.contentBody = x)}>
                <div dangerouslySetInnerHTML={{ __html: html }} />
                {this.props.children}
              </div>

              {repoPath && (
                <div className={b('contribute')}>
                  <div className={b('contribute-title')}>
                    Feel like something is missing in this page?
                  </div>
                  <button onClick={this.handleOpenKayako.bind(this)}>
                    Chat with us
                  </button>
                  , submit an{' '}
                  <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href="https://github.com/datocms/website/issues/new"
                  >
                    issue
                  </a>{' '}
                  or{' '}
                  <a rel="noopener noreferrer" target="_blank" href={repoPath}>
                    propose a change
                  </a>{' '}
                  on Github!
                </div>
              )}
            </div>
          </div>
        </Wrap>
        <Lightbox
          backdropClosesModal
          width={1400}
          images={this.state.image ? [{ src: this.state.image }] : []}
          isOpen={this.state.image}
          theme={{ footer: { display: 'none' } }}
          onClose={() => this.setState({ image: null })}
        />
      </Layout>
    );
  }
}
