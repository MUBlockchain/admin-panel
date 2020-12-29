import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../auth'
import { Tabs, Tab } from 'react-bootstrap'
import CircularProgress from '@material-ui/core/CircularProgress'
import './announcementsBody.css'
import AnnouncementUtils from './AnnouncementUtils'
import AnnouncementList from './AnnouncementList'
import AnnouncementEdit from './AnnouncementEdit'
import { useContract } from '../hooks'

const AnnouncementsBody = () => {
    const contract = useContract()
    const { user, loading, login } = useContext(UserContext)
    const [ announcementList, setAnnouncementList ] = useState([{
        title : "Test Announcement 1",
        content: "None yet...",
        datePosted: "2020-12-19",
        isPinned: true
    },
    {
        title : "Test Announcement 2",
        content: "None yet... but here is #2 announcement",
        datePosted: "2020-12-14",
        isPinned: false
    },
    {
        title : "Test Announcement 3",
        content: "None yet...and here is #3 announcement",
        datePosted: "2020-12-13",
        isPinned: false
    },
    {
        title : "Test Announcement 4",
        content: "None yet...and here is #4 announcement",
        datePosted: "2020-12-10",
        isPinned: false
    }])

    const getAnnouncements = async () => {
        if (!contract) return
        const tx = await contract.getAnnouncements();
        console.log(tx);
    }
    useEffect(
        () => {
            getAnnouncements();
        }, [contract])

    return (
        <div>
            {user ?
                <div style={{"fontSize" : "15px"}}>
                    <Tabs defaultActiveKey="viewer">
                        <Tab eventKey="viewer" title="Viewer">
                            <div style={{"margin": "20px"}}>
                                <AnnouncementUtils />
                                <AnnouncementList announcementList={announcementList} />
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