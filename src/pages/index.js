import React from 'react'
import Link from 'gatsby-link'
import bem from 'utils/bem'

import Hero from '../components/home/Hero'
import WhoIsUsing from '../components/home/WhoIsUsing'
import HowItWorks from '../components/home/HowItWorks'
import Tools from '../components/home/Tools'
import Features from '../components/home/Features'

import './index.sass'

const b = bem.lock('IndexPage')

const IndexPage = ({ data }) => (
  <div>
    <Hero data={data} />
    <WhoIsUsing data={data} />
    <div className={b('second-wave')}>
      <HowItWorks />
      <Tools data={data} />
    </div>
    <Features data={data} />
  </div>
)

export default IndexPage

export const query = graphql`
query IndexPageQuery {
  home: datoCmsHomePage {
    heroText
    heroDescription
    whosUsingDatocms {
      name
      logo {
        url
      }
    }
    integrations {
      name
      logo {
        url
      }
    }
  }
  features: allDatoCmsFeature {
    edges {
      node {
        title
        description: descriptionNode {
          markdown: childMarkdownRemark {
            html
          }
        }
        image {
          sizes(maxWidth: 420) {
            ...GatsbyDatoCmsSizes
          }
        }
      }
    }
  }
}
`
