import React from 'react'
import Link from 'components/Link'

import './style.sass'
import { Wrap, button, Space, text } from 'blocks'

import Browser from 'components/Browser'
import bem from 'utils/bem'

const b = bem.lock('HomeTools')

const HomeTools = ({ data }) => (
  <div className={b()}>
    <div className={b('marquee')}>
      <div className={b('marquee-track')}>
        {
          data.integrations.edges.map(({ node: { logo } }, i) => (
            <img className={b('item')} src={logo.url} key={i} />
          ))
        }
        {
          data.integrations.edges.map(({ node: { logo } }, i) => (
            <img className={b('item')} src={logo.url} key={i} />
          ))
        }
      </div>
    </div>
  </div>
)

export default HomeTools

