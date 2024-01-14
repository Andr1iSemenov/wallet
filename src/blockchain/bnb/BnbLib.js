const EthLib = require('/src/blockchain/eth/EthLib');
const Web3 = require("web3");
const PROVIDER_URL = process.env.BNB_PROVIDER_URL;

const GAS_LIMIT = 100000;

const buildProvider = require('../eth/ProviderBuilder')
const BnbNetworkProvider = require("../bnb/BnbNetworkHelper");

class BnbLib extends EthLib{
    constructor(app) {
        super(app);
        this.provider = buildProvider(PROVIDER_URL);
    }

    _getChainId(){
        return BnbNetworkProvider.getNetwork();
    }
}
module.exports = BnbLib;