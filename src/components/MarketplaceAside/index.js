import React from 'react'
import { Wrap, button, Space, text } from 'blocks'
import Sticky from 'react-stickynode'
import Link from 'gatsby-link'

import bem from 'utils/bem'
import './style.sass'

import twitter from 'images/twitter.svg'
import medium from 'images/medium.svg'

const b = bem.lock('MarketplaceAside')

const MarketplaceAside = ({ latestEntries, children }) => (
  <Space both={10}>
    <Wrap>
      <div className={b()}>
        <Link to="/plugins/" className={b('mobile-title')}>
          From our Plugins
        </Link>
        <div className={b('cols-content')}>
          {children}
        </div>
        <div className={b('cols-aside')}>
          <Sticky top={100} bottomBoundary={`.${b()}`}>
            <Link to="/plugins/" className={b('title')}>
              DatoCMS Plugins
            </Link>
            <div className={b('section')}>
              <div className={b('section-content')}>
                <p>
                  Extend and add new features with addons, themes, and all sorts of other goodies from our community of more than 2,500 developers and designers.
                </p>
              </div>
            </div>
            <div className={b('section')}>
              <div className={b('section-title')}>
                Stay in touch
              </div>
              <div className={b('section-content')}>
                <div className={b('follow')}>
                  <img src={twitter} />
                  <a href="https://twitter.com/datocms" target="_blank">
                    Follow us on Twitter
                  </a>
                </div>
                <div className={b('follow')}>
                  <img src={medium} />
                  <a href="https://medium.com/datocms" target="_blank">
                    Read us on Medium
                  </a>
                </div>
              </div>
            </div>
          </Sticky>
        </div>
      </div>
    </Wrap>
  </Space>
)

export default MarketplaceAside;
