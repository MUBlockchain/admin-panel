import React, { useContext } from "react"
import { UserContext } from '../components/auth'
import Layout from "../components/layout"
import SEO from "../components/seo"
import '../components/app.css'

const ForbiddenPage = () => {
  return (
    <Layout>
      <SEO title="403: Forbidden" />
      <h1>Forbidden</h1>
      <p>Sorry, you are not authorized to access this page...</p>
    </Layout>
  )

}

export default ForbiddenPage
