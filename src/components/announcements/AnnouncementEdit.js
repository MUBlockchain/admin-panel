import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import toast, { Toaster } from 'react-hot-toast'
import $ from 'jquery'
import { useAnnouncements } from '../hooks'

const AnnouncementEdit = () => {
    const contract = useAnnouncements();
    const [ pin, setPin ] = useState(false);
    const [ loading, setLoading ] = useState(false);

    const addAnnouncement = async () => {
        if (!contract) return;
        setLoading(true);
        try {
            const loadingToast = toast.loading(
                <div>Processing...</div>
            );
            const tx = await contract.addAnnouncement($('#announcementTitle').val(), 
                $('#announcementDesc').val(), pin);
            const receipt = await tx.wait();
            toast.remove(loadingToast);
            toast.success(<div>Announcement added!</div>, {
                duration: 5000
            });
        } catch (error) {
            toast.error(<div>An error has occurred. Please try again later.</div>);
            console.log(error);
        } finally {
            setLoading(false);
            $('#announcementForm').get(0).reset();
            window.location.reload();
        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        addAnnouncement();
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
                        type='submit'
                        disabled={loading}>
                        Release Announcement
                    </Button>
                </div>
            </Form>
            <Toaster
                position="top-right"
                toastOptions={{
                    loading: {
                        iconTheme: {
                            primary: '#06AA2F',
                        }
                    }
                }}
            />
        </>
    )
}

export default AnnouncementEdit