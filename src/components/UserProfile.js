import React, { useContext, useState } from 'react'
import { UserContext } from './auth'
import "./userProfile.css"

const UserProfile = () => {
    const { user, loading, login, logout } = useContext(UserContext)
    return (<>
        {user 
            ?   <div class="dropdown">
                    <span class="user-info">
                        <img src={user.profileImage} alt="Profile picture"/>
                    </span>
                    <div class="dropdown-content">
                        <div style={{color: "#525252"}}>{user.name}</div>
                        <div style={{color: "#6e0406"}} onClick={logout}> Log out </div>
                    </div>
                </div>
            : !loading && <div onClick={login} className="loginBtn">Log in</div>
        }
    
    </>)
}

export default UserProfile