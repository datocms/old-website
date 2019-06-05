import React from 'react';
import { graphql } from 'gatsby';
import Link from 'components/Link';
import Img from 'gatsby-image';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import Helmet from 'react-helmet';
import ResponsiveEmbed from 'react-responsive-embed';
import parse from 'html-react-parser';

import bem from 'utils/bem';
import './branding.sass';

import Layout from 'components/Layout';

const b = bem.lock('BrandingPage');

export default class BrandingPage extends React.Component {
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

  renderTitleBlock(block) {
    return (
      <h1 className="BrandingPage__content-title" key={block.id}>
        {block.title}
      </h1>
    );
  }

  renderTextBlock(block) {
    return (
      <div className={'BrandingPage__content-text'} key={block.id}>
        {parse(block.text.markdown.html)}
      </div>
    );
  }

  renderTextImageBlock(block) {
    const { id, text } = block;
    return (
      <div className="BrandingPage__content-two-columns" key={id}>
        {this.renderTextBlock(block)}
        {block.images.length > 0 && this.renderGalleryBlock(block)}
      </div>
    );
  }

  renderGalleryBlock(block) {
    const images = block.images;
    return (
      <>
        {images.map(image => {
          return (
            <div
              className={b('content-image')}
              style={{ maxWidth: `${image.width}px` }}
            >
              <a
                href={`${image.url}?auto=format&w=1200&fit=max`}
                className={b('content-image__image')}
                onClick={this.handleOpenImage.bind(
                  this,
                  `${image.url}?auto=format&w=1200&fit=max`,
                )}
              >
                {image.format === 'svg' ? (
                  <div className="gatsby-image-wrapper">
                    <div
                      className="svg"
                      style={{
                        backgroundImage: `url(${image.url})`,
                      }}
                    />
                  </div>
                ) : (
                  <Img alt={image.alt} fluid={image.fluid} />
                )}
              </a>
              {image.title && (
                <div className={b('content-image__label')}>{image.title}</div>
              )}
            </div>
          );
        })}
      </>
    );
  }

  renderImageBlock(block) {
    const { image } = block;
    return (
      <div
        className={b('content-image')}
        style={{ maxWidth: `${image.width}px` }}
      >
        <a
          href={`${image.url}?auto=format&w=1200&fit=max`}
          className={b('content-image__image')}
          onClick={this.handleOpenImage.bind(
            this,
            `${image.url}?auto=format&w=1200&fit=max`,
          )}
        >
          {image.format === 'svg' ? (
            <div className="gatsby-image-wrapper">
              <div
                className="svg"
                style={{
                  backgroundImage: `url(${image.url})`,
                }}
              />
            </div>
          ) : (
            <Img alt={image.alt} fluid={image.fluid} />
          )}
        </a>
        {image.title && (
          <div className={b('content-image__label')}>{image.title}</div>
        )}
      </div>
    );
  }

  render() {
    const { brandingPage } = this.props.data;
    return (
      <Layout>
        <div className={b()}>
          <HelmetDatoCms seo={brandingPage.seoMetaTags} />
          <Helmet>
            <meta property="brandingPage:published_time" />
          </Helmet>
          <div className={b('header')}>
            <div className={b('header__inner')}>
              <h1 className={b('title')}>DatoCMS - Branding guidelines</h1>
            </div>
          </div>
          <div className={b('content')}>
            <div className="content-body">
              {brandingPage.content.map(block => (
                <React.Fragment key={block.id}>
                  {block.model.apiKey === 'text' && this.renderTextBlock(block)}
                  {block.model.apiKey === 'image' &&
                    this.renderImageBlock(block)}
                  {block.model.apiKey === 'gallery' &&
                    this.renderGalleryBlock(block)}
                  {block.model.apiKey === 'title' &&
                    this.renderTitleBlock(block)}
                  {block.model.apiKey === 'text_image' &&
                    this.renderTextImageBlock(block)}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export const query = graphql`
  query BrandingPageQuery {
    brandingPage: datoCmsBrandingPage {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
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
        ... on DatoCmsTitle {
          id
          model {
            apiKey
          }
          title
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
        ... on DatoCmsGallery {
          id
          model {
            apiKey
          }
          images {
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
        ... on DatoCmsTextImage {
          id
          model {
            apiKey
          }
          text: textNode {
            markdown: childMarkdownRemark {
              html
            }
          }
          images {
            format
            alt
            url
            format
            title
            fluid(maxWidth: 810) {
              ...GatsbyDatoCmsFluid
            }
          }
        }
      }
    }
  }
`;
