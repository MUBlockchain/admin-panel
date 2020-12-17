import React, { useContext } from "react"
import { UserContext } from "./auth"
import { Link } from "gatsby"

const Navigation = () => {

    const { user, loading } = useContext(UserContext)
    console.log(user)

    return (
        user ?
            <div className="navigation-container">
                <div className="navigation-links">
                    <Link to="/" activeClassName="navigation-link-active">
                        Home
                    </Link>
                    <Link to="/users" activeClassName="navigation-link-active">
                        Users
                    </Link>
                    <Link to="/items" activeClassName="navigation-link-active">
                        Items
                    </Link>
                    <Link to="/bounties" activeClassName="navigation-link-active">
                        Bounties
                    </Link>
                    <Link to="/announcements" activeClassName="navigation-link-active">
                        Announcements
                    </Link>
                    <div className="navigation-user-info">
                        user info goes here
                    </div>
                </div>
            </div>
            : <br/>
    );
}

export default Navigation
