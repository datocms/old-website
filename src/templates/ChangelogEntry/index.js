import React from 'react';
import { graphql } from 'gatsby';
import Link from 'components/Link';
import { HelmetDatoCms } from 'gatsby-source-datocms';

import bem from 'utils/bem';
import '../ChangelogPage/style.sass';
import 'components/DocAside/content.sass';

import Entry from 'components/Entry';
import PageLayout from 'components/PageLayout';

import Layout from 'components/Layout';

const b = bem.lock('ChangelogPage');

export default class ChangelogEntry extends React.Component {
  render() {
    const article = this.props.data.article;

    return (
      <Layout>
        <HelmetDatoCms seo={article.seoMetaTags} />
        <PageLayout
          title="Product Changelog"
          subtitle="DatoCMS new features, improvements and significant news"
        >
          <div className={b()}>
            <Entry article={article} />
            <div className={b('pagination')}>
              <Link to="/changelog/" className={b('previous')}>
                See all the announcements
              </Link>
            </div>
          </div>
        </PageLayout>
      </Layout>
    );
  }
}

export const query = graphql`
  query ArticleEntryQuery($slug: String!) {
    article: datoCmsChangelogEntry(slug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      id
      title
      slug
      content: contentNode {
        markdown: childMarkdownRemark {
          html
        }
      }
      publicationDate(formatString: "MMM D, YYYY")
      categories {
        name
        color {
          hex
        }
      }
    }
  }
`;
