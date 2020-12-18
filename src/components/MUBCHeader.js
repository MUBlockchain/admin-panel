import React, { useContext } from 'react'
import Particles from "react-particles-js"
import { AffiliateContext } from './affiliate'

const MUBCHeader = () => {

    const { affiliateColor, setAffiliateColor } = useContext(AffiliateContext)

    return (
        <div id="mubc-header" style={{backgroundColor: affiliateColor}}>
            <div id="mubc-header__contributors">
                <div className="mubc-header__contributor-container">
                    <div className="mubc-header__contributor-background">
                    </div>
                    <div className="mubc-header__torus-contributor" onMouseOver={() => setAffiliateColor('#c70000')}>
                        <a href="https://mubc.io/">
                            <img className="mubc-logo-top" src={require('../images/MUBCLogoImage.png')} alt="Logo" />
                            <br />
                            <img className="mubc-logo-bottom" src={require('../images/MUBCLogoText.png')} alt="Logo" />
                        </a>
                    </div>
                </div>
            </div>
            <Particles className="mubc-header__background" height="125px" params={{
                particles: {
                    "number": {
                        "value": 40
                    },
                    "size": {
                        "value": 3
                    }
                }
            }} />
        </div>
    )
}
export default MUBCHeader