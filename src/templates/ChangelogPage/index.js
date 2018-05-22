import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import { Wrap, button, Space, text } from 'blocks'
import { HelmetDatoCms } from 'gatsby-source-datocms'

import bem from 'utils/bem'
import './style.sass'

import BlogAside from 'components/BlogAside'

const b = bem.lock('ChangelogPage')

export default class BlogPage extends React.Component {
  render() {
    const articles = this.props.pathContext.group.map(({ node }) => node);

    return (
      <Space both={10}>
        <Wrap>
          <HelmetDatoCms seo={this.props.data.page.seoMetaTags} />
          {
            articles.map((article) => (
              <div key={article.slug} className={b('article')}>
                <div className={b('article-body')}>
                  <div
                    className={b('article-content')}
                    dangerouslySetInnerHTML={{ __html: article.content.markdown.html }}
                  />
                  <div className={b('article-categories')}>
                    {
                      article.categories.map(cat => (
                        <div key={cat.name} className={b('article-category')}>
                          {cat.name}
                        </div>
                      ))
                    }
                  </div>
                </div>
                <div className={b('article-meta')}>
                  {article.publicationDate}
                </div>
              </div>
            ))
          }
        </Wrap>
      </Space>
    );
  }
}

export const query = graphql`
query ChangelogPageQuery {
  page: datoCmsChangelog {
    seoMetaTags {
      ...GatsbyDatoCmsSeoMetaTags
    }
  }
}
`
