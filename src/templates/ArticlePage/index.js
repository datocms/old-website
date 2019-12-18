import React from 'react';
import { graphql } from 'gatsby';
import Link from 'components/Link';
import Img from 'gatsby-image';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import Helmet from 'react-helmet';
import ResponsiveEmbed from 'react-responsive-embed';
import Lightbox from 'react-images';
import parse from 'html-react-parser';
import VideoJsPlayer from 'components/VideoPlayer';
import bem from 'utils/bem';
import './style.sass';
import 'components/DocAside/content.sass';

import Layout from 'components/Layout';
import CallToAction from 'components/CallToAction';

const b = bem.lock('ArticlePage');

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
        <div className={b()}>
          <HelmetDatoCms seo={article.seoMetaTags} />
          <Helmet>
            <meta
              property="article:published_time"
              content={new Date(article.rawPublicationDate).toISOString()}
            />
          </Helmet>
          <div className={b('header')}>
            <div className={b('header__inner')}>
              <div className={b('meta')}>
                <div className={b('meta__avatar')}>
                  <Img fixed={article.author.avatar.fixed} />
                </div>
                <div className={b('meta__description')}>
                  <p>
                    <strong>{article.author.name}</strong>
                  </p>
                  <p>
                    <Link to={`/blog/${article.slug}/`}>
                      {article.publicationDate}
                    </Link>
                  </p>
                </div>
              </div>
              <h1 className={b('title')}>
                <Link to={`/blog/${article.slug}/`}>{article.title}</Link>
              </h1>
            </div>
          </div>
          <div className={b('content')}>
            <div className="content-body">
              {article.content.map(block => (
                <React.Fragment key={block.id}>
                  {block.model.apiKey === 'typeform' && ReactTypeformEmbed && (
                    <div className={b('content-poll')}>
                      {typeof document !== 'undefined' && (
                        <ReactTypeformEmbed
                          url={block.typeform}
                          style={{
                            position: 'static',
                            top: 'auto',
                            left: 'auto',
                            width: '100%',
                            height: '600px',
                            overflow: 'hidden',
                          }}
                        />
                      )}
                    </div>
                  )}
                  {block.model.apiKey === 'text' &&
                    parse(block.text.markdown.html)}
                  {block.model.apiKey === 'internal_video' && (
                    <div
                      className={b('content-image')}
                      style={{ maxWidth: `${block.video.width}px` }}
                    >
                      <VideoJsPlayer
                        playerId={`video-js-${block.id}`}
                        controls
                        autoplay={block.autoplay}
                        autoload
                        aspectRatio={`${block.video.width}:${block.video.height}`}
                        loop={block.loop}
                        hidePlaybackRates
                        src={block.video.video.streamingUrl}
                        poster={`${
                          block.video.video.thumbnailUrl
                        }?time=${block.thumbTimeSeconds ||
                          block.video.video.duration / 2}`}
                      />
                      {block.video.title && (
                        <div className={b('content-image__label')}>
                          {block.video.title}
                        </div>
                      )}
                    </div>
                  )}
                  {block.model.apiKey === 'question_answer' && (
                    <div className={b('question-answer')}>
                      <div className={b('question-answer__question')}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: block.question.markdown.html,
                          }}
                        />
                      </div>
                      <div className={b('question-answer__answer')}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: block.answer.markdown.html,
                          }}
                        />
                      </div>
                    </div>
                  )}
                  {block.model.apiKey === 'quote' && (
                    <div className={b('quote')}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: block.quote.markdown.html,
                        }}
                      />
                    </div>
                  )}
                  {block.model.apiKey === 'image' && (
                    <div
                      className={b('content-image')}
                    >
                      <a
                        href={`${block.image.url}?auto=format&w=1200&fit=max`}
                        style={{ maxWidth: `${block.image.width}px` }}
                        className={b('content-image__image')}
                        onClick={this.handleOpenImage.bind(
                          this,
                          `${block.image.url}?auto=format&w=1200&fit=max`,
                        )}
                      >
                        {block.image.format === 'gif' && (
                          <video
                            poster={`${block.image.url}?fm=jpg&fit=max&w=900`}
                            controls
                            loop
                            autoPlay
                          >
                            <source
                              src={`${block.image.url}?fm=webm&w=900`}
                              type="video/webm"
                            />
                            <source
                              src={`${block.image.url}?fm=mp4&w=900`}
                              type="video/mp4"
                            />
                          </video>
                        )}
                        {block.image.format !== 'gif' && block.image.fluid && (
                          <Img
                            alt={block.image.alt}
                            fluid={block.image.fluid}
                          />
                        )}
                        {block.image.format !== 'gif' && !block.image.fluid && (
                          <img
                            alt={block.image.alt}
                            src={`${block.image.url}?fit=max&w=900`}
                          />
                        )}
                      </a>
                      {block.image.title && (
                        <div className={b('content-image__label')}>
                          {block.image.title}
                        </div>
                      )}
                    </div>
                  )}
                  {block.model.apiKey === 'video' && (
                    <div className={b('content-video')}>
                      <div className={b('content-video__wrapper')}>
                        {block.video.provider === 'youtube' ? (
                          <ResponsiveEmbed
                            src={`//www.youtube.com/embed/${block.video.providerUid}`}
                            ratio={`${block.video.width}:${block.video.height}`}
                            allowFullScreen
                          />
                        ) : (
                          <ResponsiveEmbed
                            src={`//player.vimeo.com/video/${block.video.providerUid}?title=0&byline=0&portrait=0`}
                            ratio={`${block.video.width}:${block.video.height}`}
                            allowFullScreen
                          />
                        )}
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
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
        <CallToAction />
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
      coverImage {
        url
      }
      content {
        ... on DatoCmsText {
          id
          model {
            apiKey
          }
          text: textNode {
            markdown: childMarkdownRemark {
              html
            }
          }
        }
        ... on DatoCmsTypeform {
          id
          model {
            apiKey
          }
          typeform
        }
        ... on DatoCmsImage {
          id
          model {
            apiKey
          }
          image {
            format
            alt
            url
            format
            width
            title
            fluid(maxWidth: 810) {
              ...GatsbyDatoCmsFluid
            }
          }
        }
        ... on DatoCmsVideo {
          id
          model {
            apiKey
          }
          video {
            url
            title
            provider
            width
            height
            providerUid
          }
        }
        ... on DatoCmsInternalVideo {
          id
          model {
            apiKey
          }
          autoplay
          loop
          thumbTimeSeconds
          video {
            title
            width
            height
            video {
              duration
              streamingUrl
              thumbnailUrl
            }
          }
        }
        ... on DatoCmsQuote {
          id
          model {
            apiKey
          }
          quote: quoteNode {
            markdown: childMarkdownRemark {
              html
            }
          }
          author
        }
        ... on DatoCmsQuestionAnswer {
          id
          model {
            apiKey
          }
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
      }
      publicationDate(formatString: "MMMM Do YYYY")
      rawPublicationDate: publicationDate
      author {
        name
        avatar {
          fixed(
            width: 50
            imgixParams: { w: "50", h: "50", fit: "crop", crop: "faces" }
          ) {
            ...GatsbyDatoCmsFixed
          }
        }
      }
    }
  }
`;
