import React, { useEffect, useState } from 'react'
import DirectWebSdk from '@toruslabs/torus-direct-web-sdk'
import { RelayProvider } from '@opengsn/gsn'
import { ethers as Ethers } from 'ethers'
const PaymasterContract = require('../abi/OrgTokenPaymaster.json')
const Web3HttpProvider = require( 'web3-providers-http')

const DEFAULT_AUTH_CONTEXT = {
  user: null,
  loading: null,
  login: null,
  logout: null,
  ethers: null,
  gsnProvider: null
}

export let UserContext = React.createContext(DEFAULT_AUTH_CONTEXT)

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null)
  const [ethers, setEthers] = useState(null)
  const [loading, setLoading] = useState(false)
  const [gsnProvider, setGSNProvider] = useState(null)

  useEffect(() => {
    // Checks to see if items exist in local storage. If so then the session is restored
    if (localStorage.getItem('Public Address') !== null) restoreSession()
  }, [])

  // Creates a torus DirectAuth object
  const torus = new DirectWebSdk({
    baseUrl: `${process.env.GATSBY_BASE_URL}/serviceworker/`,
    enableLogging: true
  })

  // Cretate a torus object
  const initTorus = async () => {
    await torus.init()
  }

  /**
   *  Create a logged in session by storing user information inside of local storage.
   *
   * @param {*} info User info object
   */
  const createSession = info => {
    const { publicAddress, privateKey, name, profileImage, idToken } = info
    localStorage.setItem('Public Address', publicAddress)
    localStorage.setItem('Private Key', privateKey)
    localStorage.setItem('Name', name)
    localStorage.setItem('Profile Image', profileImage)
    localStorage.setItem('Id Token', idToken)
  }

  /**
   *  Restores a previous logged in state from local storage.
   */
  const restoreSession = async () => {
    const publicAddress = localStorage.getItem('Public Address')
    const privateKey = localStorage.getItem('Private Key')
    const name = localStorage.getItem('Name')
    const profileImage = localStorage.getItem('Profile Image')
    const idToken = localStorage.getItem('Id Token')

    // Set user from data retrived from local storage
    setUser({ publicAddress, privateKey, name, profileImage, idToken })

    // Validate id token and logout if invalid, done after setUser to prevent flashing of log in screen
    const resp = await fetch(`${process.env.API_BASE_URL}/api/signin?token=${idToken}`)
    if(!resp.ok) {
        logout()
        return
    }

    const {wallet, etherProvider} = await makeProviders(privateKey)
    setEthers(wallet)
    setGSNProvider(etherProvider)
  }

  /**
   *  Terminates the sessions by clearing local storage and setting the use to null
   */
  const logout = () => {
    localStorage.removeItem('Public Address')
    localStorage.removeItem('Private Key')
    localStorage.removeItem('Name')
    localStorage.removeItem('Profile Image')
    localStorage.removeItem('Id Token')
    setUser(null)
  }

  /**
   *  Logs a user in by getting info via TorusDirectAuth
   */
  const login = async () => {
      try {
        // Initialize torus object
        await initTorus()
        // Set loading state to true to indicate to user that login is processing
        setLoading(true)

        // Retrieve user information from torus object
        const userInfo = await torus.triggerLogin({
          verifier: process.env.GATSBY_VERIFIER_NAME,
          typeOfLogin: 'google',
          clientId: process.env.GATSBY_GOOGLE_CLIENT_ID
        })

        const { publicAddress, privateKey, userInfo: info } = userInfo
        const { name, profileImage, idToken } = info
        setUser({ publicAddress, privateKey, name, profileImage, idToken })
        const { wallet, etherProvider } = await makeProviders(privateKey)
        setEthers(wallet)
        setGSNProvider(etherProvider)
        createSession({ publicAddress, privateKey, name, profileImage, idToken })
      } catch (error) {
        console.log(error)
      } finally {
        // Indicate processing has ended and get rid of spinner animation
        setLoading(false)
      }
  }

  /**
   * Create ethers wallets with valid providers for rinkeby and rinkeby gsn
   * @param {string} privateKey private key signing transactions for the provider
   * @return {object} wallet plain ethers provider
   * @return {object} gsnWallet ethers enabled to use Gas Station Network
   * @dev HOW TO ACCESS PAYMASTER ADDRESS FML
   */
  const makeProviders = async (privateKey) => {
    // Must specify what network you are using in your .env file
    const provider = Ethers.getDefaultProvider(process.env.GATSBY_ETH_PROVIDER)
    const chainID = provider._network.chainId
    const web3Provider = new Web3HttpProvider(`https://${process.env.GATSBY_ETH_PROVIDER}.infura.io/v3/${process.env.GATSBY_INFURA}`)
    const wallet = new Ethers.Wallet(`0x${privateKey}`, provider)
    const paymasterAddress = PaymasterContract.networks[chainID].address
    const config = {
	    paymasterAddress
    }
    const gsnProvider = await RelayProvider.newProvider({ provider: web3Provider, config }).init()
    // Initialize provider before continuing
    gsnProvider.addAccount({address: wallet.address, privateKey: Buffer.from(privateKey, 'hex') })

    // Now create a provider that will pay for our contract's transactions
    const etherProvider = new Ethers.providers.Web3Provider(gsnProvider)
    return { wallet, etherProvider }
  }

  // Pass relevant information into context to be spread across app
  const ctx = { user, loading, login, logout, ethers, gsnProvider }
  return <UserContext.Provider value={ctx}>{children}</UserContext.Provider>
}
