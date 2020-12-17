import { useContext } from "react"
import { UserContext } from "./auth"
import {ethers as Ethers } from 'ethers'
const SimpleStorage = require('../../blockchain/build/contracts/SimpleStorage.json')

/**
 *  Custom hook that connects to an instance of the simple storage contract
 */
export const useContract = () => {
    const { user, ethers } = useContext(UserContext)
    if(!user || !ethers) return null

    // Determine Ethereum network to connect to
    const chainId = ethers.provider._network.chainId
    // Connect to deployed contract, if it exists
    const address = SimpleStorage.networks[chainId].address
    // Connect to the contract instance and return so that it is accessible throughout app
    return new Ethers.Contract(address, SimpleStorage.abi, ethers)
}
