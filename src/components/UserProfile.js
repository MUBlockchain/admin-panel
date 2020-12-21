import React, { useContext, useState } from 'react'
import { UserContext } from './auth'
import "./userProfile.css"

const UserProfile = () => {
    const { user, logout } = useContext(UserContext)
    return (<>
        {user 
            &&   <div className="dropdown">
                    <span className="user-info">
                        <img src={user.profileImage} alt="Profile picture"/>
                    </span>
                    <div className="dropdown-content">
                        <div style={{color: "#525252"}}>{user.name}</div>
                        <div style={{color: "#6e0406"}} onClick={logout}> Log out </div>
                    </div>
                </div>
        }
    
    </>)
}

export default UserProfile
