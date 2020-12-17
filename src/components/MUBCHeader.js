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
                <div className="mubc-header__contributor-container">
                    <div className="mubc-header__contributor-background">
                    </div>
                    <div className="mubc-header__torus-contributor" onMouseOver={() => setAffiliateColor('#650CB2')}>
                        <a href="https://www.midwestblockchain.org/">
                            <img className="mubc-header__contributor-image mbc-image" src={'https://static.wixstatic.com/media/351bdf_de5fb3ad922e4221adb1dcf39624278b~mv2.png/v1/crop/x_98,y_28,w_971,h_508/fill/w_278,h_146,al_c,q_85,usm_0.66_1.00_0.01/mbc%20logo%20vector.webp'} alt="MBC" />
                        </a>
                    </div>
                </div>
                <div className="mubc-header__contributor-container">
                    <div className="mubc-header__contributor-background">
                    </div>
                    <div className="mubc-header__torus-contributor" onMouseOver={() => setAffiliateColor('#2F79C4')}>
                        <a href="https://tor.us/">
                            <img className="mubc-header__contributor-image torus-image" src={'https://cdn-images-1.medium.com/max/802/1*uSvRRM76BPyin8Zz5ut4Hw@2x.png'} alt="Torus" />
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