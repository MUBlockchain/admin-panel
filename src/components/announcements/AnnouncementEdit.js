import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import $ from 'jquery'
import { useAnnouncements } from '../hooks'

const AnnouncementEdit = () => {
    const contract = useAnnouncements();
    const [ pin, setPin ] = useState(false);
    const [ open, setOpen ] = useState(false);
    const addAnnouncement = async () => {
        const response = await contract.addAnnouncement($('#announcementTitle').val(), 
            $('#announcementDesc').val(), pin);
        return response;
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!contract) return;
        addAnnouncement().then(res => {
            $('#announcementForm').get(0).reset();
            setOpen(true);
        }).catch(err => console.log(err));
    }
    
    return (
        <>
            <Form onSubmit={handleSubmit} id="announcementForm">
                <h5 >New Announcement</h5>
                <Form.Group controlId="announcementTitle">
                    <Form.Label>Announcement Title</Form.Label>
                    <Form.Control type="text" placeholder="Announcement title" required/>
                </Form.Group>
                <Form.Group controlId="announcementDesc">
                    <Form.Label>Announcement Description</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Announcement description"/>
                </Form.Group>
                <Form.Group controlId="annoucementPin">
                    <Form.Check 
                        type="checkbox" 
                        label="Pin announcement" 
                        onClick={(event) => { setPin(event.target.checked); }}
                    />
                </Form.Group>
                <div style={{'textAlign': 'right'}}>
                    <Button variant="danger" 
                        style={{'fontSize': 'medium'}}
                        type='submit'>
                        Release Announcement
                    </Button>
                </div>
            </Form>
            <Snackbar 
                open={open} 
                autoHideDuration={2000} 
                anchorOrigin={{vertical: "bottom", horizontal: "center"}}
                onClose={() => { setOpen(false); }}
                message="Announcement successfully created!"
            >
            </Snackbar>
        </>
    )
}

export default AnnouncementEdit