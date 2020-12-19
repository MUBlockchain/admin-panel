import React, { useContext, useEffect, useState } from 'react'
import { Row, Col, Modal } from 'react-bootstrap'
import { Paper, Divider } from '@material-ui/core'
import './announcementsBody.css'

const AnnouncementItem = (props) => {
    const [show, setShow] = useState(false);
    const handleOpen = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <>
            <div style={{ "margin": "5px" }} onClick={handleOpen}>
                <Row>
                    <Col sm={12}>
                        <Paper style={{ "backgroundColor": "whitesmoke" }} className="announcement-item">
                            <div>
                                <div className="title">{props.announcement.title}</div>
                                <div className="datePosted">Posted on: {props.announcement.datePosted}</div>
                            </div>
                        </Paper>
                    </Col>
                </Row>

            </div>
            <Modal
                show={show} onHide={handleClose}
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    
                    <Modal.Title>{props.announcement.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    Well just footer
            </Modal.Footer>
            </Modal>
        </>
    )
}

const AnnouncementList = (props) => {
    const displayAnnouncement = props.announcementList.map((announcement) =>
        <AnnouncementItem announcement={announcement} />)

    return (
        <>{displayAnnouncement}</>
    )
}
export default AnnouncementList