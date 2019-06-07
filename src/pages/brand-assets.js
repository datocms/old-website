import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import parse from 'html-react-parser';
import { Wrap, button, Space } from 'blocks';
import ResponsiveSticky from 'components/ResponsiveSticky';
import slugify from 'slugify';

import bem from 'utils/bem';
import '../components/DocAside/style.sass';
import './brand-assets.sass';

import Layout from 'components/Layout';

const b = bem.lock('DocPage');
const x = bem.lock('BrandingPage');

const Image = ({ image }) => (
  image.format === 'svg' ? (
    <img alt={image.alt} src={image.url} />
  ) : (
    <Img alt={image.alt} fluid={image.fluid} />
  )
)

export default class BrandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { image: null };
  }

  handleMenuToggle(e) {
    e.preventDefault();
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }

  renderTitleBlock(block) {
    return (
      <h3 id={slugify(block.tocTitle)}>
        {block.title}
      </h3>
    );
  }

  renderTextBlock(block) {
    return (
      <div className={'BrandingPage__content-text'}>
        {parse(block.text.markdown.html)}
      </div>
    );
  }

  renderTextImageBlock(block) {
    return (
      <div className={x('two-cols-block')}>
        <div className={x('two-cols-block__text')}>
          {parse(block.text.markdown.html)}
        </div>
        <div className={x('two-cols-block__gallery')}>
          <Image image={block.image} />
        </div>
      </div>
    );
  }

  renderGalleryBlock(block) {
    return (
      <div className={x('gallery-block')}>
        {block.images.map(image => <div><Image image={image} /></div>)}
      </div>
    );
  }

  renderImageBlock(image) {
    return (
      <div className={x('image-block')}>
        <Image image={image} />
      </div>
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
                  {menuItems.filter(m => m.tocTitle).map(menuItem => (
                    <li key={menuItem.tocTitle} className={b('menu-page')}>
                      <a href={`#${slugify(menuItem.tocTitle)}`}>{menuItem.tocTitle}</a>
                    </li>
                  ))}
                </ul>
              </ResponsiveSticky>
            </div>

            <div className={b('content')}>
              <Space bottom={5}>
                <h1 className={b('content-title')}>
                  Brand Assets
                </h1>
              </Space>

              <div className="content-body">
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
          </div>
        </Wrap>
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
          tocTitle
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
          image {
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
