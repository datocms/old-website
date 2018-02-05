import React from 'react'
import bem from 'utils/bem'

import { Wrap, button, Space, Text } from 'blocks'
import './style.sass'

import logo from 'images/logo.svg'

const b = bem.lock('Navbar')

const Navbar = ({ linkComponent: Link }) => (
  <div className={b()} data-datocms-noindex>
    <Space both={3}>
      <Wrap>
        <div className={b('inner')}>
          <div className={b('logo-container')}>
            <Link className={b('logo')} to="/">
              <img src={logo} alt="DatoCMS" />
            </Link>
          </div>
          <div className={b('nav')}>
            <Link className={b('text-link')} activeClassName={b('text-link', { active: true })} to="/features/">
              Features
            </Link>
            <Link className={b('text-link')} activeClassName={b('text-link', { active: true })} to="/use-cases/">
              Use cases
            </Link>
            <Link className={b('text-link')} activeClassName={b('text-link', { active: true })} to="/pricing/">
              Pricing
            </Link>
            <Link className={b('text-link')} activeClassName={b('text-link', { active: true })} to="/docs/">
              Learn
            </Link>
            <Link className={b('text-link')} activeClassName={b('text-link', { active: true })} to="/blog/">
              Blog
            </Link>
            <div className={b('text-link', { handle: true })}>
              <span>Support</span>
              <div className={b('menu')}>
                <Link className={b('menu-item')} to="http://support.datocms.com/support/tickets/new">
                  Ticket Center
                </Link>
                <Link className={b('menu-item')} to="http://support.datocms.com/support/discussions/forums/35000119870">
                  Feature Requests
                </Link>
                <Link className={b('menu-item')} to="http://slack.datocms.com/">
                  Slack Community
                </Link>
              </div>
            </div>
          </div>
          <div className={b('actions')}>
            <Link className={b('text-link')} to="https://dashboard.datocms.com/sign_in">
              Login
            </Link>
            <Link className={button({ red: true })} to="https://dashboard.datocms.com/register">
              Try it free
            </Link>
          </div>
        </div>
      </Wrap>
    </Space>
  </div>
)

export default Navbar

