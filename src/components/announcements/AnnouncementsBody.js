import React, { useContext } from 'react'
import { UserContext } from '../auth'
import { Tabs, Tab } from 'react-bootstrap'
import CircularProgress from '@material-ui/core/CircularProgress'
import './announcementsBody.css'
import AnnouncementList from './AnnouncementList'
import AnnouncementEdit from './AnnouncementEdit'

const AnnouncementsBody = () => {
    const { user, loading, login } = useContext(UserContext);

    return (
        <div>
            {user ?
                <div style={{"fontSize" : "15px"}}>
                    <Tabs defaultActiveKey="viewer">
                        <Tab eventKey="viewer" title="Viewer">
                            <div style={{"margin": "20px"}}>
                                <AnnouncementList />
                            </div>
                        </Tab>
                        <Tab eventKey="editor" title="Editor">
                            <div className="announcement-form">
                                <AnnouncementEdit />
                            </div>
                        </Tab>
                    </Tabs>
                </div>
                : loading 
                    ? <CircularProgress color={'primary'} />
                    : <><h3 style={{ "marginTop": "25px"}}>Log in to continue</h3> 
                    <div onClick={login} className="loginBtn">Log in</div></>
            }
        </div>
    )
}

export default AnnouncementsBody