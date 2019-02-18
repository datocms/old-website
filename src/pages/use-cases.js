import React from 'react'
import { graphql } from 'gatsby'
import Masonry from 'react-masonry-component'
import Sticky from 'react-stickynode'
import Slider from 'react-slick'
import CallToAction from 'components/CallToAction'
import { HelmetDatoCms } from 'gatsby-source-datocms'

import bem from 'utils/bem'
import { Wrap, Space } from 'blocks'
import Layout from 'components/Layout';

import Browser from 'components/Browser'
import LazyImage from 'components/LazyImage'

import './use-cases.sass'
import 'slick-carousel/slick/slick.css'

const b = bem.lock('UseCasesPage')

const settings = {
  dots: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  centerMode: true,
  centerPadding: '30px',
  infinite: true,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        centerPadding: '30px',
      }
    },
    {
      breakpoint: 750,
      settings: {
        centerPadding: '140px',
      }
    },
    {
      breakpoint: 850,
      settings: {
        centerPadding: '170px',
      }
    }
  ]
};

class UseCasesPage extends React.Component {
  renderWebsite(differentHeight, website, i) {
    const tech = website.technologies.find(x => x.type.slug === 'static-generator' || x.type.slug === 'framework');

    return (
      <div className={b('website-container')} key={website.id}>
        <div className={b('website', { highlighted: website.highlighted })}>
          <Browser
            small
            title={website.title}
            address={website.url}
          >
              <LazyImage
                height={differentHeight && i % 2 === 0 ? 300 : 200}
                image={website.image}
                slow={website.highlighted}
              />
          </Browser>

          {
            tech &&
              <div className={b('website-technology')}>
                <img alt={tech.name} src={tech.logo.url} className={b('website-technology-logo')} />
                <div className={b('website-technology-name')}>
                  Made with {tech.name}
                </div>
              </div>
          }
        </div>
      </div>
    )
  }

  render() {
    const { data } = this.props;
    const allWebsites = data.websites.edges.map(e => e.node).filter(w => w.image);

    return (
      <Layout>
        <HelmetDatoCms seo={data.page.seoMetaTags} />
        <Space both="10">
          <div className={b()}>
            <div className={b('title')}>
              Use Cases
            </div>
            <div className={b('content')}>
              <Wrap>
                {
                  data.useCases.edges.map(({ node: useCase }) => {
                    const websites = allWebsites.filter(website => website.useCase.id === useCase.id);

                    return (
                      <div className={b('use-case')} key={useCase.id}>
                        <div className={b('use-case-content')} id={`use-case-content-${useCase.id}`}>
                          <Sticky top={120} bottomBoundary={`#use-case-content-${useCase.id}`}>
                            <div className={b('use-case-content-inner')}>
                              <h3 className={b('use-case-title')}>
                                {useCase.title}
                              </h3>
                              <div
                                className={b('use-case-description')}
                                dangerouslySetInnerHTML={{ __html: useCase.description.markdown.html }}
                              />
                            </div>
                          </Sticky>
                        </div>
                        <div className={b('use-case-gallery')}>
                          <div className={b('masonry')}>
                            <Masonry
                              options={{
                                columnWidth: '.UseCasesPage__grid-sizer',
                                gutter: '.UseCasesPage__gutter-sizer',
                                itemSelector: '.UseCasesPage__website',
                                percentPosition: true
                              }}
                            >
                              <div className={b('grid-sizer')} />
                              <div className={b('gutter-sizer')} />
                              {websites.map(this.renderWebsite.bind(this, true))}
                            </Masonry>
                          </div>
                          <div className={b('gallery')}>
                            <Slider {...settings}>
                              {websites.map(this.renderWebsite.bind(this, false))}
                            </Slider>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </Wrap>
            </div>
          </div>
        </Space>
        <CallToAction />
      </Layout>
    );
  }
}

export default UseCasesPage

export const query = graphql`
query UseCasesQuery {
  page: datoCmsUseCasesPage {
    seoMetaTags {
      ...GatsbyDatoCmsSeoMetaTags
    }
  }

  useCases: allDatoCmsUseCase(sort: { fields: [position] }) {
    edges {
      node {
        id
        title
        description: descriptionNode {
          markdown: childMarkdownRemark {
            html
          }
        }
      }
    }
  }

  websites: allDatoCmsWebsite(sort: { fields: [position] }) {
    edges {
      node {
        id
        title
        url
        highlighted
        technologies {
          name
          logo {
            url
          }
          type: integrationType {
            slug
          }
        }
        useCase {
          id
        }
        image {
          width
          height
          url
        }
      }
    }
  }
}
`
