import React from 'react';
import bem from 'utils/bem';
import './style.sass';
import { Wrap } from 'blocks';

const b = bem.lock('PageLayout');

export default function PageLayout({ title, subtitle, noWrap, children }) {
  return (
    <div className={b()}>
      <Wrap>
        <div className={b('header')}>
          <div className={b('title')}>
            {title}
          </div>
          {
            subtitle &&
              <div className={b('subtitle')}>
                {subtitle}
              </div>
          }
        </div>
      </Wrap>
      {
        noWrap ?
          children :
          <Wrap>{children}</Wrap>
      }
    </div>
  )
}
