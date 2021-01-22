import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Button, TextField, Switch, FormControlLabel } from '@material-ui/core'
import { ImageUploadButton, UploadToAws, ExpandAwsUrl } from './../image-upload-utils'

const ItemCreate = (props) => {

    const imageRef = React.createRef()

    const [ isInfinite, setIsInfinite ] = useState(false)
    const toggleInfinite = () => setIsInfinite(!isInfinite)

    const [ quantity, setQuantity ] = useState("")
    const handleQuantityChange = e => {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '')
        setQuantity(Number(onlyNums).toString())
    }

    const [ cost, setCost ] = useState("")
    const handleCostChange = e => {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '')
        setCost(Number(onlyNums).toString())
    }

    const [ imageSrc, setImageSrc ] = useState("")
    const [ selectedFile, setSelectedFile ] = useState()
    const [ isFilePicked, setIsFilePicked ] = useState(false)
    const handleSelectedFileChange = file => {
        setSelectedFile(file)
        setIsFilePicked(true)
    }

    const [ title, setTitle ] = useState("")
    const [ description, setDescription ] = useState("")

    const submitItem = (e) => {
        UploadToAws(selectedFile, url => {
            console.log(url)
            console.log(title, ExpandAwsUrl(url), quantity, isInfinite, cost, description)
            let data = {
                name: title,
                imageURL: ExpandAwsUrl(url),
                imageUrl: ExpandAwsUrl(url),
                isInfinite: isInfinite,
                quantity: isInfinite ? 1 : quantity,
                description: description,
                isActive: true
            }
            if (!props.isBounty) {
                data.cost = cost
            } else {
                data.award = cost
                data.tweetId = -1
                data.manual = true
            }

            props.registerItem(data)
        })
    }

    const imgStyle = {
        "display": "block",
        "width": "96px",
        "height": "96px",
        "marginLeft": "auto",
        "marginRight": "auto",
        "marginTop": "7px",
        "marginBottom": "14px",
        "borderRadius": "3px"
    }

    return (
        <><Container fluid="sm">
            <Row style={{"justifyContent": "center", "textAlign": "left"}}>
                <Col md={2}>
                    <Row>
                        <Col>
                            <img style={imgStyle} src={imageSrc} ref={imageRef} />
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{"textAlign": "center"}}>
                            <ImageUploadButton onChange={handleSelectedFileChange} imageRef={imageRef} />
                        </Col>
                    </Row>
                </Col>
                <Col md={5}>
                    <Row>
                        <Col>
                            <TextField label="Title" value={title} variant="outlined" margin="dense" fullWidth onChange={e => setTitle(e.target.value)} required />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="auto" style={{"paddingTop": "8px"}}>
                            <FormControlLabel
                                control={<Switch onChange={toggleInfinite}/>}
                                label="Infinite"
                            />
                        </Col>
                        <Col>
                            <TextField label="Quantity" variant="outlined" margin="dense" fullWidth shrink="true"
                                disabled={isInfinite}
                                onChange={handleQuantityChange}
                                value={isInfinite ? "N/A" : quantity}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <TextField label={props.isBounty ? "Award" : "Cost"} variant="outlined" margin="dense" fullWidth shrink="true"
                                onChange={handleCostChange}
                                value={cost}
                                required/>
                        </Col>
                    </Row>
                </Col>
            </Row>
            {props.isBounty &&
            <Row style={{"justifyContent": "center", "textAlign": "left"}}>
                <Col md={7}>
                    <span>Award trigger: None</span>
                </Col>
            </Row>}
            <Row style={{"justifyContent": "center"}}>
                <Col md={7}>
                    <TextField label="Description" value={description} variant="outlined" multiline fullWidth margin="normal" rows={2} onChange={e => setDescription(e.target.value)} />
                </Col>
            </Row>
            <Row style={{"justifyContent": "center"}}>
                <Col md={7}>
                    <Button 
                        disabled={props.loading} 
                        variant="contained" 
                        style={{"backgroundColor": "#d11", "color": "#fff"}} 
                        onClick={submitItem}
                    >
                        Submit
                    </Button>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default ItemCreate
