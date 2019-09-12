import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import { StaticQuery, graphql } from 'gatsby';

import CookieConsent from 'react-cookie-consent';
import Navbar from 'components/Navbar';
import MobileNavbar from 'components/MobileNavbar';
import Footer from 'components/Footer';

import './style.sass';

const query = graphql`
  query LayoutQuery {
    site: datoCmsSite {
      faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    featureGroups: allDatoCmsGroupFeature (limit: 4, sort: { fields: [position], order: ASC }) {
      nodes {
        navbarTitle
        navbarSubtitle
        navbarIcon { url }
        slug
      }
    }
  }
`;

class TemplateWrapper extends React.Component {
  render() {
    const { children, home } = this.props;

    return (
      <StaticQuery
        query={query}
        render={data => (
          <div className={home ? 'Layout--homepage' : 'Layout'}>
            <Helmet title="DatoCMS">
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
              />
              <meta
                name="google-site-verification"
                content="wfOsq57h3qCQUTbHcX-4qEEY07vgi4KgH9rdT1ywwwc"
              />
              <meta name="theme-color" content="#5a3252" />
            </Helmet>
            <HelmetDatoCms favicon={data.site.faviconMetaTags} />
            <CookieConsent
              cookieName="cookies-accepted"
              location="bottom"
              onAccept={() => {}}
              acceptOnScroll
              acceptOnScrollPercentage={10}
              disableStyles
            >
              We use cookies to help our site work and to understand how it is
              used. By continuing to browse the site you're agreeing to
              our&nbsp;
              <a
                href="https://www.iubenda.com/privacy-policy/64648824/cookie-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                use of cookies
              </a>
              .
            </CookieConsent>
            <Navbar transparent={this.props.home} featureGroups={data.featureGroups.nodes} />
            <MobileNavbar />
            {children}
            <Footer />
          </div>
        )}
      />
    );
  }
}

TemplateWrapper.propTypes = {
  children: PropTypes.array,
};

export default TemplateWrapper;
