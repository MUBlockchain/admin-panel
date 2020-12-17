/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import "./layout.css"
import MUBCHeader from "./MUBCHeader"
import '../components/app.css'
import Navigation from "./navigation"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <MUBCHeader />
      <div className="Layout">
        <Navigation />
        <main>{children}</main>
        <footer className="Footer">
          © {new Date().getFullYear()}, Built by Ian Brighton
          {` `}
          <a href="https://www.linkedin.com/in/ian-brighton/">@LinkedIn</a>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
