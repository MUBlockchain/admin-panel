import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../auth'
import { Tabs, Tab } from 'react-bootstrap'
import UserList from './UserList'
import { useUsers } from '../hooks'

const UsersBody = () => {
    const { user, loading, login } = useContext(UserContext);
    const usersContract = useUsers();

    const [ userList, setUserList ] = useState([]);

    const getUsers = async () => {
        if (!usersContract) return;
        const res = await usersContract.getUsers();
        const tempUsers = [];

        const len = parseInt(res._nonce._hex)
        for(let i = 0; i < len; i++) {
            tempUsers.push(new User(res._names[i],
                                    res._imageUrls[i],
                                    res._roles[i],
                                    res._balances[i]));
        }

        setUserList(tempUsers)
    }

    const promoteUser = async () => {
        // TODO: figure out how to get user address to pass to promote
        // const res = await usersContract.promote()
    }

    useEffect(() => {
        getUsers();
    }, [ user ])

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
                                <UserList users={userList.filter(u => !u.isAdministrator)} promoteUser={promoteUser} />
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

class User {
    constructor(name, imageUrl, role, balance) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.isAdministrator = parseInt(role) == 2 ? true : false;
        this.balance = parseInt(balance);
    }
}

export default UsersBody
