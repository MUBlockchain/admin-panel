import React, { useState } from 'react'

const DEFAULT_AFFILIATE_CONTEXT = {
    affiliateColor: null,
    setAffiliateColor: null
  }
  
  export let AffiliateContext = React.createContext(DEFAULT_AFFILIATE_CONTEXT)

  /**
   * A context that changes the color scheme throughout the app based on which affiliate company
   * 
   * @param {*} children Children inside of this context 
   */
  export default function AffiliateContextProvider({ children }) {
    const [affiliateColor, setAffiliateColor] = useState('#c70000')

    const ctx = { affiliateColor, setAffiliateColor }
    return <AffiliateContext.Provider value={ctx}>{children}</AffiliateContext.Provider>
  }