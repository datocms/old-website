import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import Sticky from 'react-stickynode';
import ScrollableAnchor from 'react-scrollable-anchor'

import bem from 'utils/bem'
import { Wrap, button, Space, text } from 'blocks'

import Features from '../components/home/Features'
import CallToAction from '../components/CallToAction'
import Waypoint from 'react-waypoint'

import './features.sass'

const b = bem.lock('FeaturesPage')

class FeaturesPage extends React.Component {
  constructor(props) {
    super(...props)
    this.state = { activeFeature: 0 };
  }

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
                        <a
                          href={`#${slug}`}
                          className={b('toc-item-button', { selected: i === this.state.activeFeature })}
                        >
                          {title}
                        </a>
                      </div>
                    ))
                  }
                </div>
              </Sticky>
              {
                data.features.edges.map(({ node: feature }, i) => (
                  <Space key={feature.id} both="10">
                    <ScrollableAnchor id={feature.slug}>
                      <Waypoint topOffset="40%" bottomOffset="40%" onEnter={() => this.setState({ activeFeature: i })}>
                        <div>
                          <Wrap>
                            <div className={b('feature', { odd: i % 2 === 1 })}>
                              <div className={b('feature-image')}>
                                {
                                  feature.image ?
                                    <img src={feature.image.url} /> :
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
                    </ScrollableAnchor>
                  </Space>
                ))
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
        }
      }
    }
  }
}
`

