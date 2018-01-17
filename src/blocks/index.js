import React from 'react'
import bem from 'utils/bem'

export const space = bem.lock('space')
export const text = bem.lock('text')
export const wrap = bem.lock('wrap')
export const button = bem.lock('button')

export const Space = ({ children, ...props }) => <div className={space(props)}>{children}</div>
export const Wrap = ({ children, ...props }) => <div className={wrap(props)}>{children}</div>
