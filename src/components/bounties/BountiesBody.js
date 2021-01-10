import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../auth'
import { Tabs, Tab } from 'react-bootstrap'
import CircularProgress from '@material-ui/core/CircularProgress'
import UnitsList from '../units/UnitsList'
import BountiesPending from './BountiesPending'
import ItemCreate from '../items/ItemCreate'
import toast, { Toaster } from 'react-hot-toast'
import { useBounties } from '../hooks';
import './bounties.css'

const BountiesTabs = (props) => {
    const [ submitting, setSubmitting ] = useState(false); 
    const [ activeBounties, setActiveBounties ] = useState([]);
    const [ inactiveBounties, setInactiveBounties ] = useState([]);
    const [ listChanged, setListChanged ] = useState(false);

    const getBountiesList = async () => {
        if (!props.contract) return;
        const res = await props.contract.getBounties();
        let active = [];
        let inactive = [];

        for (let i = 0; i < res._bountyNonce.toNumber(); i++) {
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
            };
            if (bounty.isActive) {
                active.push(bounty);
            } else {
                inactive.push(bounty);
            }
        }

        setActiveBounties(active);
        setInactiveBounties(inactive);
    }

    const registerBounty = async (data) => {
        if (!props.contract) return;
        setSubmitting(true);
        try {
            const loadingToast = toast.loading(
                <span>Processing...</span>
            );
            if (!data.name || !data.award) {
                toast.remove(loadingToast);
                toast.error(<span>Please enter bounty title and/or award.</span>);
                setSubmitting(false);
                return;
            }
            const tx = await props.contract.addBounty(
                data.name,
                data.description,
                data.imageUrl,
                Number(data.award),
                data.isInfinite,
                Number(data.quantity),
                data.manual,
                data.tweetId
            );
            const receipt = await tx.wait();
            toast.remove(loadingToast);
            toast.success(<span>Bounty successfully added!</span>, {
                duration: 5000
            });
            
            activeBounties.push(data);
        } catch (error) {
            toast.error(<span>An error has occurred. Please try again later.</span>);
            console.log(error);
        } finally {
            setSubmitting(false);
            window.location.reload();
        }
    }

    const requestDelist = async (id) => {
        if (!props.contract) return;
        const tx = await props.contract.delistBounty(id);
        console.log(tx);
    }

    const delistBounty = (id, pos) => {
        if (!props.contract) return;
        requestDelist(id);
        activeBounties[pos].isActive = false;
        inactiveBounties.push(activeBounties.splice(pos, 1)[0]);
        setListChanged(!listChanged);
    }

    useEffect(() => {
        getBountiesList();
    }, []);

    return (
        <Tabs defaultActiveKey="active">
            <Tab eventKey="active" title="Active">
                <UnitsList key={listChanged} unitsList={activeBounties} unitType='bounty' handleDelist={delistBounty}/>
            </Tab>
            <Tab eventKey="inactive" title="Inactive">
                <UnitsList key={listChanged} unitsList={inactiveBounties} unitType='bounty' />
            </Tab>
            <Tab eventKey="new" title="Create">
                <ItemCreate registerItem={registerBounty} isBounty={true} loading={submitting}/>
            </Tab>
            <Tab eventKey="pending" title="Pending">
                <BountiesPending />
            </Tab>
        </Tabs>
    )
}

const BountiesBody = () => {
    const { user, loading, login } = useContext(UserContext);
    const bountiesContract = useBounties();

    return (
        <>
        <div>
            {user ?
                <div className="bounties" style={{"fontSize" : "15px"}}>
                    <BountiesTabs contract={bountiesContract} />
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
                </div>
                : loading 
                    ? <CircularProgress color={'primary'} />
                    : <><h3 style={{ "marginTop": "25px"}}>Log in to continue</h3> 
                    <div onClick={login} className="loginBtn">LOG IN</div></>
            }
        </div>
        </>
    )
}

export default BountiesBody