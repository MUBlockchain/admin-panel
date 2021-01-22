import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../auth'
import { Tabs, Tab } from 'react-bootstrap'
import UserList from './UserList'
import LinearLoadingComponent from '../misc/Loading'
import { useUsers } from '../hooks'
import toast from 'react-hot-toast'

const UsersBody = () => {
    const { user, loading, login } = useContext(UserContext);
    const usersContract = useUsers();
    const [ userList, setUserList ] = useState([]);
    const [ fetching, setFetching ] = useState(true);

    const getUsers = async () => {
        if (!usersContract) return;
        setFetching(true);
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
        setFetching(false);
    }

    const promoteUser = async () => {
        // toast.promise(
        //     usersContract.promoteUser(),
        //     {
        //         loading: <span>Promoting user...</span>,
        //         success: m => {
        //             // do something
        //             return (<span>User promoted!</span>)
        //         },
        //         error: e => {
        //             return (<span>Oops! An error has occurred...</span>)
        //         }
        //     }
        // )
        // TODO: figure out how to get user address to pass to promote
        // const res = await usersContract.promote()
    }

    useEffect(() => {
        if(userList.length) return
        getUsers();
    }, [ usersContract ])

    return (
        <div>
            {user && user.isAdmin ?
                fetching 
                    ? <LinearLoadingComponent text="Fetching data..." />
                    : <div style={{"fontSize" : "15px"}}>
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
                : loading  
                    ? <LinearLoadingComponent text="Logging you in..." />
                    : <><h3 style={{ "marginTop": "25px"}}>Log in to continue</h3>
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
