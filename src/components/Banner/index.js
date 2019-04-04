import React from 'react';
import bem from 'utils/bem';
import { Wrap } from 'blocks';
import './style.sass';

const b = bem.lock('Banner');

export default function Banner() {
  return (
    <div className={b()}>
      <div className={b('inner')}>
        <Wrap>
          <p>
            <span role="img" aria-label="Hi!">
              👋
            </span>
            Hey! We're proudly sponsoring this year's{' '}
            <a
              href="https://jamstackconf.com/nyc/"
              target="_blank"
              rel="noopener noreferrer"
            >
              JAMstack Conf
            </a>{' '}
            in New York, April 9th–10th! &nbsp;
            <a
              className={b('button')}
              href="https://calendly.com/datocms/30min"
              target="_blank"
              rel="noopener noreferrer"
            >
              Meet us for a coffee!&nbsp;
              <span role="img" aria-label="Coffee!">
                ☕
              </span>
            </a>
          </p>
        </Wrap>
      </div>
    </div>
  );
}
