const DEFAULT_BALANCE = 1.516;
const DEFAULT_ADDRESS = "0x9dd7CA2A77704836667CD69F805052656eF3aBB3";

const EthLib = require("./eth/EthLib");
const ETH = "ETH";

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

    getBalance(){
        return new Promise(async (resolve, reject) => {
            try {
                let address = await this.getCurrencyLibrary().getAddress();
                let balance = await this.getCurrencyLibrary().getBalance(address);
                return resolve(balance);
            } catch (e) {
                return reject(e);
            }
        });
    }

    sendCurrency() {
        let currency = this.app.getCurrency();
        let amount = document.getElementById("amount").value;
        let address = document.getElementById("receiver").value;
        alert(`Sending ${amount} ${currency} to ${address}`);

        this.getCurrencyLibrary().sendCurrency(address, amount);
    }
}

module.exports = BlockchainService;