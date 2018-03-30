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
                <a className={b('menu-item')} src="http://support.datocms.com/support/tickets/new" rel="nofollow">
                  Open a Ticket
                </a>
                <a className={b('menu-item')} src="http://support.datocms.com/support/tickets" rel="nofollow">
                  My Tickets
                </a>
                <a className={b('menu-item')} src="http://support.datocms.com/support/discussions/forums/35000119870" rel="nofollow">
                  Feature Requests
                </a>
                <a className={b('menu-item')} src="http://slack.datocms.com/">
                  Slack Community
                </a>
              </div>
            </div>
          </div>
          <div className={b('actions')}>
            <a className={b('text-link')} src="https://dashboard.datocms.com/sign_in">
              Login
            </a>
            <a className={button({ red: true })} src="https://dashboard.datocms.com/register">
              Try it free
            </a>
          </div>
        </div>
      </Wrap>
    </Space>
  </div>
)

export default Navbar

