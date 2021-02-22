import React, { useContext } from 'react'
import { UserContext } from '../auth'
import { Tabs, Tab } from 'react-bootstrap'
import './announcementsBody.css'
import AnnouncementList from './AnnouncementList'
import AnnouncementEdit from './AnnouncementEdit'
import LinearLoadingComponent from '../misc/Loading'
import { useAnnouncements } from '../hooks'

const AnnouncementsBody = () => {
    const { user, loading, login } = useContext(UserContext)
    const contract = useAnnouncements()

    return (
        <div>
            {user && user.isAdmin
                ?   <div style={{"fontSize" : "15px"}}>
                        <Tabs defaultActiveKey="viewer">
                            <Tab eventKey="viewer" title="Viewer">
                                <div style={{"margin": "20px"}}>
                                    <AnnouncementList contract={contract}/>
                                </div>
                            </Tab>
                            <Tab eventKey="editor" title="Editor">
                                <div className="announcement-form">
                                    <AnnouncementEdit contract={contract}/>
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                : loading 
                    ? <LinearLoadingComponent text="Logging you in..." />
                    : <><h3 style={{ "marginTop": "25px"}}>Log in to continue</h3> 
                    <div onClick={login} className="loginBtn">LOG IN</div></>
            }
        </div>
    )
}

export default AnnouncementsBody