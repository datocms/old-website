import React from 'react';
import { graphql } from 'gatsby';
import { HelmetDatoCms } from 'gatsby-source-datocms';

import bem from 'utils/bem';
import { Space, Wrap } from 'blocks';

import PageLayout from 'components/PageLayout';
import Layout from 'components/Layout';

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
          noWrap
        >
          <div className={b()}>
            <div className={b('cols')}>
              <div className={b('cols-content')}>
                <div className={b('content')}>
                  {data.featureGroups.nodes.map((featureGroup, i) => {
                    return (
                      <div className={b('feature', { odd: i % 2 === 1 })}>
                        <Wrap>
                          <div className={b('feature-inner')}>
                            <div className={b('feature-content')}>
                              <h5 className={b('feature-title')}>
                                {featureGroup.pageTitle}
                              </h5>
                              <div
                                className={b('feature-description')}
                                dangerouslySetInnerHTML={{
                                  __html: featureGroup.infoBlockDescription.markdown.html,
                                }}
                              />
                              <Space top="2">
                                <a
                                  className={"button button--red button--shadow"}
                                  href={"/features/" + featureGroup.slug}>
                                    Learn more
                                </a>
                              </Space>
                            </div>
                            <div className={b('feature-image')}>
                              <div>
                              </div>
                            </div>
                          </div>
                        </Wrap>
                      </div>
                    );
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

    featureGroups: allDatoCmsGroupFeature (limit: 4, sort: { fields: [position], order: ASC }) {
      nodes {
        slug
        pageTitle
        infoBlockDescription: infoBlockDescriptionNode {
          markdown: childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`;
