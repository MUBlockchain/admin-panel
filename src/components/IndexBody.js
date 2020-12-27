import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './auth'
import { AffiliateContext } from './affiliate'
import CircularProgress from '@material-ui/core/CircularProgress'
import UserProfile from './UserProfile'
import { useContract } from './hooks'
import '../components/app.css'

const IndexBody = () => {
    const { user, loading, login } = useContext(UserContext)

    return (
        <div className="IndexBody">
            {loading && <CircularProgress color={'primary'} />}
            <div style={{padding: "10px", margin: "5px"}}>
                <UserProfile />
            </div>
            {user ?
                <div>
                    <div>
                        <p>Ethereum Address: {user.publicAddress}</p>
                    </div>
                </div>
                : !loading && 
                    <><h3 style={{ "margin-top": "25px"}}>Log in to continue</h3> 
                    <div onClick={login} className="loginBtn">Log in</div></>
            }
        </div>
    )
}

export default IndexBody