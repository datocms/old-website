import React from 'react';
import Layout from 'components/Layout';
import { Wrap, Space } from 'blocks';

import bem from 'utils/bem';

import './404.sass';

import PageLayout from 'components/PageLayout';
import Search from 'components/Search';

const b = bem.lock('Page404');

const NotFoundPage = () => (
  <Layout>
    <Space both="10">
      <Wrap>
        <PageLayout
          noWrap
          title="404 - This is not the page you are looking for."
          subtitle="What you’re looking for seems to be missing. We’re definitely not using our Jedi mind trick to hide it. Yep."
          headerClass="Docs__header"
        >
          <div className={b()}>
            <Space bottom={1}>
              <div className={b('search-title')}>
                Maybe you can search for something else:
              </div>
            </Space>
            <Search big />
          </div>
        </PageLayout>
      </Wrap>
    </Space>
  </Layout>
);

export default NotFoundPage;
