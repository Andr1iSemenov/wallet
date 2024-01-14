const LtcNetworks = require("./LtcNetworks");
const AbstractNetworkHelper = require('/src/blockchain/AbstractNetworkHelper');
class LtcNetworkHelper extends AbstractNetworkHelper{
    static getMainnet(){
        return LtcNetworks["mainnet"];
    }

    static getTestnet(){
        return LtcNetworks["mainnet"]
    }

}

module.exports = LtcNetworkHelper;