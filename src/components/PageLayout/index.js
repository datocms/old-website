import React from 'react';
import bem from 'utils/bem';
import './style.sass';
import { Wrap } from 'blocks';
import CallToAction from 'components/CallToAction';
import Banner from 'components/Banner';

const b = bem.lock('PageLayout');

export default function PageLayout({
  title,
  subtitle,
  bg,
  docsBg,
  headerClass = '',
  noWrap,
  children,
  cta,
}) {
  return (
    <div className={b({ bg, docsBg, cta })}>
      <Banner />
      <div className={b('header') + ' ' + headerClass}>
        <Wrap>
          <div className={b('title')}>{title}</div>
          {subtitle && <div className={b('subtitle')}>{subtitle}</div>}
        </Wrap>
      </div>
      {noWrap ? children : <Wrap>{children}</Wrap>}
      {
        cta &&
          <CallToAction />
      }
    </div>
  );
}
