import React from 'react'
import bem from 'utils/bem'
import './style.sass'

const b = bem.lock('Browser')

export default ({ children, padded, inverse, ...props }) => (
  <div className={b({ padded, inverse })}>
    <div className={b('title-bar')}>
      <div className={b('button')} />
      <div className={b('button')} />
      <div className={b('button')} />
    </div>
    <div className={b('content')}>
      { children }
    </div>
  </div>
)

