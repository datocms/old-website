import React from 'react';
import bem from 'utils/bem';
import { Wrap } from 'blocks';
import './style.sass';

const b = bem.lock('Banner');

export default function Banner() {
  return (
    <div className={b()}>
      <Wrap>
        <div className={b('inner')}>
          <p>
            <span role="img" aria-label="Hi!">👋</span>
            Hey! DatoCMS is proudly sponsoring this year's <a href="https://jamstackconf.com/nyc/" target="_blank" rel="noopener noreferrer">JAMstack Conf</a> in New York, April 9th–10th!
            <a
              className={b('button')}
              href="https://calendly.com/datocms/30min"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span role="img" arial-label="Coffee">☕</span>
              Let's take a coffee together!
            </a>
          </p>
        </div>
      </Wrap>
    </div>
  );
};
