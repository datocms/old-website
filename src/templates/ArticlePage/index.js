import React from 'react'
import { graphql } from 'gatsby'
import Link from 'components/Link'
import Img from 'gatsby-image'
import { Wrap, button, Space, text } from 'blocks'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import ResponsiveEmbed from 'react-responsive-embed'
import Lightbox from 'react-images'
import parse from 'html-react-parser'

import bem from 'utils/bem'
import './style.sass'
import 'components/DocAside/content.sass'

import Layout from 'components/Layout'
import BlogAside from 'components/BlogAside'

const b = bem.lock('ArticlePage')

export default class ArticlePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { image: null };
  }

  componentDidMount() {
    try {
      const { ReactTypeformEmbed } = require('react-typeform-embed');
      this.ReactTypeformEmbed = ReactTypeformEmbed;
    } catch (error) {
      console.log(error);
    }
  }

  handleOpenImage(image, e) {
    e.stopPropagation();
    e.preventDefault();

    this.setState({ image });
  }

  render() {
    const { article } = this.props.data;
    const { ReactTypeformEmbed } = this;

    return (
      <Layout>
        <Space both={10}>
          <Wrap>
            <div className={b()}>
              <HelmetDatoCms seo={article.seoMetaTags} />
              <h1 className={b('title')}>
                <Link to={`/blog/${article.slug}/`}>
                  {article.title}
                </Link>
              </h1>
              <div className="content-body">
                {
                  article.content.map((block) => (
                    <React.Fragment key={block.id}>
                      {
                        block.model.apiKey === 'typeform' &&
                          ReactTypeformEmbed &&
                            <div className={b('content-poll')}>
                              {
                                typeof document !== 'undefined' &&
                                  <ReactTypeformEmbed
                                    url={block.typeform}
                                    style={{
                                      position: 'static',
                                      top: 'auto',
                                      left: 'auto',
                                      width: '100%',
                                      height: '600px',
                                      overflow: 'hidden'
                                    }}
                                  />
                              }
                            </div>
                      }
                      {
                        block.model.apiKey === 'text' &&
                          parse(block.text.markdown.html)
                      }
                      {
                        block.model.apiKey === 'question_answer' &&
                          <div className={b('question-answer')}>
                            <div className={b('question-answer__question')}>
                              <div dangerouslySetInnerHTML={{ __html: block.question.markdown.html }} />
                            </div>
                            <div className={b('question-answer__answer')}>
                              <div dangerouslySetInnerHTML={{ __html: block.answer.markdown.html }} />
                            </div>
                          </div>
                      }
                      {
                        block.model.apiKey === 'quote' &&
                          <div className={b('quote')}>
                            <div dangerouslySetInnerHTML={{ __html: block.quote.markdown.html }} />
                          </div>
                      }
                      {
                        block.model.apiKey === 'image' &&
                          <div className={b('content-image')} style={{ maxWidth: `${block.image.width}px` }}>
                            <a
                              href={`${block.image.url}?w=1200&fit=max`}
                              className={b('content-image__image')}
                              onClick={this.handleOpenImage.bind(this, `${block.image.url}?w=1200&fit=max`)}
                            >
                              {
                                block.image.format === 'gif' ?
                                  <img src={block.image.url} /> :
                                  <Img fluid={block.image.fluid} />
                              }
                            </a>
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
                    </React.Fragment>
                  ))
                }
              </div>
              <div className={b('meta')}>
                <Img
                  className={b('image')}
                  fluid={article.author.avatar.fluid}
                />
                {article.author.name}, on <Link to={`/blog/${article.slug}/`}>{article.publicationDate}</Link>
              </div>
              <Lightbox
                backdropClosesModal
                width={1400}
                images={this.state.image ? [{ src: this.state.image }] : []}
                isOpen={this.state.image}
                theme={{
                  footer: {
                    display: 'none',
                  },
                }}
                onClose={() => this.setState({ image: null })}
              />
            </div>
          </Wrap>
        </Space>
      </Layout>
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
        ... on DatoCmsTypeform {
          id
          model { apiKey }
          typeform
        }
        ... on DatoCmsImage {
          id
          model { apiKey }
          image {
            format
            url
            format
            width
            title
            fluid(maxWidth: 900) {
              ...GatsbyDatoCmsFluid
            }
          }
        }
        ... on DatoCmsQuote {
          id
          model { apiKey }
          quote: quoteNode {
            markdown: childMarkdownRemark {
              html
            }
          }
          author
        }
        ... on DatoCmsQuestionAnswer {
          id
          model { apiKey }
          question: questionNode {
            markdown: childMarkdownRemark {
              html
            }
          }
          answer: answerNode {
            markdown: childMarkdownRemark {
              html
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
          fluid(maxWidth: 80) {
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

