const BtcBlockcypherProvider = require("/src/blockchain/btc/BtcBlockcypherProvider");
const LTC = "LTC";
class LtcBlockcypherProvider extends BtcBlockcypherProvider{

    getSymbol(){
        return LTC;
    }

    _getNetworkUrl(){
        if(this.app.isProduction()){
            return "main";
        }else{
            return "main";
        }
    }
}

module.exports = LtcBlockcypherProvider;