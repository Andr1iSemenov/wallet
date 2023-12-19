const EthLib = require("./eth/EthLib");

class BlockchainService{

    constructor(app) {
        this.app = app;
        let eth = new EthLib(app);

        this.currencyLibraries = {
            ETH: eth
        }
    }

    getCurrencyLibrary() {
        return this.currencyLibraries[this.app.getCurrency()];
    }

    getAddress(){
        return new Promise(async (resolve, reject) => {
            try {
                let address = await this.getCurrencyLibrary().getAddress();
                return resolve(address);
            } catch (e) {
                return reject(e);
            }
        });
    }

    getCurrentBalance(){
        return new Promise(async (resolve, reject) => {
            try {
                let address = await this.getCurrencyLibrary().getAddress();
                let balance = await this.getCurrencyLibrary().getCurrentBalance(address);
                return resolve(balance);
            } catch (e) {
                return reject(e);
            }
        });
    }

    sendCurrency(receiver, amount) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log('send currency in bc service')
                let result = await this.getCurrencyLibrary().sendCurrency(receiver, amount);
                return resolve(result);
            } catch (e) {
                return reject(e);
            }
        });
    }
}

module.exports = BlockchainService;