import React from 'react'
import Nav from '../Nav/'
import Footer from '../Footer/'
import './style.css'

const Layout = props => (
  <div className="layout">
    <Nav />
    <div className="layoutContent">
      {props.children}
    </div>
    <Footer />
  </div>
)

export default Layout
