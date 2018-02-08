import ReactDOM from 'react-dom'
import React from 'react'
import Navbar from './src/components/Navbar'
import MobileNavbar from './src/components/MobileNavbar'
import Footer from './src/components/Footer'

const Link = ({ to, ...props }) => (
  <a
    href={to.startsWith('http') ? to : `https://www.datocms.com${to}`}
    {...props}
  />
);

ReactDOM.render(
  <Footer linkComponent={Link} />,
  document.getElementById("footer")
);

ReactDOM.render(
  <Navbar linkComponent={Link} />,
  document.getElementById("navbar")
);

ReactDOM.render(
  <MobileNavbar linkComponent={Link} />,
  document.getElementById("mobile-navbar")
);

