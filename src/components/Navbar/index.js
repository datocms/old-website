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

const ActiveMenuLink = (props) => (
  <a
    className={b('menu-item')}
    href={props.to}
    children={props.children}
  />
)

const Navbar = () => (
  <Space both={3}>
    <Wrap>
      <div className={b()}>
        <div>
          <Link className={b('logo')} to="/">
            <img src={logo} alt="DatoCMS" />
          </Link>
        </div>
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
          <ActiveLink to="/docs">
            Learn
          </ActiveLink>
          <div className={b('text-link', { handle: true })}>
            <span>Support</span>
            <div className={b('menu')}>
              <ActiveMenuLink to="http://support.datocms.com/support/tickets/new">
                Ticket Center
              </ActiveMenuLink>
              <ActiveMenuLink to="http://support.datocms.com/support/discussions/forums/35000119870">
                Feature Requests
              </ActiveMenuLink>
              <ActiveMenuLink to="http://slack.datocms.com/">
                Slack Community
              </ActiveMenuLink>
            </div>
          </div>
        </div>
        <div className={b('actions')}>
          <a className={b('text-link')} href="https://dashboard.datocms.com/sign_in">
            Login
          </a>
          <a className={button({ red: true })} href="https://dashboard.datocms.com/register">
            Try it free
          </a>
        </div>
      </div>
    </Wrap>
  </Space>
)

export default Navbar

