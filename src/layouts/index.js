import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import './style.sass'

const TemplateWrapper = ({ location, children }) => (
  <div>
    <Helmet title="DatoCMS" />
      {
        location.pathname !== '/api/' &&
          <Navbar />
      }
      {
        children()
      }
      {
        location.pathname !== '/api/' &&
          <Footer />
      }
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
