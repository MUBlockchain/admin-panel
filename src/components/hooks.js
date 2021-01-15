import { useContext } from "react"
import { UserContext } from "./auth"
import {ethers as Ethers } from 'ethers'
const Announcements = require('../abi/Announcements.json')
const Users = require('../abi/Users.json')
const Items = require('../abi/Items.json')
const Bounties = require('../abi/Bounties.json')

/**
 *  Custom hook that connects to an instance of the simple storage contract
 */
export const useAnnouncements = () => {
    const { user, ethers, gsnProvider } = useContext(UserContext)
    if(!user || !ethers) return null

    // Determine Ethereum network to connect to
    const chainId = ethers.provider._network.chainId
    // Connect to deployed contract, if it exists
    const address = Announcements.networks[chainId].address
    // Connect to the contract instance 
    const contract = new Ethers.Contract(address, Announcements.abi, ethers)
    // Enable Gas Station Network for contract instance and return object
    return contract.connect(gsnProvider.getSigner(user.publicAddress))
}

export const useUsers = () => {
    const { user, ethers, gsnProvider } = useContext(UserContext)
    if(!user || !ethers) return null

    const chainId = ethers.provider._network.chainId
    const address = Users.networks[chainId].address
    const contract = new Ethers.Contract(address, Users.abi, ethers)
    return contract.connect(gsnProvider.getSigner(user.publicAddress))
}

export const useItems = () => {
    const { user, ethers, gsnProvider } = useContext(UserContext)
    if(!user || !ethers) return null

    const chainId = ethers.provider._network.chainId
    const address = Items.networks[chainId].address
    const contract = new Ethers.Contract(address, Items.abi, ethers)
    return contract.connect(gsnProvider.getSigner(user.publicAddress))
}

export const useBounties = () => {
    const { user, ethers, gsnProvider } = useContext(UserContext)
    if(!user || !ethers) return null

    const chainId = ethers.provider._network.chainId
    const address = Bounties.networks[chainId].address
    const contract = new Ethers.Contract(address, Bounties.abi, ethers)
    let x = contract.connect(gsnProvider.getSigner(user.publicAddress))
    console.log("FLAG: ", x)
    return x
}