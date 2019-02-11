import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import { Wrap, button, Space, text } from 'blocks'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Helmet from 'react-helmet'

import bem from 'utils/bem'
import '../ChangelogPage/style.sass'

import Layout from 'components/Layout'
import BlogAside from 'components/BlogAside'

const b = bem.lock('ChangelogPage')

export default class ChangelogEntry extends React.Component {
  render() {
    const article = this.props.data.article;

    return (
      <Layout>
        <Space both={10}>
          <Wrap>
            <HelmetDatoCms seo={article.seoMetaTags} />
            <div className={b()}>
              <div className={b('title')}>
                <Link to="/changelog/">
                  Product Changelog
                </Link>
              </div>
              <div key={article.slug} className={b('article')}>
                <div className={b('article-meta')}>
                  {article.publicationDate}
                </div>
                <div className={b('article-body')}>
                  <div className={b('article-title')}>
                    {article.title}
                  </div>
                  <div className={b('article-categories')}>
                    {
                      article.categories.map(cat => (
                        <div key={cat.name} className={b('article-category')} style={{ backgroundColor: cat.color.hex }}>
                          {cat.name}
                        </div>
                      ))
                    }
                  </div>
                  <div
                    className={b('article-content')}
                    dangerouslySetInnerHTML={{ __html: article.content.markdown.html }}
                  />
                </div>
              </div>
              <div className={b('pagination')}>
                <Link to="/changelog/" className={b('previous')}>
                  See all the announcements
                </Link>
              </div>
            </div>
          </Wrap>
        </Space>
      </Layout>
    );
  }
}

export const query = graphql`
  query ArticleEntryQuery($slug: String!) {
    article: datoCmsChangelogEntry(slug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      id
      title
      slug
      content: contentNode {
        markdown: childMarkdownRemark {
          html
        }
      }
      publicationDate(formatString: "MMM D, YYYY")
      categories {
        name
        color { hex }
      }
    }
  }
`
