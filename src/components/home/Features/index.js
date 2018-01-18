import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

import './style.sass'
import { Wrap, button, Space, text } from 'blocks'

import Browser from 'components/Browser'
import bem from 'utils/bem'

const b = bem.lock('HomeFeatures')

class HomeFeatures extends React.Component {
  constructor(...args) {
    super(...args)

    this.state = {
      selected: 0
    }
  }

  render() {
    const { data } = this.props
    const selectedFeature = data.features.edges[this.state.selected].node

    return (
      <Space both="10">
        <Wrap>
          <div className={b()}>
            <div className={b('title')}>
              Features
            </div>
            <Space both="6">
              <div className={b('toc')}>
                {
                  data.features.edges.map(({ node: { title, description } }, i) => (
                    <div
                      key={i}
                      className={b('toc-item')}
                    >
                      <button
                        className={b('toc-item-button', { selected: i === this.state.selected })}
                        onClick={() => this.setState({ selected: i })}
                      >
                        {title}
                      </button>
                    </div>
                  ))
                }
              </div>
            </Space>
            <div className={b('feature')}>
              <div className={b('feature-image')}>
                {
                  selectedFeature.image ?
                    <Img sizes={selectedFeature.image.sizes} /> :
                    <div className={b('feature-image-placeholder')} />
                }
              </div>
              <div className={b('feature-content')}>
                <h5 className={b('feature-title')}>
                  {selectedFeature.title}
                </h5>
                <div
                  className={b('feature-description')}
                  dangerouslySetInnerHTML={{ __html: selectedFeature.description.markdown.html }}
                />
                <Link to="/" className={button()}>
                  See all features
                </Link>
              </div>
            </div>
          </div>
        </Wrap>
      </Space>
    )
  }
}

export default HomeFeatures

