import React, { useEffect, useState } from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import { Paper, InputBase } from '@material-ui/core'
import toast, { Toaster } from 'react-hot-toast'

const RequestList = (props) => {
    const [ clickedIndex, setClickedIndex ] = useState(-1);

    useEffect(
        () => setClickedIndex(-1), [props.requestsList]
    );

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
                    setClickedIndex(i);
                    props.onRequestClick(r);
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
                            onClick={() => { props.handleAcceptReject(true, props.request?.bounty?.id); }}    
                        >
                            ACCEPT
                        </Button>
                    </Col>
                    <Col sm={6}>
                        <Button 
                            variant="danger"
                            onClick={() => { props.handleAcceptReject(false, props.request?.bounty?.id); }}    
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
    const [ requestsList, setRequestsList ] = useState([]);
    const [ requestsToShow, setRequestsToShow ] = useState([]);
    const [ currentRequest, setCurrentRequest ] = useState(null);
    const [ bountyId, setBountyId ] = useState(1);

    const getBountyReqs = async () => {
        if (!props.contract) return;
        const res = await props.contract.pendingBountyRequests(1);
        let req = [];
        for (let i = 0; i < res._nonce.toNumber(); i++) {
            req.push({
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
        setRequestsList(req);
        setRequestsToShow(req);
    }

    const handleRequestClick = (req) => {
        setCurrentRequest(req);
    }

    const handleAcceptReject = async (isAccept, bountyId) => {
        if (!props.contract) return;
        if (!bountyId) {
            console.error('No bounty Id provided');
            return
        }
        const loadingToast = toast.loading(
            <span>Processing...</span>
        );
        try {
            let tx;
            if (isAccept) {
                tx = await props.contract.approveBountyRequest(1, bountyId);
            } else {
                tx = await props.contract.rejectBountyRequest(1, bountyId);
            }
            
            const receipt = await tx.wait();
            toast.remove(loadingToast);
            toast.success(<span>Pending request {isAccept ? 'accepted' : 'rejected'}!</span>, {
                duration: 5000
            });
            setTimeout(window.location.reload, 2000);
        } catch (error) {
            toast.remove(loadingToast);
            toast.error(<span>An error has occurred. Please try again later.</span>);
            console.log(error);
        }
    }

    useEffect(() => {
        getBountyReqs();
    }, []); 

    const handleBountyApply = async () => {
        if (!props.contract) return;
        const tx = await props.contract.applyForBounty(bountyId);
        console.log(tx);
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
                                r => r.user.name.toLowerCase().includes(event.target.value.toLowerCase())
                            )
                        );
                        setCurrentRequest(null);
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
            onClick= {() => {handleBountyApply(); }}
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
        <Toaster
            position="top-right"
            toastOptions={{
                loading: {
                    iconTheme: {
                        primary: '#42ad5d',
                    }
                }
            }}
        />
    </>
}

export default BountiesPending