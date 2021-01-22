import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import toast from 'react-hot-toast'
import $ from 'jquery'

const AnnouncementEdit = ({contract}) => {
    const [ pin, setPin ] = useState(false)
    const [ loading, setLoading ] = useState(false)

    const addAnnouncement = async () => {
        if (!contract) return
        setLoading(true)
        const loadingToast = toast.loading(
            <span>Adding announcement...</span>
        )
        try {
            const tx = await contract.addAnnouncement($('#announcementTitle').val(), 
                $('#announcementDesc').val(), pin)
            const receipt = await tx.wait()

            toast.remove(loadingToast)
            toast.success(<span>Announcement added!</span>, {
                duration: 5000
            })
            $('#announcementForm').get(0).reset()
            window.location.reload()
        } catch (error) {
            toast.remove(loadingToast)
            toast.error(<span>Oops! An error has occurred...</span>,
            {
                duration: 5000
            })
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        addAnnouncement()
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
                        onClick={(event) => { setPin(event.target.checked) }}
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
        </>
    )
}

export default AnnouncementEdit