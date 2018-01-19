import React from 'react'
import Link from 'gatsby-link'
import { Wrap, button, Space, text } from 'blocks'
import sortBy from 'sort-by'

import bem from 'utils/bem'

import 'prismjs/themes/prism-solarizedlight.css'
import './style.sass'

const b = bem.lock('DocPage')

const categories = [
  { id: 'overview',   title: 'Overview' },
  { id: 'schema',     title: 'Building the admin area' },
  { id: 'jekyll',     title: 'Integrating with Jekyll' },
  { id: 'gatsby',     title: 'Integrating with Gatsby' },
  { id: 'hugo',       title: 'Integrating with Hugo' },
  { id: 'middleman',  title: 'Integrating with Middleman' },
  { id: 'metalsmith', title: 'Integrating with Metalsmith' },
  { id: 'other',      title: 'Integrating with other generators' },
  { id: 'deploy',     title: 'Deploy your website' },
  { id: 'search',     title: 'DatoCMS Site Search (beta)' },
  { id: 'api-client', title: 'API Clients' },
];

const PageLink = ({ to, children }) => (
  <Link
    exact
    to={to.path.replace(/.*\/src/, '').replace(/(\/index)?\.md$/, '')}
    activeClassName="is-active"
  >
    {children}
  </Link>
)

export default class DocPage extends React.Component {
  render() {
    const { page } = this.props.data
    const pages = this.props.data.pages.edges.map(edge => edge.node);

    return (
      <div>
        <Wrap>
          <div className={b()}>
            <ul className={b('menu')}>
              {
                categories.map(category => {
                  const categoryPages = pages
                    .filter(page => page.frontmatter.category === category.id)
                    .sort(sortBy('position'))

                  return (
                    <li key={category.id} className={b('menu-category')}>
                      <div className={b('menu-category-name')}>
                        <PageLink to={categoryPages[0]}>
                          {category.title}
                        </PageLink>
                      </div>
                      {
                        category.id === page.frontmatter.category &&
                          <ul className={b('menu-pages')}>
                            {
                              categoryPages.map(page => (
                                <li key={page.path} className={b('menu-page')}>
                                  <PageLink to={page}>
                                    {
                                      page.frontmatter.title ||
                                        pages.find(p => p.path.includes(page.frontmatter.copyFrom)).frontmatter.title
                                    }
                                  </PageLink>
                                </li>
                              ))
                            }
                          </ul>
                      }
                    </li>
                  )
                })
              }
            </ul>
            <div className={b('content')}>
              <Space bottom={3}>
                <h1 className={text({ size: 'hero' })}>
                  {
                    page.frontmatter.title ||
                      pages.find(p => p.path.includes(page.frontmatter.copyFrom)).frontmatter.title
                  }
                </h1>
              </Space>
              <div dangerouslySetInnerHTML={{ __html: page.html }} />
            </div>
          </div>
        </Wrap>
      </div>
    )
  }
}

export const query = graphql`
  query DocPageQuery($path: String!) {
    pages: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/.*docs.*/" } }
    ) {
      edges {
        node {
          path: fileAbsolutePath
          frontmatter {
            category
            title
            copyFrom
          }
        }
      }
    }
    page: markdownRemark(fileAbsolutePath: { eq: $path }) {
      html
      frontmatter {
        category
        title
        copyFrom
      }
    }
  }
`

