import React from 'react';
import Link from 'components/Link';
import bem from 'utils/bem';
import Helmet from 'react-helmet';
import logo from 'images/dato_logo_full.svg';
import { parse } from 'flatted/cjs';

import './style.sass';

const b = bem.lock('CmaPage');

export default class CmaPage extends React.Component {
  renderMenu() {
    const { pageContext } = this.props;

    return (
      <div>
        <ul>
          {pageContext.menuItems.map(item => (
            <li key={item.path} className={b('menu__item')}>
              <Link to={item.path}>{item.title}</Link>
            </li>
          ))}
        </ul>
        <div className={b('menu__back')}>
          <Link to="/docs">‹ Go back to docs</Link>
        </div>
      </div>
    );
  }

  render() {
    const {
      pageContext: { title, html, rawResource },
    } = this.props;

    const resource = rawResource && parse(rawResource);

    return (
      <div className={b()}>
        <Helmet title="DatoCMS">
          <title>{title} - Content Management API Reference - DatoCMS</title>
        </Helmet>
        <div className={b('menu')}>
          <Link className={b('logo')} to="/">
            <img alt="DatoCMS" src={logo} />
          </Link>
          {this.renderMenu()}
        </div>
        <div className={b('content')}>
          {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
          {resource && resource.title}
        </div>
      </div>
    );
  }
}
