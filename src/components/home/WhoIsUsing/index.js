import React from 'react'
import Link from 'gatsby-link'
import bem from 'utils/bem'
import Zoom from 'react-reveal/Zoom'

import { wrap, button, space, text } from 'blocks'
import './style.sass'

const b = bem.lock('HomeWhoIsUsing')

const HomeWhoIsUsing = ({ data }) => (
  <div className={wrap()}>
    <div className={space({ both: 4 })}>
      <div className={b()}>
        <div className={space({ bottom: 3 })}>
          <h6 className={b('title')}>
            Who is using DatoCMS
          </h6>
        </div>
        <div className={b('items')}>
          {
            data.map(({ logo }, i) => (
              <Zoom delay={200 * i} key={i}>
                <img src={logo.url} />
              </Zoom>
            ))
          }
        </div>
      </div>
    </div>
  </div>
)

export default HomeWhoIsUsing

