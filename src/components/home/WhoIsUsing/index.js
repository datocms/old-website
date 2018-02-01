import React from 'react'
import Link from 'gatsby-link'
import bem from 'utils/bem'
import Fade from 'react-reveal/Fade'

import { wrap, button, space, text } from 'blocks'
import './style.sass'

const b = bem.lock('HomeWhoIsUsing')

const HomeWhoIsUsing = ({ data }) => (
  <div className={wrap()}>
    <div className={space({ both: 5 })}>
      <div className={b()}>
        <div className={space({ bottom: 4 })}>
          <h6 className={b('title')}>
            Who is using DatoCMS
          </h6>
        </div>
        <div className={b('items')}>
          {
            data.map(({ logo }, i) => (
              <Fade bottom duration={500} delay={100 * i} key={i}>
                <img src={logo.url} />
              </Fade>
            ))
          }
        </div>
      </div>
    </div>
  </div>
)

export default HomeWhoIsUsing

