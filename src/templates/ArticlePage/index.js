import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import { Wrap, button, Space, text } from 'blocks'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import ResponsiveEmbed from 'react-responsive-embed'

import bem from 'utils/bem'
import './style.sass'

import BlogAside from 'components/BlogAside'

const b = bem.lock('ArticlePage')

export default class ArticlePage extends React.Component {
  render() {
    const { article } = this.props.data;

    return (
      <BlogAside>
        <HelmetDatoCms seo={article.seoMetaTags} />
        <div className={b()}>
          <h1 className={b('title')}>
            <Link to={`/blog/${article.slug}/`}>
              {article.title}
            </Link>
          </h1>
          <div className={b('content')}>
            {
              article.content.map((block) => (
                <div key={ block.id }>
                  {
                    block.model.apiKey === 'text' &&
                      <div className={b('content-text')}>
                        <div dangerouslySetInnerHTML={{ __html: block.text.markdown.html }} />
                      </div>
                  }
                  {
                    block.model.apiKey === 'image' &&
                      <div className={b('content-image')} style={{ maxWidth: `${block.image.width}px` }}>
                        <Img sizes={block.image.sizes} />
                        {
                          block.image.title &&
                            <div className={b('content-image__label')}>
                              {block.image.title}
                            </div>
                        }
                      </div>
                  }
                  {
                    block.model.apiKey === 'video' &&
                      <div className={b('content-video')}>
                        <div className={b('content-video__wrapper')}>
                          {
                            block.video.provider === 'youtube' ?
                              <ResponsiveEmbed
                                src={`//www.youtube.com/embed/${block.video.providerUid}`}
                                ratio={`${block.video.width}:${block.video.height}`}
                                allowFullScreen
                              />
                              :
                              <ResponsiveEmbed
                                src={`//player.vimeo.com/video/${block.video.providerUid}?title=0&byline=0&portrait=0`}
                                ratio={`${block.video.width}:${block.video.height}`}
                                allowFullScreen
                              />
                          }
                        </div>
                      </div>
                  }
                </div>
              ))
            }
          </div>
          <div className={b('meta')}>
            <Img
              className={b('image')}
              sizes={article.author.avatar.sizes}
            />
            {article.author.name}, on <Link to={`/blog/${article.slug}/`}>{article.publicationDate}</Link>
          </div>
        </div>
      </BlogAside>
    );
  }
}

export const query = graphql`
  query ArticlePageQuery($slug: String!) {
    article: datoCmsBlogPost(slug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      slug
      title
      content {
        ... on DatoCmsText {
          id
          model { apiKey }
          text: textNode {
            markdown: childMarkdownRemark {
              html
            }
          }
        }
        ... on DatoCmsImage {
          id
          model { apiKey }
          image {
            url
            width
            title
            sizes(maxWidth: 900) {
              ...GatsbyDatoCmsSizes
            }
          }
        }
        ... on DatoCmsVideo {
          id
          model { apiKey }
          video {
            url
            title
            provider
            width
            height
            providerUid
          }
        }
      }
      publicationDate(formatString: "MMM D, YYYY")
      author {
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
    }
  }
`

