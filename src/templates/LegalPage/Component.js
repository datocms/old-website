import React from 'react';
import Link from 'components/Link';
import { Wrap, Space } from 'blocks';

import bem from 'utils/bem';
import Layout from 'components/Layout';

import './style.sass';
import 'components/DocAside/content.sass';

const b = bem.lock('LegalPage');

const PageLink = ({ to, children }) => (
  <Link exact to={to} activeClassName="is-active">
    {children}
  </Link>
);

export default class LegalPage extends React.Component {
  render() {
    const { data } = this.props;
    const page = data.page;

    return (
      <Layout>
        <Wrap>
          <div className={b()}>
            <div className={b('menu')}>
              <ul className={b('menu-pages')}>
                <li className={b('menu-page')}>
                  <PageLink to="/legal/terms/">Terms & Conditions</PageLink>
                </li>
                <li className={b('menu-page')}>
                  <PageLink to="/legal/privacy-policy/">Privacy policy</PageLink>
                </li>
                <li className={b('menu-page')}>
                  <PageLink to="/legal/cookie-policy/">Cookie policy</PageLink>
                </li>
                <li className={b('menu-page')}>
                  <PageLink to="/legal/gdpr/">GDPR Compliance</PageLink>
                </li>
              </ul>
            </div>

            <div className={b('content')}>
              <Space bottom={5}>
                <h6 className={b('content-category')}>Legal</h6>
                <h1 className={b('content-title')}>{page.frontmatter.title}</h1>
              </Space>
              <div
                className={b('content-body')}
                dangerouslySetInnerHTML={{ __html: page.html }}
              />
            </div>
          </div>
        </Wrap>
      </Layout>
    );
  }
}
