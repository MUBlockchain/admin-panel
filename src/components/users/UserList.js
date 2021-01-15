import React, { useState } from 'react'
import { Row, Col, Modal, Button } from 'react-bootstrap'
import { Paper, InputBase } from '@material-ui/core'
import './users.css'

const UserItem = (props) => {

    const [ showModal, setShowModal ] = useState(false);

    const promoteUser = () => {
        props.promoteUser()
        setShowModal(false)
    }

    return (
        <>
            <Paper className="user-card">
                <img className="user-image" src={props.user.imageUrl} alt={props.user.name + "'s Profile Picture"}/>
                <span className="user-display-name">{props.user.name}</span>
                {props.user.isAdministrator
                  ? null
                  : <Button variant="danger" size="small" onClick={() => setShowModal(true)}>
                        Promote
                    </Button>
                }
            </Paper>
            <Modal
                show={showModal} onHide={e => setShowModal(false)}
                {...props} size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Body style={{'margin': '0px 10px 0px 10px'}}>
                    <Row style={{"justifyContent": "space-around"}}>
                        <Col sm={3}>
                            <Row>
                                <img className="user-image" src={props.user.imageUrl} alt={props.user.name + "'s Profile Picture"}/>
                            </Row>
                        </Col>
                        <Col sm={7}>
                            <Row>
                                Are you sure you want to grant {props.user.name} administrative access?
                            </Row>
                            <Row style={{"justifyContent": "space-around", "marginTop": "5px"}}>
                                <Button variant="success" size="small" onClick={promoteUser}>
                                    Confirm
                                </Button>
                                <Button variant="secondary" size="small" onClick={() => setShowModal(false)}>
                                    Cancel
                                </Button>
                            </Row>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    )
}

const UserList = (props) => {

    const [ currentSearch, setCurrentSearch ] = useState("");
    const users = props.users.filter(u => u.name.toLowerCase().includes(currentSearch.toLowerCase()))
                             .map((u, i) => <UserItem user={u} key={i}/>)

    return (
        <div>
            <Row style={{"justifyContent": "center", "paddingBottom" : "10px"}}>
                <Col sm={6}>
                    <Paper>
                        <Row>
                            <Col sm={12}>
                                <InputBase
                                    placeholder="Search by name..."
                                    inputProps={{ 'aria-label': 'search by title' }}
                                    onChange={e => setCurrentSearch(e.target.value)}
                                    style={{ "fontSize": "15px", "fontFamily": "georgia, serif", "width": "95%" }} />
                            </Col>
                        </Row>
                    </Paper>
                </Col>
            </Row>
            <div className="users-display-area">
                {users}
            </div>
        </div>

    )
}

export default UserList
