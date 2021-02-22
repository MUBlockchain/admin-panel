import React, { useEffect, useState } from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import { Paper, InputBase } from '@material-ui/core'
import toast from 'react-hot-toast'
import LinearLoadingComponent from '../misc/Loading'

const RequestList = (props) => {
    const [ clickedIndex, setClickedIndex ] = useState(-1)

    useEffect(
        () => setClickedIndex(-1), [props.requestsList]
    )

    return <>
        {props.requestsList.map((r, i) => 
            <Paper 
                key={i}
                style={{ "backgroundColor": "whitesmoke", 
                    "margin": "5px 7px 5px 7px",
                    "paddingTop": "10px",
                    "minHeight": "55px"
                }}
                onClick={() => {
                    setClickedIndex(i)
                    props.onRequestClick(r)
                }}
                className={i === clickedIndex ? "request-clicked" : "request-item"}
            >
                <b>{r.user?.name}</b> requests <b>{r.bounty?.name}</b>
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
                    <b>Quantity remaining: </b> <span style={{"paddingLeft": "7px"}}>{props.request?.bounty?.quantity}</span> 
                </Row>
                <Row>
                    <i>Award <b>{props.request?.bounty?.name}</b> to <b>{props.request?.user?.name}</b>?</i>
                </Row>
                <Row style={{ "margin": "20px"}}>
                    <Col sm={6}>
                        <Button 
                            variant="success"
                            onClick={() => { props.handleAcceptReject(true, props.request?.bounty?.id, props.request?.pos) }}    
                        >
                            APPROVE
                        </Button>
                    </Col>
                    <Col sm={6}>
                        <Button 
                            variant="danger"
                            onClick={() => { props.handleAcceptReject(false, props.request?.bounty?.id, props.request?.pos) }}    
                        >
                            REJECT
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

const BountiesPending = (props) => {
    const [ requestsList, setRequestsList ] = useState([])
    const [ requestsToShow, setRequestsToShow ] = useState([])
    const [ currentRequest, setCurrentRequest ] = useState(null)
    const [ bountyId, setBountyId ] = useState(1)
    const [ fetching, setFetching ] = useState(true)

    const getBountyReqs = async () => {
        if (!props.contract) return
        setFetching(true)
        const res = await props.contract.pendingBountyRequests(1)
        let req = []
        for (let i = 0; i < res._nonce.toNumber(); i++) {
            req.push({
                pos: i,
                bounty: {
                    id: res._bounties[i].toNumber(),
                    name: res._bountyNames[i],
                    award: res._bountyAwards[i].toNumber(),
                    quantity: res._bountyInfinite[i] 
                        ? "Infinite"
                        : res._bountyQuantities[i].toNumber().toString()
                },
                user: {
                    name: res._userNames[i], 
                    userAddress: res._users[i]
                }
            })
        }
        setRequestsList(req)
        setRequestsToShow(req)
        setFetching(false)
    }

    const handleRequestClick = (req) => {
        setCurrentRequest(req)
    }

    const handleAcceptReject = async (isAccept, bountyId, pos) => {
        if (!props.contract) return
        if (!bountyId) {
            console.error('No bounty Id provided')
            return
        }
        toast.promise(
            isAccept ? props.contract.approveBountyRequest(1, bountyId) : props.contract.rejectBountyRequest(1, bountyId),
            {
                loading: <span>Processing...</span>,
                success: m => {
                    requestsList.splice(pos, 1)
                    setRequestsToShow(requestsToShow.filter(r => r.pos !== pos))
                    if (currentRequest.pos === pos) setCurrentRequest(null)
                    return (<span>Pending request {isAccept ? 'approved' : 'rejected'}!</span>)
                },
                error: e => {
                    console.error(e)
                    return (<span>Oops! An error has occurred...</span>)
                }
            }
        )
    }

    useEffect(() => {
        getBountyReqs()
    }, []) 

    const handleBountyApply = async () => {
        if (!props.contract) return
        const tx = await props.contract.applyForBounty(bountyId)
        console.log(tx)
    }

    return <>
        {fetching 
            ? <LinearLoadingComponent text="Fetching data..." />
            : <><Paper component="form" style={{ "margin": "auto", "marginTop":"15px", "width": "80%" }}>
                    <Row>
                        <InputBase
                            placeholder="Search by username..."
                            inputProps={{ 'aria-label': 'search by title' }}
                            style={{ "fontSize": "15px", "fontFamily": "georgia, serif", "width": "90%", 
                            "paddingLeft": "5px", "margin": "0px 20px 0px 20px" }} 
                            onChange={(event) => {
                                setRequestsToShow(
                                    requestsList.filter(
                                        r => r.user.name.toLowerCase().includes(event.target.value.toLowerCase())
                                    )
                                )
                                setCurrentRequest(null)
                            }}/>
                        
                    </Row>
                </Paper>

                <InputBase 
                    placeholder="Bounty id to apply" 
                    type="number" 
                    onChange= {(e) => {
                        setBountyId(e.target.value)
                    }} />
                <Button
                    onClick= {() => {handleBountyApply() }}
                > Apply for bounty</Button>

                <div style={{"margin": "20px"}}>
                    <Row>
                        <Col md={5} style={{"maxHeight": "250px"}} className="overflow-auto">
                            <RequestList requestsList={requestsToShow} onRequestClick={handleRequestClick}/>
                        </Col>
                        <Col md={7} style={{"maxHeight": "250px"}}>
                            <RequestDetails request={currentRequest} handleAcceptReject={handleAcceptReject}/>
                        </Col>
                    </Row>
                </div>
            </>
        }
    </>
}

export default BountiesPending