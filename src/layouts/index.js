import React from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

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

const TemplateWrapper = ({ location, children }) => (
  <div>
    <Helmet title="DatoCMS">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    </Helmet>
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
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
