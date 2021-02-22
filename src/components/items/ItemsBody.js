import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../auth'
import { Tabs, Tab } from 'react-bootstrap'
import ItemCreate from './ItemCreate'
import UnitsList from '../units/UnitsList'
import LinearLoadingComponent from '../misc/Loading'
import { useItems } from '../hooks'
import { ExpandAwsUrl, ShortenAwsUrl } from '../image-upload-utils'
import toast from 'react-hot-toast'


const ItemList = (props) => {
    const [ fetchingData, setFetchingData ] = useState(true);
    const [ itemList, setItemList ] = useState([])

    const getItems = async () => {
        if (!props.contract) return;
        setFetchingData(true);
        const res = await props.contract.getItems();
        const tempItems = [];

        const len = parseInt(res._itemNonce._hex);
        for(let i = 0; i < len; i++) {
            tempItems.push(new Item(res._titles[i],
                                    res._descriptions[i],
                                    ExpandAwsUrl(res._imageUrls[i]),
                                    parseInt(res._costs[i]._hex),
                                    res._infinites[i],
                                    parseInt(res._quantities[i]._hex),
                                    res._actives[i],
                                    i + 1)); // contract item ids start at 1
        }

        setItemList(tempItems);
        setFetchingData(false);
    }

    useEffect(() => {
        getItems();
    }, [props.contract]);

    const [ key, setKey ] = useState("active")

    const addItem = async (item) => {
        toast.promise(
            props.contract.addItem(item.name,
                item.description,
                ShortenAwsUrl(item.imageUrl),
                item.cost,
                item.isInfinite,
                item.quantity),
            {
                loading: <span>Adding item...</span>,
                success: m => {
                    window.location.reload()
                    return (<span>Item added!</span>)
                },
                error: e => {
                    console.error(e)
                    return (<span>Oops! An error has occurred...</span>)
                }
            }
        )
        // item.id = res
        // console.log('ADD ITEM LINE 53', res)
        // const tempItems = itemList.concat([item])
        // setItemList(tempItems)
        
    }

    const delistItem = (id) => {
        toast.promise(
            props.contract.delistItem(id),
            {
                loading: <span>Delisting item...</span>,
                success: m => {
                    // just incase reality breaks and the id does not line up with the index
                    const index = itemList.findIndex(i => i.id == id);
                    const tempItems = itemList.concat([]);
                    const item = itemList[index];
                    tempItems[index] = new Item(item.name,
                                                item.description,
                                                item.imageUrl,
                                                item.cost,
                                                item.isInfinite,
                                                item.quantity,
                                                false,
                                                item.id)
                    setItemList(tempItems);
                    return (<span>Item delisted!</span>)
                },
                error: e => {
                    console.error(e)
                    return (<span>Oops! An error has occurred...</span>)
                }
            }
        )
    }

    return (
        <div style={{"padding": "10px"}}>
            {fetchingData 
                ? <LinearLoadingComponent text="Fetching data..." />
                : <div style={{"fontSize" : "15px"}}>
                    <Tabs activeKey={key} onSelect={k => setKey(k)}>
                        <Tab eventKey="active" title="Active">
                            <div style={{"margin": "20px"}}>
                                <UnitsList unitsList={itemList.filter(i => i.isActive)} unitType="item" handleDelist={delistItem}/>
                            </div>
                        </Tab>
                        <Tab eventKey="inactive" title="Inactive">
                            <div style={{"margin": "20px"}}>
                                <UnitsList unitsList={itemList.filter(i => !i.isActive)} unitType="item" />
                            </div>
                        </Tab>
                        <Tab eventKey="create" title="Create">
                            <div style={{"margin": "20px"}}>
                                <ItemCreate registerItem={addItem}/>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            }
        </div>
    )
}

const ItemsBody = () => {
    const { user, loading, login } = useContext(UserContext)
    const itemsContract = useItems();
    
    return <>
        { user && user.isAdmin
            ? <ItemList contract={itemsContract}/>
            : loading 
                ? <LinearLoadingComponent text="Logging you in..." />
                : <><h3 style={{ "marginTop": "25px"}}>Log in to continue</h3>
                <div onClick={login} className="loginBtn">LOG IN</div></>
        }
        
    </>
}

class Item {
    constructor(title, description, imageUrl, cost, infinite, quantity, active, id) {
        this.name = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.cost = cost;
        this.isInfinite = infinite;
        this.quantity = quantity;
        this.isActive = active;
        this.id = id;
    }
}

export default ItemsBody
