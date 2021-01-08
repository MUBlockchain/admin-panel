import React, { useEffect, useState } from 'react'
import { Row, Col, Modal, DropdownButton, Dropdown } from 'react-bootstrap'
import { Paper, IconButton, InputBase, Grid, Tooltip, Checkbox } from '@material-ui/core'
import { AiOutlinePushpin, AiFillPushpin } from 'react-icons/ai';
import { NavigateNext, NavigateBefore, FilterListSharp } from '@material-ui/icons';
import $ from 'jquery';
import { useContract } from '../hooks';

const AnnouncementItem = (props) => {
    const [show, setShow] = useState(false);
    const handleOpen = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <>
            <div style={{ "margin": "5px" }} onClick={handleOpen}>
            <Paper style={{ "backgroundColor": "whitesmoke" }} className="announcement-item">
                <Row>
                    <Col sm={1}>
                    {props.announcement?.id === props.pin && <div style={{'textAlign': 'left', 'marginLeft': '15px'}}><AiFillPushpin style={{'color': 'red'}}/></div>}
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
                                <IconButton onClick={() => {
                                    handleClose();
                                    props.updatepin(props.announcement.id);}}
                                >{props.announcement.id === props.pin 
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

const AnnouncementList = () => {
    const contract = useContract();
    const [ pinIndex, setPinIndex ] = useState(-1);
    const [ announcementsList, setAnnouncementsList ] = useState([]);
    const [ showPinned, setShowPinned ] = useState(true);
    const [ searchKey, setSearchKey ] = useState('');
    const [ count, setCount ] = useState(0);
    const [ announcementsToShow, setAnnouncementsToShow ] = useState([]);
    const pageLimit = 5;
    const [ page, setPage ] = useState(1);
    const monthLabels = ["Jan", "Feb", "Mar", "Apr",  "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
    const getData = async () => {
        if (!contract) return;
        const data = await contract.getAnnouncements();
        if (pinIndex !== data._pinned.toNumber()) { setPinIndex(data._pinned.toNumber()); }
        let announcements = [];
        for (let i = 0; i < data._nonce.toNumber(); i++ ) {
            const time = new Date(data._timecodes[i].toNumber()*1000);
            const datePosted = `${monthLabels[time.getMonth()]} ${time.getDate()}, 
                ${time.getFullYear()} ${time.getHours()%12}:${time.getMinutes()} 
                ${time.getHours() >= 12 ? "PM" : "AM"}`;
            announcements.push({
                id: i,
                title: data._titles[i],
                content: data._bodies[i],
                datePosted: datePosted
            });
        }
        setAnnouncementsList(announcements);
        setAnnouncementsToShow(announcements);
        setCount(announcements.length);
        setPage(1);
    }

    useEffect(
        () => {
            getData();
        }, []);

    useEffect(
        () => {
            let filterAnnouncements = [];
            showPinned && pinIndex !== -1 && 
                announcementsList?.length > 0 && filterAnnouncements.push(announcementsList[pinIndex]);
            filterAnnouncements = filterAnnouncements?.concat(
                announcementsList?.filter(announcement => announcement.id !== pinIndex).reverse()
            );
            filterAnnouncements = filterAnnouncements?.filter(
                announcement => (searchKey === '' || announcement.title.toLowerCase().includes(searchKey.toLowerCase()))
            )
            setAnnouncementsToShow(filterAnnouncements);
            setCount(filterAnnouncements.length);
            setPage(1);
        }, [ showPinned, pinIndex, searchKey, announcementsList ]
    )
    const updatePin = async (newPinIndex) => {
        if (newPinIndex === pinIndex) {
            setPinIndex(-1);
        } else {
            setPinIndex(newPinIndex);
        }
        if (!contract) return;
        await contract.pinAnnouncement(newPinIndex);
    }

    const displayAnnouncement = 
        <>
            {announcementsToShow?.slice((page - 1)*pageLimit, Math.min(page*pageLimit, count)).map((announcement, index) =>
                <AnnouncementItem key={index} announcement={announcement} 
                    pin={pinIndex} updatepin={updatePin} />)}
        </>

    return (
        <>
            <Row>
                <Col sm={9}>
                    <Paper component="form" style={{"paddingRight": "0px"}}>
                        <InputBase
                            id="searchKey"
                            placeholder="Search by title..."
                            inputProps={{ 'aria-label': 'search by title' }}
                            onChange={() => {
                                setTimeout(() => {
                                    setSearchKey($('#searchKey').val());
                                }, 1000);
                            }}
                            style={{ "fontSize": "15px", "fontFamily": "georgia, serif", "width": "95%" }} />
                    </Paper>
                </Col>
                <Col sm={1} style={{"paddingLeft":"0px"}}>
                    <Tooltip title="Filter" placement="top">
                        <span><DropdownButton
                            title={<FilterListSharp style={{"fontSize": "20px"}}/>}
                            variant="secondary"
                            size="sm"
                            style={{ "margin": "0px", "padding": "0px"}}
                        >
                            <Dropdown.Item >
                            <Checkbox size="small" 
                                checked={showPinned} 
                                onClick={() => {
                                    setShowPinned(!showPinned);
                                }}>
                            </Checkbox>
                            <span>Show pinned announcements</span>
                            </Dropdown.Item>
                        </DropdownButton></span>
                    </Tooltip>
                </Col>
                <Col sm={2}>
                    <Grid>
                        <Tooltip title="Previous" placement="top">
                            <span><IconButton 
                                type="submit" 
                                aria-label="previous" 
                                size="small"
                                disabled={page <= 1}
                                onClick={() => { setPage(Math.max(page - 1, 1)); }}
                            >
                                <NavigateBefore />
                            </IconButton></span>
                        </Tooltip>
                        <span> | </span>
                        <Tooltip title="Next" placement="top">
                            <span><IconButton 
                                type="submit" 
                                aria-label="next" 
                                size="small"
                                disabled={page >= Math.ceil(count/pageLimit)}
                                onClick={() => { setPage(Math.min(page + 1, Math.ceil(count/pageLimit))); }}
                            >
                                <NavigateNext />
                            </IconButton></span>
                        </Tooltip>
                    </Grid>
                    <div style={{ "fontSize": "11px" }}>Showing {page*pageLimit < count ? pageLimit : count - (page - 1)*pageLimit}/{count} results</div>
                </Col>
            </Row>
            {displayAnnouncement}
        </>
    )
}
export default AnnouncementList