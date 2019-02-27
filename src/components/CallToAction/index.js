import React from 'react';

import './style.sass';
import { Wrap, button } from 'blocks';

import bem from 'utils/bem';

const b = bem.lock('CallToAction');

const CallToAction = ({ data, transparent }) => (
  <div className={b({ transparent })}>
    <Wrap>
      <div className={b('title')}>Get started with DatoCMS now</div>
      <div className={b('no-card')}>
        No&nbsp;credit&nbsp;card&nbsp;required, 30&nbsp;seconds&nbsp;sign-up
      </div>
      <a
        className={button({ red: true, big: true, shadow: true })}
        href="https://dashboard.datocms.com/signup"
      >
        Try for free!
      </a>
    </Wrap>
  </div>
);

export default CallToAction;
