import React from 'react'
import Link from 'gatsby-link'
import { Wrap, button, Space, text } from 'blocks'
import Masonry from 'react-masonry-component'

import bem from 'utils/bem'

import '../style.sass'

import logo from 'images/logo.svg'

import Browser from 'components/Browser'
import LazyImage from 'components/LazyImage'
import Hero from 'components/home/Hero'
import CallToAction from 'components/CallToAction'
import WhoIsUsing from 'components/home/WhoIsUsing'
import Features from 'components/home/Features'
import Quotes from 'components/home/Quotes'

const b = bem.lock('LandingPage')

export default class SsgPage extends React.Component {
  render() {
    const { data: { ssg, home, features, reviews } } = this.props;

    const websites = this.props.data.websites.edges
      .map(({ node }) => node)
      .filter((website) => (
        website.technologies.map(t => t.slug).includes(ssg.slug)
      ))
      .slice(0, 4);

    return (
      <div>
        <Hero
          title={`Meet the perfect CMS for ${ssg.name}`}
          description={`DatoCMS is an API-based administrative area for your ${ssg.name} websites. Let your clients publish new content independently, host the site anywhere you like.`}
        />
        <WhoIsUsing data={home.whosUsingDatocms} />
        <div className={b('works')}>
          <Wrap>
            <div className={b('works-inner')}>
              <div className={b('works-logos')}>
                <div className={b('works-logos-inner')}>
                  <img src={ssg.logo.url} alt={ssg.name} />
                  <img src={logo} alt="DatoCMS" />
                </div>
              </div>
              <div className={b('works-content')}>
                <div className={b('works-content-inner')}>
                  <div className={b('works-content-title')}>
                    How does it work?
                  </div>
                  <div className={b('works-content-content')}>
                    <ol>
                      <li>Use our visual builder to generate a custom administrative area</li>
                      <li>Invite your editors in and let them make changes to the site content</li>
                      <li>Integrate your {ssg.name} project with our <a href={ssg.documentationUrl}>our DatoCMS plugin</a></li>
                    </ol>
                  </div>
                  <div className={b('works-content-actions')}>
                    <Link to={ssg.documentationUrl} className={button({ red: true })}>
                      Go to our {ssg.name} integration guide
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Wrap>
        </div>
        <Features data={features.edges.map(x => x.node)} />
        <Quotes data={reviews.edges.map(x => x.node)} />
        <CallToAction />
      </div>
    );
  }
}

export const query = graphql`
  query SsgPageQuery($slug: String!) {
    ssg: datoCmsIntegration(slug: { eq: $slug }) {
      name
      logo { url }
      projectUrl
      documentationUrl
      slug
    }

    websites: allDatoCmsWebsite(sort: { fields: [position] }) {
      edges {
        node {
          id
          title
          url
          useCase {
            id
          }
          technologies {
            slug
          }
          image {
            width
            height
            resize(width: 700, imgixParams: { fm: "jpg", q: 90 }) {
              src
            }
          }
        }
      }
    }

    home: datoCmsHomePage {
      whosUsingDatocms {
        name
        logo {
          url
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
            sizes(maxWidth: 55) {
              ...GatsbyDatoCmsSizes
            }
          }
        }
      }
    }
  }
`

// <Space both={10}>
//   <Wrap>
//     <div className={b()}>
//       <div className={b('content')}>
//         <div className={b('logos')}>
//           <img src={ssg.logo.url} />
//         </div>
//         <div className={b('title')}>
//           Meet the CMS for {ssg.name}!
//         </div>
//         <div className={b('description')}>
//           <p>DatoCMS is a web-based administrative area for your <a href={ssg.projectUrl} target="_blank">{ssg.name}</a> static websites.</p>

//           <ol>
//             <li>Use our visual builder to generate a custom administrative area</li>
//             <li>Invite your editors and let them make changes to the site content</li>
//             <li>Integrate your {ssg.name} project with our <a href={ssg.documentationUrl}>our DatoCMS plugin</a></li>
//           </ol>
//         </div>
//       </div>
//       <div className={b('gallery')}>
//         <Masonry
//           options={{
//             columnWidth: '.LandingPage__grid-sizer',
//             gutter: '.LandingPage__gutter-sizer',
//             itemSelector: '.LandingPage__website',
//             percentPosition: true
//           }}
//         >
//           <div className={b('grid-sizer')} />
//           <div className={b('gutter-sizer')} />
//           {
//             websites.map((website) => (
//               <div key={website.url} className={b('website')}>
//                 <LazyImage height={200} image={website.image} slow={website.highlighted} />
//               </div>
//             ))
//           }
//         </Masonry>
//       </div>
//     </div>
//   </Wrap>
// </Space>
