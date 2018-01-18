import React from 'react'
import Link from 'gatsby-link'

import './style.sass'
import { Wrap, button, Space, text } from 'blocks'

import bem from 'utils/bem'

const b = bem.lock('CallToAction')

const CallToAction = ({ data }) => (
  <Space both="10">
    <Wrap>
      <div className={b()}>
        <div className={b('title')}>
          Ready to try it yourself?
        </div>
        <Link className={button({ red: true, big: true })} to="/">
          Try it free!
        </Link>
        <div className={b('no-card')}>
          No credit card required
        </div>
      </div>
    </Wrap>
  </Space>
)

export default CallToAction

