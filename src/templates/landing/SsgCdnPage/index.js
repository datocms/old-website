import React from 'react';
import { graphql } from 'gatsby';
import Link from 'components/Link';
import { Wrap, button } from 'blocks';
import Zoom from 'react-reveal/Zoom';
import Helmet from 'react-helmet';

import bem from 'utils/bem';

import '../style.sass';

import logo from 'images/logo.svg';

import Layout from 'components/Layout';
import Hero from 'components/home/Hero';
import CallToAction from 'components/CallToAction';
import WhoIsUsing from 'components/home/WhoIsUsing';
import Features from 'components/home/Features';
import Quotes from 'components/home/Quotes';

const b = bem.lock('LandingPage');

export default class SsgCdnPage extends React.Component {
  render() {
    const {
      data: { ssg, cdn },
      pageContext,
    } = this.props;
    const { home, features, reviews } = pageContext;

    return (
      <Layout>
        <Helmet
          title={`CMS for ${ssg.name} on ${cdn.name} - Admin interface for ${
            ssg.name
          } sites - DatoCMS`}
        />
        <Hero
          smallTitle
          title={`The best companion for ${ssg.name} sites on ${cdn.name}`}
          description={`DatoCMS is an API-based administrative area for your ${
            ssg.name
          } websites. Let your clients publish new content independently, host the site on ${
            cdn.name
          }.`}
        />
        <div className={b('works')}>
          <Wrap>
            <div className={b('works-inner')}>
              <div className={b('works-logos')}>
                <div className={b('works-logos-inner')}>
                  <Zoom delay={0}>
                    <img src={ssg.logo.url} alt={ssg.name} />
                  </Zoom>
                  <Zoom delay={200}>
                    <img src={logo} alt="DatoCMS" />
                  </Zoom>
                </div>
              </div>
              <div className={b('works-content')}>
                <div className={b('works-content-inner')}>
                  <div className={b('works-content-title')}>
                    How does it work?
                  </div>
                  <div className={b('works-content-content')}>
                    <ol>
                      <li>
                        Use our visual builder to generate a custom
                        administrative area
                      </li>
                      <li>
                        Invite your editors in and let them make changes to
                        the site content
                      </li>
                      <li>
                        Integrate your {ssg.name} project with our{' '}
                        <a href={ssg.documentationUrl}>our DatoCMS plugin</a>
                      </li>
                    </ol>
                  </div>
                  <div className={b('works-content-actions')}>
                    <Link
                      to={ssg.documentationUrl}
                      className={button({ red: true })}
                    >
                      Go to our {ssg.name} integration guide
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Wrap>
        </div>
        <Features data={features.edges.map(x => x.node)} />
        <WhoIsUsing data={home.whosUsingDatocms} />
        <Quotes data={reviews.edges.map(x => x.node)} />
        <CallToAction />
      </Layout>
    );
  }
}

export const query = graphql`
  query SsgCdnPageQuery($ssgSlug: String!, $cdnSlug: String!) {
    ssg: datoCmsIntegration(slug: { eq: $ssgSlug }) {
      name
      logo {
        url
      }
      projectUrl
      documentationUrl
      slug
    }
    cdn: datoCmsIntegration(slug: { eq: $cdnSlug }) {
      name
      logo {
        url
      }
      projectUrl
      documentationUrl
      slug
    }
  }
`;
