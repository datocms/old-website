import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import parse from 'html-react-parser';
import Lightbox from 'react-images';
import { Wrap, button } from 'blocks';
import ResponsiveSticky from 'components/ResponsiveSticky';

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

  handleMenuToggle(e) {
    e.preventDefault();
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }

  renderTitleBlock(block) {
    return (
      <h3
        className="BrandingPage__content-title"
        key={block.id}
        id={block.title}
      >
        {block.title}
      </h3>
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
    const { id } = block;
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
      <div className="BrandingPage__content-gallery">
        {images.map(image => (
          <a
            href={`${image.url}?auto=format&w=1200&fit=max`}
            style={{ width: `${100 / images.length - 2}%` }}
            className={b('content-gallery__image')}
            onClick={this.handleOpenImage.bind(
              this,
              `${image.url}?auto=format&w=1200&fit=max`,
            )}
          >
            {image.format === 'svg' ? (
              <div className="gatsby-gallery-wrapper">
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
        ))}
      </div>
    );
  }

  renderImageBlock(image) {
    return (
      <a
        href={`${image.url}?auto=format&w=1200&fit=max`}
        className={b('content-image')}
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
    );
  }

  render() {
    const { brandingPage } = this.props.data;
    const menuItems = brandingPage.content.filter(
      block => block.model.apiKey === 'title',
    );
    return (
      <Layout>
        <HelmetDatoCms seo={brandingPage.seoMetaTags} />
        <Wrap>
          <div className={b()}>
            <div className={b('mobile-toc')}>
              <p>
                You're reading <em>"chapterTitle"</em>
              </p>
              <button onClick={this.handleMenuToggle.bind(this)}>
                {this.state.isMenuOpen ? 'Close' : 'Open'} this guide's chapters
              </button>
            </div>

            <div
              className={b('menu', { open: this.state.isMenuOpen })}
              data-datocms-noindex
            >
              <ResponsiveSticky
                minWidth={900}
                top={100}
                bottomBoundary={`.${b()}`}
              >
                <ul className={b('menu-pages')}>
                  {menuItems.map(menuItem => (
                    <li key={menuItem.title} className={b('menu-page')}>
                      <a href={`#${menuItem.title}`}>{menuItem.title}</a>
                    </li>
                  ))}
                </ul>
              </ResponsiveSticky>
            </div>

            <div className={b('content')}>
              <h1 className={b('header')}>Branding guidelines</h1>
              <a href="#download-assets" className={b('link')}>
                Jump straight to the assets
              </a>
              {brandingPage.content.map(block => (
                <React.Fragment key={block.id}>
                  {block.model.apiKey === 'text' && this.renderTextBlock(block)}
                  {block.model.apiKey === 'image' &&
                    this.renderImageBlock(block.image)}
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
        </Wrap>
        <div className={b('footer')} id={'download-assets'}>
          <Wrap>
            <div className={b('footer__title')}>
              Download DatoCMS brand assets
            </div>
            <div className={b('footer__no-card')}>
              One zipped file, inside you will find every lockup in three
              different colorways, both in png and svg format.
            </div>
            <a
              className={button({ red: true, big: true, shadow: true })}
              href={
                brandingPage.assetsZipfile && brandingPage.assetsZipfile.url
              }
              download
            >
              Download assets
            </a>
          </Wrap>
        </div>
        <Lightbox
          backdropClosesModal
          width={1400}
          images={this.state.image ? [{ src: this.state.image }] : []}
          isOpen={this.state.image}
          theme={{ footer: { display: 'none' } }}
          onClose={() => this.setState({ image: null })}
        />
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
      assetsZipfile {
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
