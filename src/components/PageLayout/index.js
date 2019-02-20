import React from 'react';
import bem from 'utils/bem';
import './style.sass';
import { Wrap } from 'blocks';

const b = bem.lock('PageLayout');

export default function PageLayout({
  title,
  subtitle,
  bg,
  bg2,
  headerClass = '',
  noWrap,
  children,
}) {
  return (
    <div className={b({ bg, bg2 })}>
      <div className={b('header') + ' ' + headerClass}>
        <Wrap>
          <div className={b('title')}>{title}</div>
          {subtitle && <div className={b('subtitle')}>{subtitle}</div>}
        </Wrap>
      </div>
      {noWrap ? children : <Wrap>{children}</Wrap>}
    </div>
  );
}
