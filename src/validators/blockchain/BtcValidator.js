const wallet_validator= require('wallet-address-validator');
const AbstractCurrencyValidator= require('./AbstractCurrencyValidator');
const SYMBOL_BTC = 'BTC';
class BtcValidator extends AbstractCurrencyValidator{
    validateAddress(address){
        // console.log("btcValidator validateAddress"+address)
        if(!wallet_validator.validate(address, this.getSymbol(), "both")){
            throw new Error('Invalid Bitcoin Address');
        }
    }

    getSymbol() {
        return SYMBOL_BTC;
    }
}

module.exports = BtcValidator;