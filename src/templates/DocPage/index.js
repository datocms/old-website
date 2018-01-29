import React from 'react'
import Link from 'gatsby-link'
import { Wrap, button, Space, text } from 'blocks'
import sortBy from 'sort-by'

import bem from 'utils/bem'

import 'prismjs/themes/prism-okaidia.css'
import './style.sass'

const b = bem.lock('DocPage')

const PageLink = ({ to, children }) => (
  <Link
    exact
    to={to.path.replace(/.*\/src/, '').replace(/(\/index)?\.md$/, '/')}
    activeClassName="is-active"
  >
    {children}
  </Link>
)

const findFrontmatterValue = (value, page, pages) => {
  if (page.frontmatter[value]) {
    return page.frontmatter[value]
  }

  const contentPage = pages
    .find(p => p.path.includes(page.frontmatter.copyFrom))

  if (contentPage) {
    return contentPage.frontmatter[value]
  }

  return ''
}

const findTitle = findFrontmatterValue.bind(this, 'title');
const findPosition = findFrontmatterValue.bind(this, 'position');

const findHtml = (page, pages) => {
  if (page.frontmatter.copyFrom) {
    const contentPage = pages
      .find(p => p.path.includes(page.frontmatter.copyFrom))

    return contentPage.html;
  }

  return page.html;
}

export default class DocPage extends React.Component {
  render() {
    const { pathContext, data } = this.props;

    const dir = pathContext.path.replace(/[^\/]*$/, '');
    const pages = data.pages.edges.map(edge => edge.node);

    const categoryPages = pages
      .filter(page => page.path.replace(/[^\/]*$/, '') === dir)
      .sort((a, b) => (
        findPosition(a, pages) - findPosition(b, pages)
      ));

    const page = pages.find(page => page.path === pathContext.path);

    const categoryTitle = findTitle(categoryPages[0], pages);

    return (
      <div>
        <Wrap>
          <div className={b()}>
            <div className={b('menu')}>
              <div className={b('menu-title')}>
                {categoryTitle}
              </div>

              <ul className={b('menu-pages')}>
                {
                  categoryPages.map((page, i) => (
                    <li key={page.path} className={b('menu-page')}>
                      <PageLink to={page}>
                        {i === 0 ? "Introduction" : findTitle(page, pages)}
                      </PageLink>
                    </li>
                  ))
                }
              </ul>

              <div className={b('menu-back')}>
                <Link to="/docs">
                  &laquo; Go back to docs
                </Link>
              </div>
            </div>

            <div className={b('content')}>
              <Space bottom={5}>
                {
                  categoryPages.length > 1 && findPosition(page, pages) !== 1 &&
                    <h6 className={b('content-category')}>
                      {categoryTitle}
                    </h6>
                }
                <h1  className={b('content-title')}>
                  {findTitle(page, pages)}
                </h1>
              </Space>
              <div
                className={b('content-body')}
                dangerouslySetInnerHTML={{ __html: findHtml(page, pages) }}
              />
            </div>
          </div>
        </Wrap>
      </div>
    )
  }
}

export const query = graphql`
  query DocPageQuery {
    pages: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/.*docs.*/" } }
    ) {
      edges {
        node {
          html
          path: fileAbsolutePath
          frontmatter {
            title
            copyFrom
            position
          }
        }
      }
    }
  }
`

