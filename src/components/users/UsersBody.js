import React, { useContext, useState } from 'react'
import { UserContext } from '../auth'
import { Tabs, Tab } from 'react-bootstrap'
import UserList from './UserList'

const UsersBody = () => {
    const { user, loading, login } = useContext(UserContext)
    const [ userList, setUserList ] = useState([{
        name: "User 1",
        imageURL: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.tutorialsscripts.com%2Ffree-icons%2Foption-icons%2Fbrown-option-icon-96-x-96.png&f=1&nofb=1",
        isAdministrator: true
    },
    {
        name: "Moe Smith",
        imageURL: "https://lh3.googleusercontent.com/-opTvTNSzvvg/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmKTEiiQnTrlcxfpRSV7HG34NjDtA/s96-c/photo.jpg",
        isAdministrator: false
    },
    {
        name: "Harry Smith",
        imageURL: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.tutorialsscripts.com%2Ffree-icons%2Fprogramming-language%2Fc-icons%2Fblue-c-language-icon-96-x-96.png&f=1&nofb=1",
        isAdministrator: false
    },
    {
        name: "Harry Arse",
        imageURL: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1w5n8s20evgs15e7ckue11c1-wpengine.netdna-ssl.com%2Fwp-content%2Fuploads%2F2017%2F11%2FDepositphotos_85415802_m-2015-80x80.jpg&f=1&nofb=1",
        isAdministrator: false
    }])

    return (
        <div>
            {user ?
                <div style={{"fontSize" : "15px"}}>
                    <Tabs defaultActiveKey="administrators">
                        <Tab eventKey="administrators" title="Administrators">
                            <div style={{"margin": "20px"}}>
                                <UserList users={userList.filter(u => u.isAdministrator)} />
                            </div>
                        </Tab>
                        <Tab eventKey="members" title="Members">
                            <div style={{"margin": "20px"}}>
                                <UserList users={userList.filter(u => !u.isAdministrator)} />
                            </div>
                        </Tab>
                    </Tabs>
                </div>
                : !loading &&
                    <><h3 style={{ "marginTop": "25px"}}>Log in to continue</h3>
                    <div onClick={login} className="loginBtn">Log in</div></>
            }
        </div>
    )
}

export default UsersBody
