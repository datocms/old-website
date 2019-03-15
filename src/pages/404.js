import React from 'react';
import Layout from 'components/Layout';
import { Wrap, Space } from 'blocks';

import PageLayout from 'components/PageLayout';
import Search from 'components/Search';

const NotFoundPage = () => (
  <Layout>
    <Space both="10">
      <Wrap>
        <PageLayout
          noWrap
          title="404 - Not found"
          subtitle="Sorry! Maybe you can search something else:"
          headerClass="Docs__header"
        >
          <Search big />
        </PageLayout>
      </Wrap>
    </Space>
  </Layout>
);

export default NotFoundPage;
