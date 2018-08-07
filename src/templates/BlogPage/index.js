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
    const { pageCount, first, last, index } = this.props.pathContext;

    return (
      <BlogAside>
        <HelmetDatoCms seo={this.props.data.page.seoMetaTags} />
        <div>
          <div className={b('article')}>
            <div className={b('article-body')}>
              <h3 className={b('article-title')}>
                <Link to="/changelog/">
                  Latest product changes
                </Link>
              </h3>
              <div className={b('article-meta')}>
                <Img
                  className={b('article-author-image')}
                  sizes={this.props.data.author.avatar.sizes}
                />
                {this.props.data.author.name}, on <Link to="/changelog/">{this.props.data.latestEntries.edges[0].node.publicationDate}</Link>
              </div>
              <div className={b('article-excerpt')}>
                <p>Here's the latest changes made to DatoCMS:</p>
                <ul className={b('changelog-entries')}>
                  {
                    this.props.data.latestEntries.edges.map(({ node }) => (
                      <li>
                        <Link key={node.slug} to={`/changelog/${node.slug}/`}>
                          {node.title}
                        </Link>
                      </li>
                    ))
                  }
                </ul>
              </div>
              <Link
                to="/changelog/"
                className="button button--red"
              >
                Read the complete changelog
              </Link>
            </div>
          </div>
          {
            articles.map((article) => (
              <div key={article.slug} className={b('article')}>
                <div className={b('article-body')}>
                  <h3 className={b('article-title')}>
                    <Link to={`/blog/${article.slug}/`}>
                      {article.title}
                    </Link>
                  </h3>
                  <div className={b('article-meta')}>
                    <Img
                      className={b('article-author-image')}
                      sizes={article.author.avatar.sizes}
                    />
                    {article.author.name}, on <Link to={`/blog/${article.slug}/`}>{article.publicationDate}</Link>
                  </div>
                  <div className={b('article-excerpt')}>
                    <div dangerouslySetInnerHTML={{ __html: article.excerpt.markdown.html }} />
                  </div>
                  <Link
                    to={`/blog/${article.slug}/`}
                    className="button button--red"
                  >
                    Read the article
                  </Link>
                </div>
                <Link to={`/blog/${article.slug}/`} className={b('article-image')}>
                  {
                    article.coverImage &&
                      <img src={article.coverImage.url + '?w=250&h=250&fit=crop'} />
                  }
                </Link>
              </div>
            ))
          }
        </div>
        {
          !first &&
            <Link to={index === 2 ? '/blog/' : `/blog/${index-1}/`} className={b('previous')}>
              See next posts &raquo;
            </Link>
        }
        {
          !last &&
            <Link to={`/blog/${index+1}/`} className={b('previous')}>
              &laquo; See previous posts
            </Link>
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
  author: datoCmsAuthor {
    name
    avatar {
      url
      sizes(maxWidth: 80) {
        base64
        aspectRatio
        src
        srcSet
        sizes
      }
    }
  }
  latestEntries: allDatoCmsChangelogEntry(limit: 5, sort: {fields: [publicationDate], order: DESC}) {
    edges {
      node {
        title
        slug
        publicationDate(formatString: "MMM D, YYYY")
      }
    }
  }
}
`
