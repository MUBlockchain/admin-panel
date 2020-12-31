import React, { useState } from 'react'
import { Row, Col, Modal, Card, Image, Button } from 'react-bootstrap'
import { Paper, InputBase } from '@material-ui/core';
import './unit.css'

const Unit = (props) => {
    const [show, setShow] = useState(false);
    const handleOpen = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <>
            <Card onClick={handleOpen}>
                <Card.Img variant="top" src={props.data?.imageUrl} height="200px"/>
                <Card.Body>
                    <Card.Title className="unitTitle">{props.data?.name}</Card.Title>
                </Card.Body>
            </Card>
            <Modal
                show={show} onHide={handleClose}
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{props.data?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{'margin': '0px 30px 0px 30px'}}>
                    <Row>
                        <Col sm={4}>
                            <Row>
                                <Image src={props.data?.imageUrl}/>
                            </Row>
                        </Col>
                        <Col sm={8} style={{"paddingLeft": "30px"}}>
                            <div>
                                {props.type == 'bounty' ? 'Award: ' : 'Cost: '}
                                {props.type == 'bounty' ? props.data?.award : props.data?.cost}
                            </div>
                            <div>Quantity: {props.data?.isInfinite ? 'Infinite' : props.data?.quantity}</div>
                            {props.data?.isActive 
                                ? <Button variant="success" style={{"marginTop": "15px"}}>Delist</Button>
                                : <Button variant="secondary" style={{"marginTop": "15px"}} disabled>Delisted</Button>}
                        </Col>
                    </Row>
                    <Row>
                        {props.data?.description}
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    )
}

const UnitsList = (props) => {
    const [ listToDisplay, setListToDisplay ] = useState(props.unitsList);
    const displayList = listToDisplay.map((_, i) => 
            {   
                return i % 4 == 0 && 
                <Row key={i} className="unitRow">
                    {listToDisplay.slice(i, i + 4 < listToDisplay.length ? i + 4 : listToDisplay.length).map((unit, i) => (
                        <Col key={i} md={3}><Unit data={unit} type={props.unitType || 'bounty'} /></Col>
                    ))}
                </Row>
            }
        )

    return (
        <>
            <Paper component="form" style={{ "margin": "auto", "marginTop":"15px", "width": "80%" }}>
                <Row>
                    <InputBase
                        placeholder="Search by name..."
                        inputProps={{ 'aria-label': 'search by title' }}
                        onChange={e => setListToDisplay(props.unitsList
                            .filter(
                                u => u.name.toLowerCase().includes(e.target.value.toLowerCase()))
                        )}
                        style={{ "fontSize": "15px", "fontFamily": "georgia, serif", "width": "90%", 
                        "paddingLeft": "5px", "margin": "0px 20px 0px 20px" }} />
                </Row>
            </Paper>
            <div>{displayList}</div>
        </>
    )
}

export default UnitsList