import React, { useContext } from 'react'
import { UserContext } from './auth'
import UserProfile from './UserProfile'
import '../components/app.css'
import LinearLoadingComponent from './misc/Loading'

const IndexBody = () => {
    const { user, loading, login } = useContext(UserContext)

    return (
        <div className="IndexBody">
            {user ?
                <div>
                    <div style={{padding: "10px", margin: "5px"}}>
                        <UserProfile />
                    </div>
                    <div>
                        <p>Ethereum Address: {user.publicAddress}</p>
                    </div>
                </div>
                : loading 
                    ? <LinearLoadingComponent text="Logging you in..."/>
                    : <div style={{"margin": "20px"}}>
                        <h3 style={{ "marginTop": "25px"}}>Log in to continue</h3> 
                        <div onClick={login} className="loginBtn">LOG IN</div>
                    </div>
            }
        </div>
    )
}

export default IndexBody