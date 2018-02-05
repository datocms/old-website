import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Navbar from 'components/Navbar'
import MobileNavbar from 'components/MobileNavbar'
import DatoProvider from 'components/DatoProvider'
import Footer from 'components/Footer'

import './style.sass'

const TemplateWrapper = ({ location, children }) => (
  <DatoProvider>
    <div>
      <Helmet title="DatoCMS">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Helmet>
      {
        location.pathname !== '/api/' &&
          <div>
            <Navbar />
            <MobileNavbar />
          </div>
      }
      {
        children()
      }
      {
        location.pathname !== '/api/' &&
          <Footer />
      }
    </div>
  </DatoProvider>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
