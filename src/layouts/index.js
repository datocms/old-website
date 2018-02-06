import React from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { HelmetDatoCms } from 'gatsby-source-datocms'

import Navbar from '../components/Navbar'
import MobileNavbar from '../components/MobileNavbar'
import Footer from '../components/Footer'
import { withRouter } from 'react-router';

import './style.sass'

const SmartLink = ({ to, ...props }) => (
  to.includes('http') ?
    <a href={to} {...props} /> :
    <Link to={to} {...props} />
)

const MobileNavbarWithRouter = withRouter(MobileNavbar);

class TemplateWrapper extends React.Component {
  componentDidMount() {
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = 'f6c597e6-eda0-477a-ac60-9abea56354eb';

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = false;
    script.src = 'https://client.crisp.im/l.js';
    document.body.appendChild(script);
  }

  render() {
    const { data, location, children } = this.props;

    return (
      <div>
        <Helmet title="DatoCMS">
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        </Helmet>
        <HelmetDatoCms favicon={data.site.faviconMetaTags} />
        {
          location.pathname !== '/api/' &&
            <div>
              <Navbar linkComponent={SmartLink} />
              <MobileNavbarWithRouter linkComponent={SmartLink} />
            </div>
        }
        {
          children()
        }
        {
          location.pathname !== '/api/' &&
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
