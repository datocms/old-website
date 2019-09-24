import React from 'react';
import { graphql } from 'gatsby';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import InlineSVG from 'components/InlineSVG';

import bem from 'utils/bem';

import { Space } from 'blocks';
import Layout from 'components/Layout';

import './style.sass';

const b = bem.lock('FeatureSingle');

class FeatureGroupPage extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <Layout>
        <HelmetDatoCms seo={data.page.seoMetaTags} />
        <div className={b()}>
          <div className={b('header')} style={{ backgroundImage: data.page.backgroundImage && `url(${data.page.backgroundImage.url})` }}>
            <div className={b('header-content')}>
              <img className={b('header-content-icon')} src={data.page.navbarIcon.url} />
              <h1 className={b('header-content-title')}>{data.page.pageTitle}</h1>
              <p className={b('header-content-subtitle')}>{data.page.pageSubtitle}</p>
            </div>
            <div className={b('header-info')}>
              {data.page.infoBlockDescription}
            </div>
          </div>

          { data.page.features.map((feature, i) => {
            return (
              <div className={b('feature', { odd: i % 2 === 1 })}>
                <div className={b('feature-inner')}>
                  <div className={b('feature-text')}>
                    <div className={b('feature-text-inner')}>
                      <div className={b('feature-text-inner-inner')}>
                        <div className={b('feature-title')}>
                          {feature.title}
                        </div>
                        <div
                          className={b('feature-description')}
                          dangerouslySetInnerHTML={{
                            __html: feature.description.markdown.html,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={b('feature-image')}>
                    <div className={b('feature-image-inner')}>
                      <InlineSVG image={feature.image} />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
          <Space top={10} bottom={4}>
            <div className={b('info')}>
              <div className={b('info-title')}>
                {data.otherFeaturesBlock.otherFeaturesTitle}
              </div>
              <div className={b('info-description')}>
              {data.otherFeaturesBlock.otherFeaturesSubtitle}
              </div>
            </div>
          </Space>

          <div className={b('other-feature-groups')}>
            {data.otherFeatureGroups.nodes.map((featureGroup) => {
              return featureGroup.slug !== data.page.slug && (
                <a href={"/features/"+featureGroup.slug} className={b('other-feature-group')}>
                  <img src={featureGroup.navbarIcon.url} alt="" className={b('other-feature-group-icon')} />
                  <div className={b('other-feature-group-title')}>
                    {featureGroup.pageTitle}
                  </div>
                  {featureGroup.pageSubtitle}
                </a>
              )
            })}
          </div>
        </div>
      </Layout>
    );
  }
}

export default FeatureGroupPage;

export const query = graphql`
  query FeatureGroupPageQuery($slug: String!) {
    page: datoCmsGroupFeature(slug: { eq: $slug }) {
      slug
      backgroundImage { url }
      pageTitle
      pageSubtitle
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      navbarIcon{url}
      infoBlockTitle
      infoBlockDescription
      features {
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

    otherFeaturesBlock: datoCmsFeaturesPage {
      otherFeaturesTitle
      otherFeaturesSubtitle
    }

    otherFeatureGroups: allDatoCmsGroupFeature (limit: 4, sort: { fields: [position], order: ASC }) {
      nodes {
        slug
        pageTitle
        pageSubtitle
        navbarIcon {
          url
        }
      }
    }
  }
`;
