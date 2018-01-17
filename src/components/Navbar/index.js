import React from 'react'
import Link from 'gatsby-link'
import bem from 'utils/bem'

import { Wrap, button, Space, Text } from 'blocks'
import './style.sass'

import logo from 'images/logo.svg'

const b = bem.lock('Navbar')

const Navbar = () => (
  <Space both={3}>
    <Wrap>
      <div className={b()}>
        <Link className={b('logo')} to="/">
          <img src={logo} alt="DatoCMS" />
        </Link>
        <div className={b('nav')}>
          <Link className={b('text-link')} to="/features">
            Features
          </Link>
          <Link className={b('text-link')} to="/use-cases">
            Use cases
          </Link>
          <Link className={b('text-link')} to="/pricing">
            Pricing
          </Link>
          <Link className={b('text-link')} to="/learn">
            Learn
          </Link>
          <Link className={b('text-link')} to="/support">
            Support
          </Link>
        </div>
        <div className={b('actions')}>
          <Link className={b('text-link')} to="/login">
            Login
          </Link>
          <Link className={button({ red: true })} to="/register">
            Try it free
          </Link>
        </div>
      </div>
    </Wrap>
  </Space>
)

export default Navbar

