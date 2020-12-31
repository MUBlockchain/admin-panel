import React, { useEffect, useState } from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import { Paper, InputBase } from '@material-ui/core';

const RequestList = (props) => {
    const [ clickedIndex, setClickedIndex ] = useState(-1);

    useEffect(
        () => setClickedIndex(-1), [props.requestsList]
    );

    return <>
        {props.requestsList.map((r, i) => 
            <Paper style={{ "backgroundColor": "whitesmoke", 
                "margin": "5px 7px 5px 7px",
                "paddingTop": "10px",
                "minHeight": "55px"
            }}
                onClick={() => {
                    setClickedIndex(i);
                    props.onRequestClick(r);
                }}
                className={i === clickedIndex ? "request-clicked" : "request-item"}
            >
                {r.user} requests {r.bounty?.name}
            </Paper>)}
    </>
}

const RequestDetails = (props) => {
    return <>
        {props.request ? 
            <div style={{ "margin": "20px", "fontSize": "15px" }}>
                <h4 style={{"fontFamily": "georgia, serif"}}>{props.request?.bounty?.name}</h4>
                <Row>
                    <b>Reward:</b> <span style={{"paddingLeft": "7px"}}>{props.request?.bounty?.award} tokens</span>
                </Row>
                <Row>
                    <b>Quantity remaining: </b> <span style={{"paddingLeft": "7px"}}>{props.request?.bounty?.remaining}</span> 
                </Row>
                <Row>
                    <i>Award <b>{props.request?.bounty?.name}</b> to <b>{props.request?.user}</b>?</i>
                </Row>
                <Row style={{ "margin": "20px"}}>
                    <Col sm={6}>
                        <Button variant="success">
                            Accept
                        </Button>
                    </Col>
                    <Col sm={6}>
                        <Button variant="danger">
                            Reject
                        </Button>
                    </Col>
                </Row>
            </div>
            : 
            <div style={{ "margin": "20px"}}>
                <i>Select a pending bounty request to approve or reject</i>
            </div>}
    </>
}

const BountiesPending = () => {
    const [ requestsList, setRequestsList ] = useState([]);
    const [ requestsToShow, setRequestsToShow ] = useState([]);
    const [ currentRequest, setCurrentRequest ] = useState(null);

    useEffect(() => {
        setRequestsList([
            {
                user: "User 1",
                bounty: {
                    name: "Bounty 8",
                    description: "Text description for bounty 8...",
                    award: 6,
                    imageUrl: "https://hackernoon.com/hn-images/1*I3PvdUSaBNnw4qg_JQqirg.png",
                    isActive: false,
                    isInfinite: false,
                    quantity: 20,
                    remaining: 10
                }
            },
            {
                user: "User 2",
                bounty: {
                    name: "Bounty 8",
                    description: "Text description for bounty 8...",
                    award: 6,
                    imageUrl: "https://hackernoon.com/hn-images/1*I3PvdUSaBNnw4qg_JQqirg.png",
                    isActive: false,
                    isInfinite: false,
                    quantity: 20,
                    remaining: 9
                }
            },
            {
                user: "User 1",
                bounty: {
                    name: "Bounty 5",
                    description: "Text description for bounty 5...",
                    award: 6,
                    imageUrl: "https://hackernoon.com/hn-images/1*I3PvdUSaBNnw4qg_JQqirg.png",
                    isActive: false,
                    isInfinite: false,
                    quantity: 20,
                    remaining: 5
                }
            },
            {
                user: "User 3",
                bounty: {
                    name: "Conference Bounty 3",
                    description: "Text description for bounty 3...",
                    award: 2,
                    imageUrl: "https://www.swissdigitalhealth.com/wp-content/uploads/2017/03/conference-showcase-SDH.jpg",
                    isActive: true,
                    isInfinite: true,
                    quantity: null,
                    remaining: 6
                }
            },
            {
                user: "User 2",
                bounty: {
                    name: "Org Bounty 2",
                    description: "Text description for bounty 2...",
                    award: 8,
                    imageUrl: "https://cdn-images-1.medium.com/max/1200/1*7OArorLfbNT9lmqrijahjg.png",
                    isActive: true,
                    isInfinite: false,
                    quantity: 5,
                    remaining: 1
                }
            }
        ])
        setRequestsToShow([
            {
                user: "User 1",
                bounty: {
                    name: "Bounty 8",
                    description: "Text description for bounty 8...",
                    award: 6,
                    imageUrl: "https://hackernoon.com/hn-images/1*I3PvdUSaBNnw4qg_JQqirg.png",
                    isActive: false,
                    isInfinite: false,
                    quantity: 20,
                    remaining: 10
                }
            },
            {
                user: "User 2",
                bounty: {
                    name: "Bounty 8",
                    description: "Text description for bounty 8...",
                    award: 6,
                    imageUrl: "https://hackernoon.com/hn-images/1*I3PvdUSaBNnw4qg_JQqirg.png",
                    isActive: false,
                    isInfinite: false,
                    quantity: 20,
                    remaining: 9
                }
            },
            {
                user: "User 1",
                bounty: {
                    name: "Bounty 5",
                    description: "Text description for bounty 5...",
                    award: 6,
                    imageUrl: "https://hackernoon.com/hn-images/1*I3PvdUSaBNnw4qg_JQqirg.png",
                    isActive: false,
                    isInfinite: false,
                    quantity: 20,
                    remaining: 5
                }
            },
            {
                user: "User 3",
                bounty: {
                    name: "Conference Bounty 3",
                    description: "Text description for bounty 3...",
                    award: 2,
                    imageUrl: "https://www.swissdigitalhealth.com/wp-content/uploads/2017/03/conference-showcase-SDH.jpg",
                    isActive: true,
                    isInfinite: true,
                    quantity: null,
                    remaining: 6
                }
            },
            {
                user: "User 2",
                bounty: {
                    name: "Org Bounty 2",
                    description: "Text description for bounty 2...",
                    award: 8,
                    imageUrl: "https://cdn-images-1.medium.com/max/1200/1*7OArorLfbNT9lmqrijahjg.png",
                    isActive: true,
                    isInfinite: false,
                    quantity: 5,
                    remaining: 1
                }
            }
        ]);
    }, []); 

    const handleRequestClick = (req) => {
        setCurrentRequest(req);
    }

    return <>
        <Paper component="form" style={{ "margin": "auto", "marginTop":"15px", "width": "80%" }}>
            <Row>
                <InputBase
                    placeholder="Search by username..."
                    inputProps={{ 'aria-label': 'search by title' }}
                    style={{ "fontSize": "15px", "fontFamily": "georgia, serif", "width": "90%", 
                    "paddingLeft": "5px", "margin": "0px 20px 0px 20px" }} 
                    onChange={(event) => {
                        setRequestsToShow(
                            requestsList.filter(
                                r => r.user.toLowerCase().includes(event.target.value.toLowerCase())
                            )
                        );
                    }}/>
            </Row>
        </Paper>

        <div style={{"margin": "20px"}}>
            <Row>
                <Col md={5} style={{"maxHeight": "250px"}} className="overflow-auto">
                    <RequestList requestsList={requestsToShow} onRequestClick={handleRequestClick}/>
                </Col>
                <Col md={7} style={{"maxHeight": "250px"}}>
                    <RequestDetails request={currentRequest} />
                </Col>
            </Row>
        </div>
    </>
}

export default BountiesPending