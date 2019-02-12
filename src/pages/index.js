import React from 'react'
import { graphql, Link } from 'gatsby'
import bem from 'utils/bem'
import { HelmetDatoCms } from 'gatsby-source-datocms'

import Hero from 'components/home/Hero'
import WhoIsUsing from 'components/home/WhoIsUsing'
import HowItWorks from 'components/home/HowItWorks'
import Tools from 'components/home/Tools'
import Features from 'components/home/Features'
import Quotes from 'components/home/Quotes'
import CallToAction from 'components/CallToAction'
import Layout from 'components/Layout';

import { Wrap } from 'blocks'

import './index.sass'

const b = bem.lock('IndexPage')

function fetcher(graphQLParams) {
  return fetch(
    'https://graphql.datocms.com/',
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'faeb9172e232a75339242faafb9e56de8c8f13b735f7090964'
      },
      body: JSON.stringify(graphQLParams),
    }
  ).then(response => response.json());
}

const IndexPage = ({ data }) => (
  <Layout hideChat>
    <HelmetDatoCms seo={data.home.seoMetaTags} />
    <Hero
      title="Headless CMS, done right"
      description="Creating blazing fast websites has never been easier: manage content from a central place, use our GraphQL API to feed content into any platform."
    />
    <Wrap>
      <div className={b('b')}>
        <div className={b('b-title')}>
          Finally focus 100% of your time on the end product
        </div>
        <div className={b('b-description')}>
          Test new ideas in minutes: any change you visually make to the schema is immediately reflected on the editing interface and available on the GraphQL API to be integrable by your developers.
        </div>
      </div>
    </Wrap>
    <div className={b('second-wave')}>
      <HowItWorks />
    </div>
    <div className={b('gradient')}>
      <Features data={data.features.edges.map(x => x.node)} />
      <WhoIsUsing data={data.home.whosUsingDatocms} />
    </div>
    <Quotes data={data.reviews.edges.map(x => x.node)} />
    <CallToAction />
  </Layout>
)

export default IndexPage

export const query = graphql`
query IndexPageQuery {
  home: datoCmsHomePage {
    seoMetaTags {
      ...GatsbyDatoCmsSeoMetaTags
    }
    heroText
    heroDescription
    whosUsingDatocms {
      name
      logo {
        url
      }
    }
  }
  integrations: allDatoCmsIntegration(sort: { fields: [position], order: ASC }) {
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
`
