import React from 'react'
import { Link } from 'gatsby'

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
        <a className={button({ red: true })} href="https://dashboard.datocms.com/signup">
          Try for free!
        </a>
        <div className={b('no-card')}>
          No credit card required, 30 seconds sign-up.
        </div>
      </div>
    </Wrap>
  </Space>
)

export default CallToAction

