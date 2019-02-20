import React from 'react';
import bem from 'utils/bem';
import './style.sass';

const b = bem.lock('PageLayout');

export default function PageLayout({ title, subtitle, children }) {
  return (
    <div className={b()}>
      <div className={b('title')}>{title}</div>
      {subtitle && <div className={b('subtitle')}>{subtitle}</div>}
      {children}
    </div>
  );
}
