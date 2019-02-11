import React from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Sticky from 'react-stickynode';

import CookieConsent, {Cookies} from 'react-cookie-consent'
import Navbar from '../components/Navbar'
import MobileNavbar from '../components/MobileNavbar'
import Footer from '../components/Footer'
import { withRouter } from 'react-router';
import { Wrap } from 'blocks';

import './style.sass'

const SmartLink = ({ to, ...props }) => (
  to.includes('http') ?
    <a href={to} {...props} /> :
    <Link to={to} {...props} />
)

const MobileNavbarWithRouter = withRouter(MobileNavbar);

class TemplateWrapper extends React.Component {
  componentDidMount() {
    window.kayako = {};
    window.kayako.readyQueue = [];
    window.kayako.newEmbedCode = true;

    window.kayako._settings = {
      apiUrl: 'https://datocms.kayako.com/api/v1',
      messengerUrl: 'https://datocms.kayakocdn.com/messenger',
      realtimeUrl: 'wss://kre.kayako.net/socket',
    };

    const script = document.createElement('script');
    script.async = false;
    script.type = 'text/javascript';
    script.src = window.kayako._settings.messengerUrl;
    script.crossOrigin = 'anonymous';

    document.body.appendChild(script);
  }

  render() {
    const { data, location, children } = this.props;

    return (
      <div>
        <Helmet title="DatoCMS">
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <meta name="google-site-verification" content="wfOsq57h3qCQUTbHcX-4qEEY07vgi4KgH9rdT1ywwwc" />
        </Helmet>
        <HelmetDatoCms favicon={data.site.faviconMetaTags} />
        <CookieConsent
          cookieName="cookies-accepted"
          location="bottom"
          onAccept={() => {}}
          disableStyles
        >
          We use cookies to help our site work and to understand how it is used.
          By continuing to browse the site you're agreeing to our&nbsp;
          <a
            href="https://www.iubenda.com/privacy-policy/64648824/cookie-policy"
            target="_blank"
          >
            use of cookies
          </a>.
        </CookieConsent>
        {
          location.pathname !== '/content-management-api/' &&
            <div>
              <div className="banner">
                <Wrap>
                  <strong>NEW</strong> DatoCMS now offers a CDN-powered GraphQL API that you can use to create any kind of digital product! <Link to="/blog/releasing-content-delivery-api/">Read more</Link>
                </Wrap>
              </div>
              <Sticky innerZ={1000} top={0}>
                <Navbar linkComponent={SmartLink} />
              </Sticky>
              <MobileNavbarWithRouter linkComponent={SmartLink} />
            </div>
        }
        {
          children()
        }
        {
          location.pathname !== '/content-management-api/' &&
            <Footer linkComponent={SmartLink} />
        }
      </div>
    );
  }
}

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper

export const query = graphql`
query LayoutQuery {
  site: datoCmsSite {
    faviconMetaTags {
      ...GatsbyDatoCmsFaviconMetaTags
    }
  }
}
`
