import React from 'react'
import Link from 'components/Link'

import './style.sass'

import bem from 'utils/bem'

import logo from 'images/d_logo.svg'

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

const Footer = ({ data }) => (
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
      <Group title="News">
        <Link className={b('group-link')} to="/blog/">
          Blog
        </Link>
        <Link className={b('group-link')} to="/changelog/">
          Product changelog
        </Link>
        <Link className={b('group-link')} to="https://status.datocms.com/">
          System status
        </Link>
      </Group>
      <Group title="Support">
        <Link className={b('group-link')} to="/docs/">
          Documentation
        </Link>
        <Link className={b('group-link')} to="/support/">
          Open a ticket
        </Link>
        <Link className={b('group-link')} to="https://github.com/datocms/feature-requests/issues">
          Feature requests
        </Link>
        <Link className={b('group-link')} to="/slack/">
          Slack community
        </Link>
      </Group>
      <Group title="About">
        <Link className={b('group-link')} to="/integrations/">
          Integrations
        </Link>
      </Group>
      <Group title="Legal">
        <Link className={b('group-link')} to="/legal/terms/">
          Terms &amp; Conditions
        </Link>
        <a rel="noopener noreferrer" href="https://www.iubenda.com/privacy-policy/64648824/full-legal" className={b('group-link')} target="_blank" title="Privacy Policy">Privacy Policy</a>
        <a rel="noopener noreferrer" href="https://www.iubenda.com/privacy-policy/64648824/cookie-policy" className={b('group-link')} target="_blank" title="Cookie Policy">Cookie Policy</a>
      </Group>
    </div>
    <div className={b('us')}>
      Copyright ©2018 — DatoCMS is a <a href="https://www.leanpanda.com/">LeanPanda</a> product
    </div>
  </div>
)

export default Footer

