import React from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { HelmetDatoCms } from 'gatsby-source-datocms'

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
    window.FCSP = '4517cfc9daff1bacb8672f591c5c944f';

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = false;
    script.src = 'https://chat-assets.frontapp.com/v1/chat.bundle.js';
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
        {
          location.pathname !== '/content-management-api/' &&
            <div>
              <div className="banner">
                <Wrap>
                  <strong>NEW</strong> DatoCMS now offers a CDN-powered GraphQL API that you can use to create any kind of digital product! <Link to="/blog/releasing-content-delivery-api/">Read more</Link>
                </Wrap>
              </div>
              <Navbar linkComponent={SmartLink} />
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
