import React from 'react'
import Link from 'gatsby-link'
import bem from 'utils/bem'

import { Wrap, button, Space, Text } from 'blocks'
import './style.sass'

import logo from 'images/logo.svg'

const b = bem.lock('Navbar')

const ActiveLink = (props) => (
  <Link
    className={b('text-link')}
    {...({ ...props, activeClassName: b('text-link', { active: true }) })}
  />
)

const Navbar = () => (
  <Space both={3}>
    <Wrap>
      <div className={b()}>
        <Link className={b('logo')} to="/">
          <img src={logo} alt="DatoCMS" />
        </Link>
        <div className={b('nav')}>
          <ActiveLink to="/features">
            Features
          </ActiveLink>
          <ActiveLink to="/use-cases">
            Use cases
          </ActiveLink>
          <ActiveLink to="/pricing">
            Pricing
          </ActiveLink>
          <ActiveLink to="/learn">
            Learn
          </ActiveLink>
          <ActiveLink to="/support">
            Support
          </ActiveLink>
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

