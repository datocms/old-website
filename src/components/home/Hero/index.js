import React from 'react'
import { Link } from 'gatsby'
import { Link as ScrollLink, Element } from 'react-scroll'

import './style.sass'
import { Wrap, button, Space, text } from 'blocks'

import Browser from 'components/Browser'
import bem from 'utils/bem'

import arrowDown from 'images/arrow-down-dropdown.svg'

const b = bem.lock('HomeHero')

class HomeHero extends React.Component {
  componentDidMount() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.video.controls = true;
    }
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
                    <input className={b('email')} type="email" placeholder="name@company.com" />
                    <a href="https://dashboard.datocms.com/signup" className={button({ red: true })}>
                      Try for free
                    </a>
                  </div>
                </Space>
              </div>
            </div>
            <div className={b('browser')}>
              <Browser small>
                <video autoPlay loop muted playsInline ref={(el) => this.video = el}>
                  <source src="/videos/hero.webm" type="video/webm" />
                  <source src="/videos/hero.mp4" type="video/mp4" />
                </video>
              </Browser>
            </div>
          </div>
        </div>
        <Element name="discover" />
      </div>
    );
  }
}

export default HomeHero


