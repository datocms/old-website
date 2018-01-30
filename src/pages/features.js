import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import Sticky from 'react-stickynode';
import { Link as ScrollLink, Element } from 'react-scroll'

import bem from 'utils/bem'
import { Wrap, button, Space, text } from 'blocks'

import Features from 'components/home/Features'
import CallToAction from 'components/CallToAction'
import InlineSVG from 'components/InlineSVG'
import Waypoint from 'react-waypoint'

import './features.sass'

const b = bem.lock('FeaturesPage')

const ScrollableAnchor = ({ children, id }) => (
  <ScrollLink
    href={`#${id}`}
    to={id}
    className={b('toc-item-button')}
    activeClass={b('toc-item-button', { selected: true })}
    spy
    smooth
    duration={500}
    offset={-50}
  >
    {children}
  </ScrollLink>
)

class FeaturesPage extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <div>
        <Space both="10">
          <div className={b()}>
            <div className={b('title')}>
              Features
            </div>
            <div className={b('content')}>
              <Sticky top={50}>
                <div className={b('toc')}>
                  {
                    data.features.edges.map(({ node: { title, slug, description } }, i) => (
                      <div
                        key={i}
                        className={b('toc-item')}
                      >

                      
                        <ScrollableAnchor id={slug}>
                          {title}
                        </ScrollableAnchor>
                      </div>
                    ))
                  }
                </div>
              </Sticky>
              {
                data.features.edges.map(({ node: feature }, i) => {
                  return (
                    <Space key={feature.id} both="10">
                      <Element name={feature.slug}>
                        <Waypoint topOffset="40%" bottomOffset="40%">
                          <div>
                            <Wrap>
                              <div className={b('feature', { odd: i % 2 === 1 })}>
                                <div className={b('feature-image')}>
                                  {
                                    feature.image && feature.image.format === 'svg' &&
                                      <InlineSVG src={feature.image.inlineSvg} />
                                  }
                                  {
                                    feature.image && feature.image.format !== 'svg' &&
                                      <img src={feature.image.url} />
                                  }
                                  {
                                    !feature.image &&
                                      <div className={b('feature-image-placeholder')} />
                                  }
                                </div>
                                <div className={b('feature-content')}>
                                  <h5 className={b('feature-title')}>
                                    {feature.title}
                                  </h5>
                                  <div
                                    className={b('feature-description')}
                                    dangerouslySetInnerHTML={{ __html: feature.description.markdown.html }}
                                  />
                                </div>
                              </div>
                            </Wrap>
                          </div>
                        </Waypoint>
                      </Element>
                    </Space>
                  )
                })
              }
            </div>
          </div>
        </Space>
        <CallToAction />
      </div>
    );
  }
}

export default FeaturesPage

export const query = graphql`
query FeaturesPageQuery {
  features: allDatoCmsFeature(sort: { fields: [position], order: ASC }) {
    edges {
      node {
        id
        title
        slug
        description: descriptionNode {
          markdown: childMarkdownRemark {
            html
          }
        }
        image {
          url
          format
          inlineSvg
        }
      }
    }
  }
}
`

