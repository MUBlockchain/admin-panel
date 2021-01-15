import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../auth'
import { Tabs, Tab } from 'react-bootstrap'
import ItemCreate from './ItemCreate'
import ItemList from './ItemList'
import UnitsList from '../units/UnitsList'
import { useItems } from '../hooks'
import { ExpandAwsUrl, ShortenAwsUrl } from '../image-upload-utils'

const ItemsBody = () => {
    const { user, loading, login } = useContext(UserContext)
    const itemsContract = useItems();

    const [ itemList, setItemList ] = useState([])

    const getItems = async () => {
        if (!itemsContract) return;
        const res = await itemsContract.getItems();
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
    }

    useEffect(() => {
        getItems();
    }, [ user, itemsContract ]);

    const [ key, setKey ] = useState("active")

    const addItem = async (item) => {
        const res = await itemsContract.addItem(item.name,
                                                item.description,
                                                ShortenAwsUrl(item.imageUrl),
                                                item.cost,
                                                item.isInfinite,
                                                item.quantity)

        item.id = res
        const tempItems = itemList.concat([item])
        setItemList(tempItems)

        setKey("active")
    }

    const delistItem = (id) => {
        itemsContract.delistItem(id)

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
    }

    return (
        <div style={{"padding": "10px"}}>
            {user ?
                <div style={{"fontSize" : "15px"}}>
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
                : !loading &&
                    <><h3 style={{ "marginTop": "25px"}}>Log in to continue</h3>
                    <div onClick={login} className="loginBtn">Log in</div></>
            }
        </div>
    )
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
