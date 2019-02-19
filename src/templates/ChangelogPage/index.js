import React from 'react';
import { graphql } from 'gatsby';
import Link from 'components/Link';
import { HelmetDatoCms } from 'gatsby-source-datocms';

import bem from 'utils/bem';
import './style.sass';

import Layout from 'components/Layout';
import PageLayout from 'components/PageLayout';

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
        >
          <div className={b()}>
            {articles.map(article => (
              <div key={article.slug} className={b('article')}>
                <div className={b('article-meta')}>
                  {article.publicationDate}
                </div>
                <div className={b('article-body')}>
                  <Link
                    to={`/changelog/${article.slug}/`}
                    className={b('article-title')}
                  >
                    {article.title}
                  </Link>
                  <div className={b('article-categories')}>
                    {article.categories.map(cat => (
                      <div
                        key={cat.name}
                        className={b('article-category')}
                        style={{ backgroundColor: cat.color.hex }}
                      >
                        {cat.name}
                      </div>
                    ))}
                  </div>
                  <div
                    className={b('article-content')}
                    dangerouslySetInnerHTML={{
                      __html: article.content.markdown.html,
                    }}
                  />
                </div>
              </div>
            ))}
            <div className={b('pagination')}>
              {!first && (
                <Link
                  to={
                    index === 2 ? '/changelog/' : `/changelog/${index - 1}/`
                  }
                  className={b('previous')}
                >
                  See next announcements &raquo;
                </Link>
              )}
              {!last && (
                <Link
                  to={`/changelog/${index + 1}/`}
                  className={b('previous')}
                >
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
