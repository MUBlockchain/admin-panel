import React, { useEffect, useState } from 'react'
import DirectWebSdk from '@toruslabs/torus-direct-web-sdk'
import { ethers as Ethers } from 'ethers'

const DEFAULT_AUTH_CONTEXT = {
  user: null,
  loading: null,
  login: null,
  logout: null,
  ethers: null
}

export let UserContext = React.createContext(DEFAULT_AUTH_CONTEXT)

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null)
  const [ethers, setEthers] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Checks to see if items exist in local storage. If so then the session is
    // restored
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
    const { publicAddress, privateKey, name, profileImage } = info
    localStorage.setItem('Public Address', publicAddress)
    localStorage.setItem('Private Key', privateKey)
    localStorage.setItem('Name', name)
    localStorage.setItem('Profile Image', profileImage)
  }

  /** 
   *  Restores a previous logged in state from local storage.
   */
  const restoreSession = () => {
    const publicAddress = localStorage.getItem('Public Address')
    const privateKey = localStorage.getItem('Private Key')
    const name = localStorage.getItem('Name')
    const profileImage = localStorage.getItem('Profile Image')

    // Set new user from data retrived from local storage
    setUser({ publicAddress, privateKey, name, profileImage })
    let provider = Ethers.getDefaultProvider(process.env.GATSBY_NETWORK)
    if (process.env.ALCHEMY_API_KEY && process.env.INFURA_API_KEY && process.env.ETHERSCAN_API_KEY) {
      console.log('Api keys provided');
      provider = Ethers.getDefaultProvider(process.env.GATSBY_NETWORK, {
        alchemy: process.env.ALCHEMY_API_KEY,
        infura: process.env.INFURA_API_KEY, 
        etherscan: process.env.ETHERSCAN_API_KEY
      })
    }

    // Create a new ethers wallet instance from data retrived from local storage
    const wallet = new Ethers.Wallet(`0x${privateKey}`, provider)
    setEthers(wallet)
  }

  /**
   *  Terminates the sessions by clearing local storage and setting the use to null
   */
  const logout = () => {
    localStorage.removeItem('Public Address')
    localStorage.removeItem('Private Key')
    localStorage.removeItem('Name')
    localStorage.removeItem('Profile Image')
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
        const { name, profileImage } = info
        setUser({ publicAddress, privateKey, name, profileImage })
        let provider = Ethers.getDefaultProvider(process.env.GATSBY_NETWORK)
        if (process.env.ALCHEMY_API_KEY && process.env.INFURA_API_KEY && process.env.ETHERSCAN_API_KEY) {
          provider = Ethers.getDefaultProvider(process.env.GATSBY_NETWORK, {
            alchemy: process.env.ALCHEMY_API_KEY,
            infura: process.env.INFURA_API_KEY, 
            etherscan: process.env.ETHERSCAN_API_KEY
          })
        }
        const wallet = new Ethers.Wallet(`0x${privateKey}`, provider)
        setEthers(wallet)
        createSession({ publicAddress, privateKey, name, profileImage })
      } catch (error) {
        console.log(error)
      } finally {
        // Indicate processing has ended and get rid of spinner animation
        setLoading(false)
      }
  }
  // Pass relevant information into context to be spread across app
  const ctx = { user, loading, login, logout, ethers }
  return <UserContext.Provider value={ctx}>{children}</UserContext.Provider>
}
