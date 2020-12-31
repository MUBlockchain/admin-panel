import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../auth'
import { Tabs, Tab } from 'react-bootstrap'
import CircularProgress from '@material-ui/core/CircularProgress'
import UnitsList from '../units/UnitsList'
import BountiesPending from './BountiesPending'
import './bounties.css'

const BountiesBody = () => {
    const { user, loading, login } = useContext(UserContext)
    const [ bountiesList, setBountiesList ] = useState([
        {
            name: "Miami Bounty 1",
            description: "Text description for bounty 1",
            award: 5,
            imageUrl: "https://i.pinimg.com/564x/1f/3b/9c/1f3b9c69c86dba282885faefdf1d55b2.jpg",
            isActive: true,
            isInfinite: false,
            quantity: 10
        },
        {
            name: "Org Bounty 2",
            description: "Text description for bounty 2...",
            award: 8,
            imageUrl: "https://cdn-images-1.medium.com/max/1200/1*7OArorLfbNT9lmqrijahjg.png",
            isActive: true,
            isInfinite: false,
            quantity: 5
        },
        {
            name: "Conference Bounty 3",
            description: "Text description for bounty 3...",
            award: 2,
            imageUrl: "https://www.swissdigitalhealth.com/wp-content/uploads/2017/03/conference-showcase-SDH.jpg",
            isActive: true,
            isInfinite: true,
            quantity: null
        },
        {
            name: "Bounty 4",
            description: "Text description for bounty 4...",
            award: 6,
            imageUrl: "https://hackernoon.com/hn-images/1*I3PvdUSaBNnw4qg_JQqirg.png",
            isActive: false,
            isInfinite: false,
            quantity: 20
        },
        {
            name: "Bounty 5",
            description: "Text description for bounty 5...",
            award: 6,
            imageUrl: "https://hackernoon.com/hn-images/1*I3PvdUSaBNnw4qg_JQqirg.png",
            isActive: false,
            isInfinite: false,
            quantity: 20
        },
        {
            name: "Bounty 6",
            description: "Text description for bounty 6...",
            award: 6,
            imageUrl: "https://hackernoon.com/hn-images/1*I3PvdUSaBNnw4qg_JQqirg.png",
            isActive: false,
            isInfinite: false,
            quantity: 20
        },
        {
            name: "Bounty 7",
            description: "Text description for bounty 7...",
            award: 6,
            imageUrl: "https://hackernoon.com/hn-images/1*I3PvdUSaBNnw4qg_JQqirg.png",
            isActive: false,
            isInfinite: false,
            quantity: 20
        }
        ,
        {
            name: "Bounty 8",
            description: "Text description for bounty 8...",
            award: 6,
            imageUrl: "https://hackernoon.com/hn-images/1*I3PvdUSaBNnw4qg_JQqirg.png",
            isActive: false,
            isInfinite: false,
            quantity: 20
        }
    ])

    const [ activeBountiesList, setActiveBountiesList ] = useState([])
    const [ inactiveBountiesList, setInactiveBountiesList ] = useState([])
    useEffect(() => {
        setActiveBountiesList(bountiesList.filter((bounty) => (bounty.isActive)));
        setInactiveBountiesList(bountiesList.filter((bounty) => (!bounty.isActive)));
    }, [bountiesList]);

    return (
        <>
        <div>
            {user ?
                <div className="bounties" style={{"fontSize" : "15px"}}>
                    <Tabs defaultActiveKey="active">
                        <Tab eventKey="active" title="Active">
                            <UnitsList unitsList={activeBountiesList} unitType='bounty' />
                        </Tab>
                        <Tab eventKey="delisted" title="Delisted">
                            <UnitsList unitsList={inactiveBountiesList} unitType='bounty' />
                        </Tab>
                        <Tab eventKey="new" title="New">
                            <div className="bounties-new">
                                
                            </div>
                        </Tab>
                        <Tab eventKey="pending" title="Pending">
                            <BountiesPending />
                        </Tab>
                    </Tabs>
                </div>
                : loading 
                    ? <CircularProgress color={'primary'} />
                    : <><h3 style={{ "marginTop": "25px"}}>Log in to continue</h3> 
                    <div onClick={login} className="loginBtn">Log in</div></>
            }
        </div>
        </>
    )
}

export default BountiesBody