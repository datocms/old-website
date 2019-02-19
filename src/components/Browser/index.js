import React from 'react';
import bem from 'utils/bem';
import './style.sass';

const b = bem.lock('Browser');

export default ({
  children,
  shadow,
  small,
  padded,
  title,
  address,
  noOverflow,
  inverse,
  ...props
}) => (
  <div className={b({ padded, shadow, inverse, small, noOverflow })}>
    <div className={b('title-bar')}>
      <div className={b('button')} />
      <div className={b('button')} />
      <div className={b('button')} />
      {title && <div className={b('title')}>{title}</div>}
    </div>
    {address && <div className={b('address')}>{address}</div>}
    <div className={b('content')}>{children}</div>
  </div>
);
