const EthLib = require("./eth/EthLib");
const Erc20Lib = require("./erc20/Erc20Lib");
const BtcLib = require('./btc/BtcLib');
const CredentialsService = require('./credentials/CredentialService')

class BlockchainService{

    constructor(app) {
        this.app = app;
        this.credentials = new CredentialsService(app);
        let eth = new EthLib(app);
        let erc20 = new Erc20Lib(app);
        let btcLib = new BtcLib(app);

        this.currencyLibraries = {
            ETH: eth,
            ERC20: erc20,
            BTC: btcLib
        }
    }

    getCurrencyLibrary() {
        return this.currencyLibraries[this.app.getCurrency()];
    }

    getAddress(){
        return new Promise(async (resolve, reject) => {
            try {
                let address = await this.getCredentials().getAddress();
                return resolve(address);
            } catch (e) {
                return reject(e);
            }
        });
    }

    getPrivateKey(){
        return new Promise(async (resolve, reject) => {
            try {
                let privKey = await this.getCredentials().getPrivateKey();
                return resolve(privKey);
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
                console.log('send currency in blockchainService service')
                let result = await this.getCurrencyLibrary().sendCurrency(receiver, amount);
                return resolve(result);
            } catch (e) {
                return reject(e);
            }
        });
    }

    getCredentials() {
        return this.credentials;
    }

    generateMnemonic() {
        return this.getCredentials().generateMnemonic();
    }

    importMnemonic(mnemonic) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await this.getCredentials().importMnemonic(mnemonic);
                return resolve(result);
            } catch (e) {
                return reject(e);
            }
        });
    }
}

module.exports = BlockchainService;