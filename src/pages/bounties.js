import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import UserProvider from '../components/auth'
import AffiliateProvider from '../components/affiliate'
import BountiesBody from '../components/bounties/BountiesBody'

const IndexPage = () => {
  return (
    <UserProvider>
      <AffiliateProvider>
    <Layout>
      <SEO title='Bounties' />
      <div style={{"padding" : "10px"}}>
        <BountiesBody />
      </div>
    </Layout>
    </AffiliateProvider>
    </UserProvider>
  )
}
export default IndexPage
