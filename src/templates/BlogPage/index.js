import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import { Wrap, button, Space, text } from 'blocks'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Masonry from 'react-masonry-component'

import bem from 'utils/bem'
import './style.sass'

import BlogAside from 'components/BlogAside'

const b = bem.lock('BlogPage')

export default class BlogPage extends React.Component {
  render() {
    const articles = this.props.pathContext.group.map(({ node }) => node);
    const { pageCount, first, last, index } = this.props.pathContext;

    return (
      <Space both={10}>
        <Wrap>
          <div className={b()}>
            <HelmetDatoCms seo={this.props.data.page.seoMetaTags} />
            <div className={b('title')}>
              Blog
            </div>
            <div className={b('subtitle')}>
              News, tips, highlights, and other updates from the team at DatoCMS.
            </div>
            <div className={b('masonry')}>
              <Masonry
                options={{
                  columnWidth: '.BlogPage__grid-sizer',
                  gutter: '.BlogPage__gutter-sizer',
                  itemSelector: '.BlogPage__article',
                  percentPosition: true
                }}
              >
                <div className={b('grid-sizer')} />
                <div className={b('gutter-sizer')} />
                <Link className={b('article')} to="/changelog/">
                  <h3 className={b('article-title')}>
                    Latest product changes
                  </h3>
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
                  <div className={b('article-meta')}>
                    <div className={b('article-meta-left')}>
                      <Img
                        className={b('article-author-image')}
                        sizes={this.props.data.author.avatar.sizes}
                      />
                    </div>
                    <div className={b('article-meta-right')}>
                      <p>{this.props.data.author.name}</p>
                      <p>{this.props.data.latestEntries.edges[0].node.publicationDate}</p>
                    </div>
                  </div>
                </Link>
                {
                  articles.map((article) => (
                    <Link to={`/blog/${article.slug}/`} key={article.slug} className={b('article')}>
                      {
                        article.coverImage &&
                          <img className={b('article-image')} src={article.coverImage.url + '?w=900'} />
                      }
                      <h3 className={b('article-title')}>
                        {article.title}
                      </h3>
                      <div className={b('article-excerpt')}>
                        <div dangerouslySetInnerHTML={{ __html: article.excerpt.markdown.html }} />
                      </div>
                      <div className={b('article-meta')}>
                        <div className={b('article-meta-left')}>
                          <Img
                            className={b('article-author-image')}
                            sizes={article.author.avatar.sizes}
                          />
                        </div>
                        <div className={b('article-meta-right')}>
                          <p>{article.author.name}</p>
                          <p>{article.publicationDate}</p>
                        </div>
                      </div>
                    </Link>
                  ))
                }
              </Masonry>
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
          </div>
        </Wrap>
      </Space>
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
