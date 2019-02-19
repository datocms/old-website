import React from 'react'
import Link from 'components/Link'
import { Wrap, Space } from 'blocks'
import Sticky from 'react-stickynode'
import Helmet from 'react-helmet'
import Lightbox from 'react-images'

import bem from 'utils/bem'

import Layout from 'components/Layout';
import './style.sass'

const b = bem.lock('DocPage')

export default class DocAside extends React.Component {
  constructor(props) {
    super(props);
    this.state = { image: null };
  }

  handleOpenKayako(e) {
    e.preventDefault();
    window.kayako.maximize();
  }

  componentDidMount() {
    this.contentBody.addEventListener('click', (event) => {
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
      prevPage,
      nextPage,
      html,
    } = this.props.pageContext;

    return (
      <Layout>
        <Helmet title={`${pageTitle} - ${chapterTitle} - DatoCMS`} />
        <Wrap>
          <div className={b()}>
            <div className={b('menu')} data-datocms-noindex>
              <Sticky top={100} bottomBoundary={`.${b()}`}>
                <ul className={b('menu-pages')}>
                  {
                    menuItems.map(menuItem => (
                      <li key={menuItem.path} className={b('menu-page')}>
                        <Link to={menuItem.path} activeClassName="is-active">
                          {menuItem.title}
                        </Link>
                        {
                          menuItem.headings.length > 0 &&
                            <ul className={b('menu-page__sections')}>
                              {
                                menuItem.headings.map(heading => (
                                  <li key={heading.id} className={b('menu-page__section')}>
                                    <Link to={menuItem.path + heading.id} activeClassName="is-active">
                                      {heading.title}
                                    </Link>
                                  </li>
                                ))
                              }
                            </ul>
                        }
                      </li>
                    ))
                  }
                </ul>

                <div className={b('menu-back')}>
                  <Link to="/docs">
                    ‹ Go back to docs
                  </Link>
                </div>

                {
                  repoPath &&
                    <div className={b('contribute')}>
                      <div className={b('contribute-title')}>
                        Something is missing in this page?
                      </div>
                      <button onClick={this.handleOpenKayako.bind(this)}>Chat with us</button>, submit an <a rel="noopener noreferrer" target="_blank" href="https://github.com/datocms/website/issues/new">issue</a> or <a rel="noopener noreferrer" target="_blank" href={repoPath}>propose a change</a> on Github!
                    </div>
                }
              </Sticky>
            </div>

            <div className={b('content')}>
              <Space bottom={5}>
                {
                  menuItems.length > 1 && index > 0 &&
                    <h6 className={b('content-category')}>
                      {chapterTitle}
                    </h6>
                }
                <h1  className={b('content-title')}>
                  {index === 0 ? chapterTitle : pageTitle}
                </h1>
              </Space>

              <div className="content-body" ref={x => this.contentBody = x}>
                <div dangerouslySetInnerHTML={{ __html: html }} />
                {this.props.children}
              </div>

              <div className={b('nav')}>
                <div className={b('nav-prev')}>
                  {
                    prevPage &&
                      <Link to={prevPage.path}>‹ {prevPage.title}</Link>
                  }
                </div>
                <div className={b('nav-next')}>
                  {
                    nextPage &&
                      <Link to={nextPage.path}>{nextPage.title} ›</Link>
                  }
                </div>
              </div>
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
    )
  }
}
