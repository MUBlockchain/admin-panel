import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import UserProvider from '../components/auth'
import AffiliateProvider from '../components/affiliate'
import UsersBody from '../components/users/UsersBody'

const IndexPage = () => {
    return (
        <UserProvider>
            <AffiliateProvider>
                <Layout>
                    <SEO title='Users' />
                    <div style={{"padding": "10px"}}>
                        <UsersBody />
                    </div>
                </Layout>
            </AffiliateProvider>
        </UserProvider>
    )
}

export default IndexPage
