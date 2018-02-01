import React from 'react'
import { Wrap, button, Space, text } from 'blocks'

import bem from 'utils/bem'
import './style.sass'

import twitter from 'images/twitter.svg'

const b = bem.lock('BlogAside')

const BlogAside = ({ children }) => (
  <Space both={10}>
    <Wrap>
      <div className={b()}>
        <div className={b('cols-left')}>
          {children}
        </div>
        <div className={b('cols-right')}>
          <div className={b('section')}>
            <div className={b('section-title')}>
              About
            </div>
            <div className={b('section-content')}>
              <p>
                This blog is curated by the team behind DatoCMS. We document our 
                progress, announce product updates and publish on topics such 
                as digital publishing, content strategy, and software development.
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
            </div>
          </div>
        </div>
      </div>
    </Wrap>
  </Space>
)

export default BlogAside;
