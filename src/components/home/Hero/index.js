import React from 'react'
import Link from 'gatsby-link'

import './style.sass'
import { Wrap, button, Space, text } from 'blocks'

import Browser from 'components/Browser'
import bem from 'utils/bem'

import screenshot from 'images/screen.png'
import arrowDown from 'images/arrow-down-dropdown.svg'

const b = bem.lock('HomeHero')

const HomeHero = ({ title, description }) => (
  <div className={b()}>
    <Wrap>
      <div className={b('text-container')}>
        <div>
          <Space bottom="2">
            <h1 className={text({ size: 'hero', weight: 'bold' })}>
              {title}
            </h1>
          </Space>
          <Space bottom="4">
            <p className={text({ size: 'big' })}>
              {description}
            </p>
          </Space>
          <Space bottom="2">
            <Link to="https://dashboard.datocms.com/register" className={button({ red: true })}>
              Try it free
            </Link>
            <div className={b('or-discover')}>
              or discover more <img src={arrowDown} />
            </div>
          </Space>
          <p className={text({ size: 'small' })}>
            No credit card required, 30 seconds sign-up
          </p>
        </div>
      </div>
    </Wrap>
    <div className={b('browser')}>
      <Browser>
        <img className={b('screenshot-image')} src={screenshot} />
      </Browser>
    </div>
  </div>
)

export default HomeHero

