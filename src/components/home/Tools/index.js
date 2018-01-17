import React from 'react'
import Link from 'gatsby-link'
import Malarquee from 'react-malarquee'

import './style.sass'
import { Wrap, button, Space, text } from 'blocks'

import Browser from 'components/Browser'
import bem from 'utils/bem'

const b = bem.lock('HomeTools')

const HomeHero = ({ data }) => (
  <Space both="6">
    <Malarquee>
      {
        data.home.integrations.map(({ logo }, i) => (
          <img className={b('item')} src={logo.url} key={i} />
        ))
      }
    </Malarquee>
  </Space>
)

export default HomeHero

