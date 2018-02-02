import React from 'react'
import Link from 'gatsby-link'
import { Link as ScrollLink, Element } from 'react-scroll'

import './style.sass'
import { Wrap, button, Space, text } from 'blocks'

import Browser from 'components/Browser'
import bem from 'utils/bem'

import screenshot from 'images/screen.png'
import arrowDown from 'images/arrow-down-dropdown.svg'

const b = bem.lock('HomeHero')

const HomeHero = ({ title, description }) => (
  <div>
    <div className={b()}>
      <div className={b('inner')}>
        <div className={b('text-container')}>
          <div>
            <h1 className={b('title')}>
              {title}
            </h1>
            <Space bottom="4">
              <p className={text({ size: 'big' })}>
                {description}
              </p>
            </Space>
            <Space bottom="2">
              <a href="https://dashboard.datocms.com/register" className={button({ red: true })}>
                Try it free
              </a>
              <ScrollLink
                href="#"
                to="discover"
                className={b('or-discover')}
                smooth
                duration={500}
                offset={-50}
              >
                or discover more <img src={arrowDown} />
              </ScrollLink>
            </Space>
            <p className={text({ size: 'small' })}>
              No credit card required, 30 seconds sign-up.
            </p>
          </div>
        </div>
        <div className={b('browser')}>
          <Browser>
            <img className={b('screenshot-image')} src={screenshot} />
          </Browser>
        </div>
      </div>
    </div>
    <Element name="discover" />
  </div>
)

export default HomeHero


