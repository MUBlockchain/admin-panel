import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './auth'
import { AffiliateContext } from './affiliate'
import CircularProgress from '@material-ui/core/CircularProgress'
import Login from './login'
import { useContract } from './hooks'
import '../components/app.css'

const IndexBody = () => {
    const [val, setVal] = useState()
    const [txLoading, setTxLoading] = useState(false)
    const { user, loading } = useContext(UserContext)
    const { affiliateColor } = useContext(AffiliateContext)
    const contract = useContract()

    /**
     *  Retrieves the original value stored on the blockchain
     */
    const getValue = async () => {
        if (!contract) return
        const tx = await contract.get()
        const value = parseInt(Number(tx._hex), 10)
        setVal(value)
    }

    /**
     * Sets a new value to be stored in the smart contract
     * 
     * @param {number} value The new value to be stored on the smart contract
     */
    const setValue = async (value) => {
        if (!contract) return
        // Creates loading animation to indicate transaction is processing
        setTxLoading(true)
        const tx = await contract.set(value)
        const receipt = await tx.wait()
        getValue()
        setTxLoading(false)
    }

    /**
     * Handles change from input submission
     * 
     * @param {*} event Value submission event
     */
    const handleChange = event => {
        event.preventDefault()
        setValue(event.target.number.value)
    }

    /**
     * Gets the value everytime the page rerenders or a new contract instance is loaded
     */
    useEffect(() => {
        getValue()
    }, [contract])

    return (
        <div className="IndexBody">
            <h1>Torus DirectAuth Implementation</h1>
            {loading && <CircularProgress color={'primary'} />}
            {user ?
                <div>
                    <div>
                        <div className="user-info">
                            <h3>Name: {user.name}</h3>
                            <img src={user.profileImage} alt="Profile photo" />
                        </div>
                        <p>Ethereum Address: {user.publicAddress}</p>
                    </div>
                    {contract &&
                        <div className="chain-values">
                            <div>
                                
                                <form id="val-form" onSubmit={handleChange}>
                                {!txLoading ? 
                                <button className="button" form="val-form" style={{backgroundColor: affiliateColor}}>Set Value</button> :
                                <button className="button" style={{backgroundColor: affiliateColor}}>Loading...</button> }
                                <input type="text" name="number" placeholder="Enter a value..." />
                                </form>
                            </div>
                            <p>Value = {val}</p>
                        </div>
                    }</div> : !loading && <h2>Please Log In To Use</h2>}
                    <Login />
        </div>
    )
}

export default IndexBody