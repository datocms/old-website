import React from 'react';
import bem from 'utils/bem';
import Fade from 'react-reveal/Fade';

import { wrap, space } from 'blocks';
import './style.sass';

const b = bem.lock('HomeWhoIsUsing');

const HomeWhoIsUsing = ({ data }) => (
  <div className={b()}>
    <div className={wrap()}>
      <div className={space({ bottom: 4 })}>
        <h6 className={b('title')}>Who is using DatoCMS</h6>
      </div>
      <div className={b('items')}>
        {data.map(({ logo }, i) => (
          <Fade bottom duration={500} delay={100 * i} key={i}>
            <img alt="Client" src={logo.url} />
          </Fade>
        ))}
      </div>
    </div>
  </div>
);

export default HomeWhoIsUsing;
