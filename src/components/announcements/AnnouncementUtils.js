import React, { useContext, useEffect, useState } from 'react'
import { Row, Col, DropdownButton, Dropdown } from 'react-bootstrap'
import { Search, NavigateNext, NavigateBefore, FilterListSharp } from '@material-ui/icons';
import { Paper, IconButton, InputBase, 
    Grid, Tooltip, FormControlLabel, FormGroup,
    Checkbox } from '@material-ui/core';
import './announcementsBody.css'


const AnnouncementUtils = () => {
    const [ showPinned, setShowPinned ] = useState(true)
    const handleChange = () => {
        setShowPinned(!showPinned)
    }

    return (
        <Row>
            <Col sm={9}>
                <Paper component="form" style={{"paddingRight": "0px"}}>
                    <Row>
                        <Col sm={11}>
                            <InputBase
                                placeholder="Search by title..."
                                inputProps={{ 'aria-label': 'search by title' }}
                                style={{ "fontSize": "15px", "fontFamily": "georgia, serif" }} />
                        </Col>
                        <Col sm={1}>
                            <Tooltip title="Search" placement="top">
                                <IconButton
                                    type="submit"
                                    aria-label="search"
                                    size="small">
                                    <Search />
                                </IconButton>
                            </Tooltip>
                        </Col>
                    </Row>
                </Paper>
            </Col>
            <Col sm={1} style={{"paddingLeft":"0px"}}>
                <DropdownButton
                    eventKey={3}
                    title={<FilterListSharp style={{"fontSize": "20px"}}/>}
                    variant="secondary"
                    size="sm"
                    style={{ "margin": "0px", "padding": "0px"}}
                >
                    <Dropdown.Item >
                       <Checkbox size="small" checked={showPinned} onClick={handleChange}></Checkbox>
                       <span>Show pinned announcements</span>
                    </Dropdown.Item>
                </DropdownButton>
            </Col>
            <Col sm={2}>
                <Grid>
                    <Tooltip title="Previous" placement="top">
                        <IconButton type="submit" aria-label="previous" size="small">
                            <NavigateBefore />
                        </IconButton>
                    </Tooltip>
                    <span> | </span>
                    <Tooltip title="Next" placement="top">
                        <IconButton type="submit" aria-label="next" size="small">
                            <NavigateNext />
                        </IconButton>
                    </Tooltip>
                </Grid>
                <div style={{ "fontSize": "11px" }}>Showing 2/X results</div>
            </Col>
        </Row>
    )

}

export default AnnouncementUtils