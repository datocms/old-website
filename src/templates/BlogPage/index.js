import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import { Wrap, button, Space, text } from 'blocks'
import { HelmetDatoCms } from 'gatsby-source-datocms'

import bem from 'utils/bem'
import './style.sass'

import BlogAside from 'components/BlogAside'

const b = bem.lock('BlogPage')

export default class BlogPage extends React.Component {
  render() {
    const articles = this.props.pathContext.group.map(({ node }) => node);

    return (
      <BlogAside>
        <HelmetDatoCms seo={this.props.data.page.seoMetaTags} />
        {
          articles.map((article) => (
            <div key={article.slug} className={b('article')}>
              <h3 className={b('article-title')}>
                <Link to={`/blog/${article.slug}/`}>
                  {article.title}
                </Link>
              </h3>
              <div
                className={b('article-excerpt')}
                dangerouslySetInnerHTML={{ __html: article.excerpt.markdown.html }}
              />
              <div className={b('article-meta')}>
                <Img
                  className={b('article-image')}
                  sizes={article.author.avatar.sizes}
                />
                {article.author.name}, on <Link to={`/blog/${article.slug}/`}>{article.publicationDate}</Link>
              </div>
            </div>
          ))
        }
      </BlogAside>
    );
  }
}

export const query = graphql`
query BlogPageQuery {
  page: datoCmsBlog {
    seoMetaTags {
      ...GatsbyDatoCmsSeoMetaTags
    }
  }
}
`
