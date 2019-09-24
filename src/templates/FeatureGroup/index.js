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
          <div className={b('header')}>
            <div className={b('header-content')}>
              <div className={b('header-content-text')}>
                <img className={b('header-icon')} src={data.page.navbarIcon.url} alt="" />
                <h1>{data.page.pageTitle}</h1>
                <p>{data.page.pageSubtitle}</p>
              </div>
            </div>
          </div>
          <Space bottom={4}>
            <div className={b('info')}>
              <div className={b('info-title')}>
                {data.page.infoBlockTitle}
              </div>
              <div className={b('info-description')}>
                {data.page.infoBlockDescription}
              </div>
            </div>
          </Space>

          { data.page.features.map((feature, i) => {
            const evenOdd = i % 2 === 0 ? "even" : "odd";
            return (
              <div className={b('feature') + ' ' + b('feature--' + evenOdd)}>
                <div className={b('feature-image')}>
                  <InlineSVG image={feature.image} />
                </div>
                <div className={b('feature-content')}>
                  <img className={b('header-icon')} src={data.page.navbarIcon.url} alt="" />
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
