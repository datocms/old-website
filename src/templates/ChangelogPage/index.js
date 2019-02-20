import React from 'react';
import { graphql } from 'gatsby';
import Link from 'components/Link';
import { HelmetDatoCms } from 'gatsby-source-datocms';

import bem from 'utils/bem';
import './style.sass';
import 'components/DocAside/content.sass';

import Layout from 'components/Layout';
import PageLayout from 'components/PageLayout';
import Entry from 'components/Entry';

const b = bem.lock('ChangelogPage');

export default class ChangelogPage extends React.Component {
  render() {
    const articles = this.props.pageContext.group.map(({ node }) => node);
    const { first, last, index } = this.props.pageContext;

    return (
      <Layout>
        <HelmetDatoCms seo={this.props.data.page.seoMetaTags} />
        <PageLayout
          title="Product Changelog"
          subtitle="DatoCMS new features, improvements and significant news"
        >
          <div className={b()}>
            {articles.map(article => (
              <Entry key={article.slug} article={article} />
            ))}
            <div className={b('pagination')}>
              {!first && (
                <Link
                  to={index === 2 ? '/changelog/' : `/changelog/${index - 1}/`}
                  className={b('previous')}
                >
                  See next announcements &raquo;
                </Link>
              )}
              {!last && (
                <Link to={`/changelog/${index + 1}/`} className={b('previous')}>
                  &laquo; See previous announcements
                </Link>
              )}
            </div>
          </div>
        </PageLayout>
      </Layout>
    );
  }
}

export const query = graphql`
  query ChangelogPageQuery {
    page: datoCmsChangelog {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
  }
`;
