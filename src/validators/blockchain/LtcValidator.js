const BtcValidator= require('./BtcValidator');
const LTC_SYMBOL = "LTC";
class LtcValidator extends BtcValidator{
    validateAddress(address){
        return this.validateString(address,"LTC ADDRESS");
    }
    getSymbol(){
        return LTC_SYMBOL;
    }
}

module.exports = LtcValidator;