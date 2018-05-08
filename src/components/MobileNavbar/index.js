import React from 'react'
import bem from 'utils/bem'

import { Wrap, button, Space, Text } from 'blocks'
import './style.sass'

import logo from 'images/dato_logo_full.svg'
import hamburger from 'images/hamburger.svg'

const b = bem.lock('MobileNavbar')

class Group extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
  }

  handleToggle() {
    this.setState({ active: !this.state.active });
  }

  render() {
    const { children, name } = this.props;

    return (
      <div className={b('group', { active: this.state.active })}>
        <button className={b('group-handle')} onClick={this.handleToggle.bind(this)}>
          {name}
        </button>
        {
          this.state.active &&
            <div className={b('group-content')}>
              {children}
            </div>
        }
      </div>
    );
  }
}

class MobileNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
  }

  handleToggle(e) {
    e.preventDefault()

    document.body.classList.toggle('no-scroll', !this.state.active)

    this.setState({
      active: !this.state.active
    });
  }

  componentDidMount() {
    if (this.props.history) {
      this.unlisten = this.props.history.listen((location, action) => {
        document.body.classList.toggle('no-scroll', false)
        this.setState({ active: false });
      });
    }
  }

  componentWillUnmount() {
    this.unlisten && this.unlisten();
  }

  render() {
    const { linkComponent: Link } = this.props;

    return (
      <div className={b()}>
        <div className={b('bar')}>
          <div className={b('logo-container')}>
            <Link className={b('logo')} to="/">
              <img src={logo} alt="DatoCMS" />
            </Link>
          </div>
          <div className={b('hamburger-container')}>
            <a href="#" onClick={this.handleToggle.bind(this)}>
              <img src={hamburger} alt="Menu" />
            </a>
          </div>
        </div>
        <div className={b('menu', { active: this.state.active })}>
          <Link className={b('menu-item')} to="/features/">
            Features
          </Link>
          <Link className={b('menu-item')} to="/use-cases/">
            Use cases
          </Link>
          <Link className={b('menu-item')} to="/pricing/">
            Pricing
          </Link>
          <Link className={b('menu-item')} to="/docs/">
            Learn
          </Link>
          <Link className={b('menu-item')} to="/blog/">
            Blog
          </Link>
          <Group name="Support">
            <a className={b('group-item')} href="http://support.datocms.com/support/tickets/new" rel="nofollow">
              Open a Ticket
            </a>
            <a className={b('group-item')} href="http://support.datocms.com/support/tickets" rel="nofollow">
              My Tickets
            </a>
            <a className={b('group-item')} href="http://support.datocms.com/support/discussions/forums/35000119870" rel="nofollow">
              Feature Requests
            </a>
            <a className={b('group-item')} href="/slack/">
              Slack Community
            </a>
          </Group>
          <div className={b('actions')}>
            <a className={button({ border: true })} href="https://dashboard.datocms.com/sign_in">
              Login
            </a>
            <a className={button({ red: true })} href="https://dashboard.datocms.com/register">
              Try it for free
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default MobileNavbar;

