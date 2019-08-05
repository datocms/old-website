import React from 'react';
import { graphql } from 'gatsby';
import { HelmetDatoCms } from 'gatsby-source-datocms';

import bem from 'utils/bem';

import PageLayout from 'components/PageLayout';
import Layout from 'components/Layout';
import FeaturesGroup from 'components/features/FeaturesGroup';

import './features.sass';

const b = bem.lock('FeaturesPage');

class FeaturesPage extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <Layout>
        <HelmetDatoCms seo={data.page.seoMetaTags} />
        <PageLayout
          title="Features"
          subtitle="Build projects faster with the most flexible headless CMS out there"
          cta
        >
          <div className={b()}>
            <div className={b('cols')}>
              <div className={b('cols-content')}>
                <div className={b('content')}>
                  { data.featureGroups.nodes.map((group, i) => {
                    const evenOdd = i % 2 === 0 ? "even" : "odd";
                    return (
                      <FeaturesGroup featuresGroup={group} evenOdd={evenOdd} key={i} />
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </PageLayout>
      </Layout>
    );
  }
}

export default FeaturesPage;

export const query = graphql`
  query FeaturesPageQuery {
    page: datoCmsFeaturesPage {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }

    featureGroups: allDatoCmsGroupFeature(sort: { fields: position, order: ASC }) {
      nodes {
        id
        pageTitle
        pageSubtitle
        infoBlockTitle
        infoBlockDescription
        features {
          id
          title
          slug
          description: descriptionNode {
            markdown: childMarkdownRemark {
              html
            }
          }
          image {
            url
            format
          }
        }
      }
    }
  }
`;
