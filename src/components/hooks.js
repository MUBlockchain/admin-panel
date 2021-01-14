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
    const { user, ethers } = useContext(UserContext)
    if(!user || !ethers) return null

    // Determine Ethereum network to connect to
    const chainId = ethers.provider._network.chainId
    // Connect to deployed contract, if it exists
    const address = Announcements.networks[chainId].address
    // Connect to the contract instance and return so that it is accessible throughout app
    return new Ethers.Contract(address, Announcements.abi, ethers)
}

export const useUsers = () => {
    const { user, ethers } = useContext(UserContext)
    if(!user || !ethers) return null

    const chainId = ethers.provider._network.chainId
    const address = Users.networks[chainId].address
    return new Ethers.Contract(address, Users.abi, ethers)
}

export const useItems = () => {
    const { user, ethers } = useContext(UserContext)
    if(!user || !ethers) return null

    const chainId = ethers.provider._network.chainId
    const address = Items.networks[chainId].address
    return new Ethers.Contract(address, Items.abi, ethers)
}

export const useBounties = () => {
    const { user, ethers } = useContext(UserContext)
    if(!user || !ethers) return null

    const chainId = ethers.provider._network.chainId
    const address = Bounties.networks[chainId].address
    return new Ethers.Contract(address, Bounties.abi, ethers)
}