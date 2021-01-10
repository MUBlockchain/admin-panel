import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Button, TextField, Switch, FormControlLabel } from '@material-ui/core'

const ItemCreate = (props) => {

    const [ isInfinite, setIsInfinite ] = useState(false);
    const toggleInfinite = () => setIsInfinite(!isInfinite)

    const [ quantity, setQuantity ] = useState("");
    const handleQuantityChange = e => {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        setQuantity(Number(onlyNums).toString());
    }

    const [ cost, setCost ] = useState("");
    const handleCostChange = e => {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        setCost(Number(onlyNums).toString());
    }

    const [ imageSrc, setImageSrc ] = useState("")
    const [ selectedFile, setSelectedFile ] = useState()
    const [ isFilePicked, setIsFilePicked ] = useState(false)
    const handleSelectedFileChange = e => {
        setSelectedFile(e.target.files[0])
        setIsFilePicked(true)
        setImageSrc(URL.createObjectURL(e.target.files[0]))
    }

    const [ title, setTitle ] = useState("")
    const [ description, setDescription ] = useState("")

    const resetForm = () => {
        setQuantity("");
        setCost("");
        setImageSrc("");
        setTitle("");
        setDescription("");
    }

    const submitItem = e => {
        console.log(title, imageSrc, quantity, isInfinite, cost, description);
        let data = {
            name: title,
            imageURL: imageSrc || "https://pbs.twimg.com/profile_images/1083095475123879936/6lceQdX6_400x400.jpg",
            imageUrl: imageSrc || "https://pbs.twimg.com/profile_images/1083095475123879936/6lceQdX6_400x400.jpg",
            isInfinite: isInfinite,
            quantity: isInfinite ? 1 : quantity,
            description: description,
            isActive: true
        }
        if (!props.isBounty) {
            data.cost = cost;
        } else {
            data.award = cost;
            data.tweetId = -1;
            data.manual = true;
        }
        props.registerItem(data);
        resetForm();
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
        <Container fluid="sm">
            <Row style={{"justifyContent": "center", "textAlign": "left"}}>
                <Col md={2}>
                    <Row>
                        <Col>
                            <img style={imgStyle} src={imageSrc} />
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{"textAlign": "center"}}>
                            <input
                                accept="image/*"
                                style={{"display": "none"}}
                                id="contained-button-file"
                                type="file"
                                onChange={handleSelectedFileChange}
                            />
                            <label htmlFor="contained-button-file">
                                <Button variant="outlined" style={{"color": "#d11", "borderColor": "#d11"}} component="span">
                                    Upload
                                </Button>
                            </label>
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
                            <TextField label="Quantity" variant="outlined" margin="dense" fullWidth shrink
                                disabled={isInfinite}
                                onChange={handleQuantityChange}
                                value={isInfinite ? "N/A" : quantity}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <TextField label={props.isBounty ? "Award" : "Cost"} variant="outlined" margin="dense" fullWidth shrink
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
    )
}

export default ItemCreate
