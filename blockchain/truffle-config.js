const HDWalletProvider = require('@truffle/hdwallet-provider')
require('dotenv').config()
module.exports = {

  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*'
    },
    ropsten: {
      provider: () => {
        return new HDWalletProvider(process.env.MNEMONIC, `https://ropsten.infura.io/v3/${process.env.INFURA}`)
      },
      network_id: '3',
    },
    rinkeby: {
      provider: () => {
        return new HDWalletProvider(process.env.MNEMONIC, `https://rinkeby.infura.io/v3/${process.env.INFURA}`)
      },
      network_id: '4',
    },
    kovan: {
      provider: () => {
        return new HDWalletProvider(process.env.MNEMONIC, `https://kovan.infura.io/v3/${process.env.INFURA}`)
      },
      network_id: '42',
    },
  },
}
