import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import { Wrap, button, Space, text } from 'blocks'
import { HelmetDatoCms } from 'gatsby-source-datocms'

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
          <Link to="/blog/" className={b('heading')}>
            From our Blog
          </Link>
          <h1 className={b('title')}>
            <Link to={`/blog/${article.slug}/`}>
              {article.title}
            </Link>
          </h1>
          <div className={b('content')}>
            {
              article.content.map((block) => (
                block.model.apiKey === 'text' ?
                  <div className={b('content-text')} key={block.id}>
                    <div dangerouslySetInnerHTML={{ __html: block.text.markdown.html }} />
                  </div>
                  :
                  <div className={b('content-image')} key={block.id}>
                    <Img sizes={block.image.sizes} />
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
            sizes(maxWidth: 900) {
              ...GatsbyDatoCmsSizes
            }
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

