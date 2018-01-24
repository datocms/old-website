import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { configureAnchors } from 'react-scrollable-anchor'

import Navbar from '../components/Navbar'
import CallToAction from '../components/CallToAction'
import Footer from '../components/Footer'

import './style.sass'

// Offset all anchors by -60 to account for a fixed header
configureAnchors({ offset: -100 })

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet title="DatoCMS" />
      <Navbar />
      {children()}
      <Footer />
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
