import React, { useContext, useEffect, useState } from 'react'
import { Row, Col, Modal } from 'react-bootstrap'
import { Paper, IconButton } from '@material-ui/core'
import { AiOutlinePushpin, AiFillPushpin } from 'react-icons/ai';

const AnnouncementItem = (props) => {
    const [show, setShow] = useState(false);
    const [ isPinned, setPin ] = useState(props.announcement.isPinned)
    const handleOpen = () => setShow(true);
    const handleClose = () => setShow(false);
    const togglePin = () => {
        setPin(!isPinned);
    }

    return (
        <>
            <div style={{ "margin": "5px" }} onClick={handleOpen}>
            <Paper style={{ "backgroundColor": "whitesmoke" }} className="announcement-item">
                <Row>
                    <Col sm={1}>
                    {isPinned && <div style={{'textAlign': 'left', 'margin-left': '15px'}}><AiFillPushpin style={{'color': 'red'}}/></div>}
                    </Col>
                    <Col sm={11}>
                        <div>
                            <div className="title">
                                {props.announcement?.title}
                            </div>
                            <div className="datePosted">Posted on: {props.announcement?.datePosted}</div>
                        </div>
                        
                    </Col>
                </Row>
            </Paper>

            </div>
            <Modal
                show={show} onHide={handleClose}
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{props.announcement?.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{'margin': '0px 10px 0px 10px'}}>
                    <Row>
                        <Col sm={2}>
                            <Row>
                                <IconButton onClick={togglePin}>{isPinned 
                                    ? <AiFillPushpin style={{'color': 'red'}}/>
                                    : <AiOutlinePushpin />
                                }
                                </IconButton>
                            </Row>
                        </Col>
                        <Col sm={10}>{props.announcement?.content}</Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <span className='datePosted'>Posted on: {props.announcement?.datePosted}</span>
                </Modal.Footer>
            </Modal>
        </>
    )
}

const AnnouncementList = (props) => {
    const displayAnnouncement = props.announcementList?.map((announcement) =>
        <AnnouncementItem announcement={announcement} />)

    return (
        <>{displayAnnouncement}</>
    )
}
export default AnnouncementList