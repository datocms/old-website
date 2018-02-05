import React from 'react'
import Link from 'gatsby-link'

import './style.sass'
import { Wrap, button, Space, text } from 'blocks'

import bem from 'utils/bem'

import logo from 'images/logo.svg'

const b = bem.lock('Footer')

class Group extends React.Component {
  constructor(props) {
    super(props)
    this.state = { open: false }
  }

  handleToggle() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { title, children } = this.props;

    return (
      <div 
        className={b('group', { open: this.state.open })} 
        onClick={this.handleToggle.bind(this)}
      >
        <div className={b('group-title')}>
          {title}
        </div>
        <div className={b('group-content')}>
          {children}
        </div>
      </div>
    )
  }
}

const GroupLink = ({ to, label }) => (
  to.includes('http') ?
    <a href={to} target="_blank" className={b('group-link')}>
      {label}
    </a>
    :
    <Link to={to} className={b('group-link')}>
      {label}
    </Link>
)

const Footer = ({ data }) => (
  <div className={b()} data-datocms-noindex>
    <div className={b('body')}>
      <Link className={b('logo')} to="/">
        <img src={logo} alt="DatoCMS" />
      </Link>
      <Group title="DatoCMS">
        <GroupLink to="/features/" label="Features" />
        <GroupLink to="/use-cases/" label="Use Cases" />
        <GroupLink to="/pricing/" label="Pricing" />
      </Group>
      <Group title="Learn">
        <GroupLink to="/docs/" label="Documentation" />
        <GroupLink to="/api/" label="API Reference" />
      </Group>
      <Group title="Support">
        <GroupLink to="http://support.datocms.com/support/tickets/new" label="Ticket Center" />
        <GroupLink to="http://support.datocms.com/support/discussions/forums/35000119870" label="Feature Requests" />
        <GroupLink to="http://slack.datocms.com/" label="Slack Community" />
      </Group>
      <Group title="About">
        <GroupLink to="/" label="Team" />
        <GroupLink to="/integrations/" label="Integrations" />
        <GroupLink to="/blog/" label="Blog" />
      </Group>
      <Group title="Legal">
        <GroupLink to="/legal/terms/" label="Terms & Conditions" />
        <GroupLink to="/legal/privacy-policy/" label="Privacy Policy" />
      </Group>
    </div>
    <div className={b('us')}>
      Copyright ©2018 — DatoCMS is a <a href="https://www.leanpanda.com/">LeanPanda</a> product
    </div>
  </div>
)

export default Footer

