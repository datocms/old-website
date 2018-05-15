import React from 'react'
import Link from 'gatsby-link'
import { Link as ScrollLink, Element } from 'react-scroll'

import './style.sass'
import { Wrap, button, Space, text } from 'blocks'

import Browser from 'components/Browser'
import bem from 'utils/bem'

import screenshot from 'images/screen.png'
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
                  <a href="https://dashboard.datocms.com/signup" className={button({ red: true })}>
                    Try it free
                  </a>
                  <ScrollLink
                    href="#"
                    to="discover"
                    className={b('or-discover')}
                    smooth
                    duration={500}
                    offset={-50}
                  >
                    or discover more <img src={arrowDown} />
                  </ScrollLink>
                </Space>
                <p className={text({ size: 'small' })}>
                  No credit card required, 30 seconds sign-up.
                </p>
              </div>
            </div>
            <div className={b('browser')}>
              <Browser small title="DatoCMS">
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


