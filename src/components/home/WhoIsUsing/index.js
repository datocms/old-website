import React from 'react'
import Link from 'gatsby-link'
import bem from 'utils/bem'

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
            data.home.whosUsingDatocms.map(({ logo }, i) => (
              <img key={i} src={logo.url} />
            ))
          }
        </div>
      </div>
    </div>
  </div>
)

export default HomeWhoIsUsing

