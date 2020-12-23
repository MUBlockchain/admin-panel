import React, { useContext, useState } from 'react'
import { UserContext } from '../auth'
import { Tabs, Tab } from 'react-bootstrap'
import ItemCreate from './ItemCreate'

const ItemsBody = () => {
    const { user, loading, login } = useContext(UserContext)
    const [ itemList, setItemList ] = useState([{
        name: "Trip to Conference",
        imageURL: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fmubc.io%2Fstatic%2FMUBC%2520Logo%2520Big%2520Letters%2520(vector)%2520copy%25202-315c175009080bf630ce3841d97fb6c3.png&f=1&nofb=1",
        cost: 100,
        isInfinite: false,
        quantity: 5,
        description: "All expenses paid trip to Blockchain Conference.",
        isActive: true
    },
    {
        name: "Meet with The Pope",
        imageURL: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.Xunt9y_K6FXbF6Lr3H8qjQHaHZ%26pid%3DApi&f=1",
        cost: 10,
        isInfinite: true,
        quantity: -1,
        description: "As said by the name.",
        isActive: false
    }])

    const [ key, setKey ] = useState("active")

    const registerItem = item => {
        const tempList = itemList.concat([item])
        setItemList(tempList)

        // TODO: Register new item with contract or whatever controls it and navigate *after* confirmation of register

        setTimeout(() => setKey("active"), 1000)
        console.log(tempList)
    }

    return (
        <div>
            {user ?
                <div style={{"fontSize" : "15px"}}>
                    <Tabs activeKey={key} onSelect={k => setKey(k)}>
                        <Tab eventKey="active" title="Active">
                            <div style={{"margin": "20px"}}>
                                Active Items
                            </div>
                        </Tab>
                        <Tab eventKey="inactive" title="Inactive">
                            <div style={{"margin": "20px"}}>
                                Inactive Items
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
