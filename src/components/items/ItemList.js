import React, { useState } from 'react'
import { Row, Col, Modal } from 'react-bootstrap'
import { Paper, Button, InputBase } from '@material-ui/core'
import './items.css'

const ItemItem = (props) => {

    const [ showModal, setShowModal ] = useState(false);

    return (
        <>
            <Paper className="item-card" onClick={e => setShowModal(true)}>
                <img className="item-image" src={props.item.imageURL} alt={props.item.name + "'s Profile Picture"}/>
                <span className="item-display-name">{props.item.name}</span>
            </Paper>
            <Modal
                show={showModal} onHide={e => setShowModal(false)}
                {...props} size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    {props.item.name}
                </Modal.Header>
                <Modal.Body style={{'margin': '0px 10px 0px 10px'}}>
                    <Row style={{"justifyContent": "space-around"}}>
                        <Col sm={6}>
                            <Row style={{"justifyContent": "center"}}>
                                <img className="item-image" src={props.item.imageURL} alt={props.item.name + "'s Profile Picture"}/>
                            </Row>
                        </Col>
                        <Col sm={6}>
                            <Row>
                                Cost: {props.item.cost}
                            </Row>
                            <Row>
                                Quantity: {props.item.isInfinite ? "Infinite" : props.item.quantity}
                            </Row>
                            <Row style={{"marginTop": "5px"}}>
                                <Button style={{"backgroundColor": "#1e1", "color": "#eee"}} variant="contained" size="small" onClick={() => setShowModal(false)}>
                                    {props.item.isActive ? "Delist Item" : "Relist Item"}
                                </Button>

                            </Row>
                        </Col>
                    </Row>
                    <Row style={{"marginTop": "5px"}}>
                        <Col>
                            {props.item.description}
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    )
}

const ItemList = (props) => {

    const [ currentSearch, setCurrentSearch ] = useState("");
    const users = props.items.filter(i => i.name.toLowerCase().includes(currentSearch.toLowerCase()))
                             .map((i, index) => <ItemItem item={i} key={index}/>)

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
            <div className="items-display-area">
                {users}
            </div>
        </div>

    )
}

export default ItemList
