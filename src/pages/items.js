import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import UserProvider from '../components/auth'
import AffiliateProvider from '../components/affiliate'
import ItemsBody from '../components/items/ItemsBody'

const IndexPage = () => {
    return (
        <UserProvider>
            <AffiliateProvider>
                <Layout>
                    <SEO title='Items' />
                    <ItemsBody />
                </Layout>
            </AffiliateProvider>
        </UserProvider>
    )
}

export default IndexPage
