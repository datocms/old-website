import React from 'react';

import './style.sass';
import { Wrap, button, Space } from 'blocks';

import bem from 'utils/bem';

const b = bem.lock('CallToAction');

const CallToAction = ({ data }) => (
  <Space both="10">
    <Wrap>
      <div className={b()}>
        <div className={b('title')}>Get started with DatoCMS now</div>
        <div className={b('no-card')}>
          No&nbsp;credit&nbsp;card&nbsp;required, 30&nbsp;seconds&nbsp;sign-up
        </div>
        <a
          className={button({ red: true, big: true })}
          href="https://dashboard.datocms.com/signup"
        >
          Try for free!
        </a>
      </div>
    </Wrap>
  </Space>
);

export default CallToAction;
