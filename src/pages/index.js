import React from 'react';
import { graphql } from 'gatsby';
import bem from 'utils/bem';
import { HelmetDatoCms } from 'gatsby-source-datocms';

import Hero from 'components/home/Hero';
import WhoIsUsing from 'components/home/WhoIsUsing';
import HowItWorks from 'components/home/HowItWorks';
import Features from 'components/home/Features';
import Quotes from 'components/home/Quotes';
import CallToAction from 'components/CallToAction';
import Layout from 'components/Layout';

import { Wrap } from 'blocks';

import './index.sass';

const b = bem.lock('IndexPage');

const IndexPage = ({ data }) => (
  <Layout home hideChat>
    <HelmetDatoCms seo={data.home.seoMetaTags} />
    <Hero title={data.home.heroText} description={data.home.heroDescription} />
    <Wrap>
      <div className={b('b')}>
        <div className={b('b-title')}>{data.home.secondBlockTitle}</div>
        <div className={b('b-description')}>
          {data.home.secondBlockDescription}
        </div>
      </div>
    </Wrap>
    <div className={b('second-wave')}>
      <HowItWorks />
    </div>
    <Features data={data.features.edges.map(x => x.node)} />
    <div className={b('gradient')}>
      <WhoIsUsing data={data.home.whosUsingDatocms} />
      <Quotes data={data.reviews.edges.map(x => x.node)} />
      <CallToAction transparent />
    </div>
  </Layout>
);

export default IndexPage;

export const query = graphql`
  query IndexPageQuery {
    home: datoCmsHomePage {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      heroText
      heroDescription
      secondBlockTitle
      secondBlockDescription
      whosUsingDatocms {
        name
        logo {
          url
        }
      }
    }
    integrations: allDatoCmsIntegration(
      sort: { fields: [position], order: ASC }
    ) {
      edges {
        node {
          name
          logo {
            url
          }
        }
      }
    }
    features: allDatoCmsFeature(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          id
          title
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
    reviews: allDatoCmsReview(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          id
          name
          role
          website
          quote: quoteNode {
            markdown: childMarkdownRemark {
              html
            }
          }
          image {
            fluid(maxWidth: 55) {
              ...GatsbyDatoCmsFluid
            }
          }
        }
      }
    }
  }
`;
