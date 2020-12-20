import React, { useContext, useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const AnnouncementEdit = (props) => {

    return (
        <>
            
            <Form>
                <h5 >New Announcement</h5>
                <Form.Group controlId="announcementForm.announcementTitle">
                    <Form.Label>Announcement Title</Form.Label>
                    <Form.Control type="text" placeholder="Announcement title"/>
                </Form.Group>
                <Form.Group controlId="announcementForm.announcementDesc">
                    <Form.Label>Announcement Description</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Announcement description"/>
                </Form.Group>
                <div style={{'textAlign': 'right'}}>
                    <Button variant="danger" 
                        style={{'fontSize': 'medium'}}
                        type='submit'>
                        Release Announcement
                    </Button>
                </div>
            </Form>
        </>
    )
}

export default AnnouncementEdit