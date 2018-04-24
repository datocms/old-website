import React from 'react'

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

const Footer = ({ data, linkComponent: Link }) => (
  <div className={b()} data-datocms-noindex>
    <div className={b('body')}>
      <Link className={b('logo')} to="/">
        <img src={logo} alt="DatoCMS" />
      </Link>
      <Group title="DatoCMS">
        <Link className={b('group-link')} to="/features/">
          Features
        </Link>
        <Link className={b('group-link')} to="/use-cases/">
          Use Cases
        </Link>
        <Link className={b('group-link')} to="/pricing/">
          Pricing
        </Link>
      </Group>
      <Group title="Learn">
        <Link className={b('group-link')} to="/docs/">
          Documentation
        </Link>
        <Link className={b('group-link')} to="/api/">
          API Reference
        </Link>
      </Group>
      <Group title="Support">
        <Link className={b('group-link')} to="http://support.datocms.com/support/tickets/new">
          Ticket Center
        </Link>
        <Link className={b('group-link')} to="http://support.datocms.com/support/discussions/forums/35000119870">
          Feature Requests
        </Link>
        <Link className={b('group-link')} to="/slack/">
          Slack Community
        </Link>
      </Group>
      <Group title="About">
        <Link className={b('group-link')} to="/integrations/">
          Integrations
        </Link>
        <Link className={b('group-link')} to="/blog/">
          Blog
        </Link>
      </Group>
      <Group title="Legal">
        <Link className={b('group-link')} to="/legal/terms/">
          Terms &amp; Conditions
        </Link>
        <Link className={b('group-link')} to="/legal/privacy-policy/">
          Privacy Policy
        </Link>
      </Group>
    </div>
    <div className={b('us')}>
      Copyright ©2018 — DatoCMS is a <a href="https://www.leanpanda.com/">LeanPanda</a> product
    </div>
  </div>
)

export default Footer

