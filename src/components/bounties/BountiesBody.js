import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../auth'
import { Tabs, Tab } from 'react-bootstrap'
import LinearLoadingComponent from '../misc/Loading'
import UnitsList from '../units/UnitsList'
import BountiesPending from './BountiesPending'
import ItemCreate from '../items/ItemCreate'
import toast from 'react-hot-toast'
import { useBounties } from '../hooks'
import './bounties.css'

const BountiesTabs = (props) => {
    const [ submitting, setSubmitting ] = useState(false) 
    const [ activeBounties, setActiveBounties ] = useState([])
    const [ inactiveBounties, setInactiveBounties ] = useState([])
    const [ listChanged, setListChanged ] = useState(false)
    const [ loading, setLoading ] = useState(true)

    const getBountiesList = async () => {
        if (!props.contract) return
        setLoading(true)
        const res = await props.contract.getBounties()
        let active = []
        let inactive = []

        for (let i = 0; i < res._bountyNonce.toNumber(); i++) {
            console.log('test')
            const bounty = {
                id: (i + 1),
                name: res._titles[i],
                description: res._descriptions[i],
                award: res._awards[i].toNumber(),
                imageUrl: res._imageUrls[i],
                isActive: res._actives[i],
                isInfinite: res._infinites[i],
                quantity: res._quantities[i].toNumber(),
                isManual: res._manuals[i]
            }
            if (bounty.isActive) {
                active.push(bounty)
            } else {
                inactive.push(bounty)
            }
        }

        setActiveBounties(active)
        setInactiveBounties(inactive)
        setLoading(false)
    }

    const registerBounty = async (data) => {
        if (!props.contract) return
        if (!data.name || !data.award) {
            toast.error(<span>Please fill in bounty name and/or award</span>, {duration: 5000})
            setSubmitting(false)
            return
        }

        toast.promise(
            props.contract.addBounty(
                data.name,
                data.description,
                data.imageUrl,
                Number(data.award),
                data.isInfinite,
                Number(data.quantity),
                data.manual,
                data.tweetId
            ), 
            {
                loading: () => {
                    setSubmitting(true)
                    return (<span>Adding bounty...</span>)
                },
                success: m => {
                    setSubmitting(false)
                    window.location.reload()
                    return (<span>Bounty added!</span>)
                },
                error: e => {
                    console.error(e)
                    setSubmitting(false)
                    return (<span>Oops! An error has occurred...</span>)
                }
            }
        )
    }

    const requestDelist = async (id, pos) => {
        if (!props.contract) return
        toast.promise(
            props.contract.delistBounty(id), 
            {
                loading: <span>Delisting bounty...</span>,
                success: m => {
                    console.log('LINE 79', m)
                    activeBounties[pos].isActive = false
                    inactiveBounties.push(activeBounties.splice(pos, 1)[0])
                    setListChanged(!listChanged)
                    return (<span>Bounty delisted!</span>)
                },
                error: e => {
                    console.error(e)
                    return (<span>Oops! An error has occurred...</span>)
                }
            }
        )
    }

    const delistBounty = (id, pos) => {
        requestDelist(id, pos)
    }

    useEffect(() => {
        if(activeBounties.length || inactiveBounties.length) return
        getBountiesList()
    }, [props.contract])

    return (
        
        <>
            {loading 
                ? <LinearLoadingComponent text="Fetching data..." />
                : <Tabs defaultActiveKey="active">
                    <Tab eventKey="active" title="Active">
                        <UnitsList key={listChanged} unitsList={activeBounties} 
                            unitType='bounty' handleDelist={delistBounty} />
                    </Tab>
                    <Tab eventKey="inactive" title="Inactive">
                        <UnitsList key={listChanged} unitsList={inactiveBounties} 
                            unitType='bounty' />
                    </Tab>
                    <Tab eventKey="new" title="Create">
                        <ItemCreate registerItem={registerBounty} isBounty={true} loading={submitting}/>
                    </Tab>
                    <Tab eventKey="pending" title="Pending">
                        <BountiesPending contract={props.contract}/>
                    </Tab>
                </Tabs>
            }
        </>
    )
}

const BountiesBody = () => {
    const { user, loading, login } = useContext(UserContext)
    const bountiesContract = useBounties()

    return (
        <>
        <div>
            {user && user.isAdmin
                ? <div className="bounties" style={{"fontSize" : "15px"}}>
                    <BountiesTabs contract={bountiesContract} />
                </div>
                : loading 
                    ? <LinearLoadingComponent text="Logging you in..." />
                    : <><h3 style={{ "marginTop": "25px"}}>Log in to continue</h3> 
                    <div onClick={login} className="loginBtn">LOG IN</div></>
            }
        </div>
        </>
    )
}

export default BountiesBody