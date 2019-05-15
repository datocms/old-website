import React from 'react';
import './style.sass';
import { button } from 'blocks';

import Browser from 'components/Browser';
import bem from 'utils/bem';

const b = bem.lock('HomeHero');

class HomeHero extends React.Component {
  componentDidMount() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      )
    ) {
      this.video.controls = true;
    }
    this.video.addEventListener(
      'loadedmetadata',
      function() {
        this.currentTime = 105;
      },
      false,
    );
  }

  render() {
    const { title, description, smallTitle } = this.props;

    return (
      <div>
        <div className={b({ smallTitle })}>
          <div className={b('inner')}>
            <div className={b('text-container')}>
              <div>
                <h1
                  className={b('title')}
                  dangerouslySetInnerHTML={{ __html: title }}
                />
                <div className={b('description')}>{description}</div>
                <form
                  method="GET"
                  action="https://dashboard.datocms.com/signup"
                  className={b('subscribe')}
                >
                  <input
                    className={b('email')}
                    type="email"
                    name="email"
                    placeholder="Your email here..."
                  />
                  <button
                    type="submit"
                    className={button({ red: true, shadow: true })}
                  >
                    Try for free
                  </button>
                </form>
              </div>
            </div>
            <div className={b('browser')}>
              <Browser
                small
                title="DatoCMS Editor Interface"
                address="https://myproject.admin.datocms.com/"
              >
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  ref={el => (this.video = el)}
                >
                  <source src="http://www.datocms-assets.com/website/hero.mp4" type="video/mp4" />
                </video>
              </Browser>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeHero;
