import React from 'react'
import './style.sass'
import { button, Space } from 'blocks'

import Browser from 'components/Browser'
import bem from 'utils/bem'

const b = bem.lock('HomeHero')

class HomeHero extends React.Component {
  componentDidMount() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.video.controls = true;
    }
    this.video.addEventListener('loadedmetadata', function() {
      this.currentTime = 105;
    }, false);
  }

  render() {
    const { title, description } = this.props;

    return (
      <div>
        <div className={b()}>
          <div className={b('inner')}>
            <div className={b('text-container')}>
              <div>
                <h1 className={b('title')}>
                  {title}
                </h1>
                <div className={b('description')}>
                  {description}
                </div>
                <Space bottom="2">
                  <div className={b('subscribe')}>
                    <input className={b('email')} type="email" placeholder="Your email here..." />
                    <a href="https://dashboard.datocms.com/signup" className={button({ red: true })}>
                      Try for free
                    </a>
                  </div>
                </Space>
              </div>
            </div>
            <div className={b('browser')}>
              <Browser small title="DatoCMS Editor Interface" address="https://myproject.admin.datocms.com/">
                <video autoPlay loop muted playsInline ref={(el) => this.video = el}>
                  <source src="/videos/hero.mp4" type="video/mp4" />
                </video>
              </Browser>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeHero


