import React from 'react'
import { Wrap, button, Space, text } from 'blocks'
import Sticky from 'react-stickynode'
import Link from 'gatsby-link'

import bem from 'utils/bem'
import './style.sass'

import twitter from 'images/twitter.svg'
import medium from 'images/medium.svg'

const b = bem.lock('BlogAside')

const BlogAside = ({ latestEntries, children }) => (
  <Space both={10}>
    <Wrap>
      <div className={b()}>
        <Link to="/blog/" className={b('mobile-title')}>
          From our Blog
        </Link>
        <div className={b('cols-content')}>
          {children}
        </div>
        <div className={b('cols-aside')}>
          <Sticky top={100} bottomBoundary={`.${b()}`}>
            <div className={b('title')}>
              DatoCMS Blog
            </div>
            <div className={b('section')}>
              <div className={b('section-content')}>
                <p>
                  Here we post product updates and publish articles on topics such
                  as digital publishing, content strategy, and software development.
                </p>
                <p>
                  Be sure also to check out our <Link to="/changelog/">Product Changelog</Link> for more news!
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

export default BlogAside;
