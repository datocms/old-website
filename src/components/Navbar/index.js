import React from 'react';
import bem from 'utils/bem';
import getCookie from 'utils/getCookie';
import Link from 'components/Link';

import { Wrap, button } from 'blocks';
import './style.sass';

import logo from 'images/dato_logo_full.svg';

const b = bem.lock('Navbar');

const Navbar = ({ transparent }) => {
  const loggedInEmail = getCookie('datoAccountEmail');

  return (
    <div className={b({ transparent })}>
      <div className={b('shadow')} />
      <div className={b('bar')} data-datocms-noindex>
        <Wrap>
          <div className={b('inner')}>
            <div className={b('logo-container')}>
              <Link className={b('logo')} to="/">
                <img src={logo} alt="DatoCMS" />
              </Link>
            </div>
            <div className={b('nav')}>
              <Link
                className={b('text-link')}
                activeClassName={b('text-link', { active: true })}
                to="/features/"
              >
                Features
              </Link>
              <Link
                className={b('text-link')}
                activeClassName={b('text-link', { active: true })}
                to="/use-cases/"
              >
                Use cases
              </Link>
              <Link
                className={b('text-link')}
                activeClassName={b('text-link', { active: true })}
                to="/pricing/"
              >
                Pricing
              </Link>
              <div className={b('text-link', { handle: true })}>
                <Link to="/docs" activeClassName="is-active">
                  Learn
                </Link>
                <div className={b('menu')}>
                  <Link className={b('menu-item')} to="/docs">
                    Documentation
                  </Link>
                  <Link className={b('menu-item')} to="/docs/guides">
                    Guides & Tutorials
                  </Link>
                </div>
              </div>
              <Link
                className={b('text-link')}
                activeClassName={b('text-link', { active: true })}
                to="/plugins/"
              >
                Plugins
              </Link>
              <div className={b('text-link', { handle: true })}>
                <Link to="/blog" activeClassName="is-active">
                  News
                </Link>
                <div className={b('menu')}>
                  <Link className={b('menu-item')} to="/blog/">
                    Blog
                  </Link>
                  <Link className={b('menu-item')} to="/changelog/">
                    Product Changelog
                  </Link>
                </div>
              </div>
              <div className={b('text-link', { handle: true })}>
                <Link to="/support/" activeClassName="is-active">
                  Support
                </Link>
                <div className={b('menu')}>
                  <Link className={b('menu-item')} to="/support/">
                    Open a ticket
                  </Link>
                  <Link
                    className={b('menu-item')}
                    to="https://community.datocms.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Community forum
                  </Link>
                  <a
                    className={b('menu-item')}
                    href="https://github.com/datocms/product-roadmap"
                    rel="nofollow"
                  >
                    Feature requests
                  </a>
                  <a className={b('menu-item')} href="/slack/">
                    Slack community
                  </a>
                  <Link
                    className={b('menu-item')}
                    to="https://status.datocms.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    System status
                  </Link>
                </div>
              </div>
            </div>
            {loggedInEmail ? (
              <div className={b('actions')}>
                <a
                  className={button({ red: true })}
                  href="https://dashboard.datocms.com/"
                >
                  Enter the dashboard
                </a>
              </div>
            ) : (
              <div className={b('actions')}>
                <a
                  className={b('text-link')}
                  href="https://dashboard.datocms.com/sign_in"
                >
                  Login
                </a>
                <a
                  className={button({ red: true, small: true })}
                  href="https://dashboard.datocms.com/signup"
                >
                  Try for free
                </a>
              </div>
            )}
          </div>
        </Wrap>
      </div>
    </div>
  );
};

export default Navbar;
