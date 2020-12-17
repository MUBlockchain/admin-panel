import React, { useContext } from "react"
import { UserContext } from "./auth"
import { AffiliateContext } from "./affiliate"
import { Link } from "gatsby"
import UserProfile from './UserProfile'

const Navigation = () => {

    const { user, loading } = useContext(UserContext)
    const { affiliateColor, setAffiliateColor } = useContext(AffiliateContext)

    const activeLinkStyle = {
        color: "#fff",
        backgroundColor: affiliateColor
    }

    return (
        user ?
            <div className="navigation-container">
                <div className="navigation-links">
                    <Link to="/" activeStyle={activeLinkStyle}>
                        Home
                    </Link>
                    <Link to="/users" activeStyle={activeLinkStyle}>
                        Users
                    </Link>
                    <Link to="/items" activeStyle={activeLinkStyle}>
                        Items
                    </Link>
                    <Link to="/bounties" activeStyle={activeLinkStyle}>
                        Bounties
                    </Link>
                    <Link to="/announcements" activeStyle={activeLinkStyle}>
                        Announcements
                    </Link>
                    <div className="navigation-user-info">
                        <UserProfile />
                    </div>
                </div>
            </div>
            : <br/>
    );
}

export default Navigation
