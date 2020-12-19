import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import UserProvider from '../components/auth'
import AffiliateProvider from '../components/affiliate'
import AnnouncementsBody from '../components/announcements/AnnouncementsBody'

const IndexPage = () => {
  return (
    <UserProvider>
      <AffiliateProvider>
    <Layout>
      <SEO title='Announcements' />
      <div style={{"padding" : "10px"}}>
        <AnnouncementsBody />
      </div>
    </Layout>
    </AffiliateProvider>
    </UserProvider>
  )
}
export default IndexPage
