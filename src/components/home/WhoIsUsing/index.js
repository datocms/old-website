import React from 'react'
import Link from 'gatsby-link'
import bem from 'utils/bem'

import { wrap, button, space, text } from 'blocks'
import './style.sass'

import sidney from 'images/client-cityofsidney.png'
import flywire from 'images/client-flywire.png'
import hashicorp from 'images/client-hashicorp.png'
import policyGenius from 'images/client-policygenius.png'
import vice from 'images/client-vice.png'

const b = bem.lock('HomeWhoIsUsing')

const HomeWhoIsUsing = () => (
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
            [hashicorp, sidney, policyGenius, vice, flywire].map((img, i) => (
              <img key={i} src={img} />
            ))
          }
        </div>
      </div>
    </div>
  </div>
)

export default HomeWhoIsUsing

