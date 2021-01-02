import React, { useContext, useState } from 'react'
import { UserContext } from '../auth'
import { Tabs, Tab } from 'react-bootstrap'
import ItemCreate from './ItemCreate'
import ItemList from './ItemList'
import UnitsList from '../units/UnitsList'

const ItemsBody = () => {
    const { user, loading, login } = useContext(UserContext)
    const [ itemList, setItemList ] = useState([{
        name: "Trip to Conference",
        imageURL: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fmubc.io%2Fstatic%2FMUBC%2520Logo%2520Big%2520Letters%2520(vector)%2520copy%25202-315c175009080bf630ce3841d97fb6c3.png&f=1&nofb=1",
        imageUrl: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fmubc.io%2Fstatic%2FMUBC%2520Logo%2520Big%2520Letters%2520(vector)%2520copy%25202-315c175009080bf630ce3841d97fb6c3.png&f=1&nofb=1",
        cost: 100,
        isInfinite: false,
        quantity: 5,
        description: "All expenses paid trip to regional Blockchain Conference.",
        isActive: true,
        id: 0
    },
    {
        name: "Meet with Professional",
        imageURL: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpreview.free3d.com%2Fimg%2F2014%2F05%2F1688666439835190495%2F9vdaf5x3-900.jpg&f=1&nofb=1",
        imageUrl: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpreview.free3d.com%2Fimg%2F2014%2F05%2F1688666439835190495%2F9vdaf5x3-900.jpg&f=1&nofb=1",
        cost: 10,
        isInfinite: true,
        quantity: -1,
        description: "As said by the name.",
        isActive: false,
        id: 1
    }])

    const [ key, setKey ] = useState("active")

    const registerItem = item => {
        item.id = itemList.length
        const tempList = itemList.concat([item])
        setItemList(tempList)

        // TODO: Register new item with contract or whatever controls it and navigate *after* confirmation of register

        setTimeout(() => setKey("active"), 1000)
        console.log(tempList)
    }

    return (
        <div style={{"padding": "10px"}}>
            {user ?
                <div style={{"fontSize" : "15px"}}>
                    <Tabs activeKey={key} onSelect={k => setKey(k)}>
                        <Tab eventKey="active" title="Active">
                            <div style={{"margin": "20px"}}>
                                <UnitsList unitsList={itemList.filter(i => i.isActive)} unitType="item" />
                            </div>
                        </Tab>
                        <Tab eventKey="inactive" title="Inactive">
                            <div style={{"margin": "20px"}}>
                                <UnitsList unitsList={itemList.filter(i => !i.isActive)} unitType="item" />
                            </div>
                        </Tab>
                        <Tab eventKey="create" title="Create">
                            <div style={{"margin": "20px"}}>
                                <ItemCreate registerItem={registerItem}/>
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

export default ItemsBody
