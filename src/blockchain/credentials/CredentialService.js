const MnemonicGenerator = require("/src/blockchain/credentials/MnemonicGenerator");
const EthWallet = require('/src/blockchain/credentials/protocols/EthWallet');
const Erc20Wallet = require('/src/blockchain/credentials/protocols/Erc20Wallet');
const BtcWallet = require('/src/blockchain/credentials/protocols/BtcWallet');
const BnbWallet = require('/src/blockchain/credentials/protocols/BnbWallet');
const LtcWallet = require('/src/blockchain/credentials/protocols/LtcWallet');

const Validator = require("/src/validators/Validator");
class CredentialsService {
    constructor(app) {
        this.app = app;
        this.validator = new Validator();
        this.generator = new MnemonicGenerator();
        let eth = new EthWallet();
        let erc20 = new Erc20Wallet();
        let btc = new BtcWallet();
        let bnb = new BnbWallet();
        let ltc = new LtcWallet();
        this.mnemonic = "";
        this.protocols = {
            BTC:btc,
            ETH:eth,
            ERC20:erc20,
            BNB:bnb,
            LTC:ltc
        }
    }

    _getActiveProtocol(){
        return this.protocols[this.app.getCurrency()];
    }
    generateMnemonic(){
        return this.generator.generateMnemonic();
    }

    _setMnemonic(mnemonic){
        this.validator.validateString(mnemonic);
        this.mnemonic = mnemonic;
    }
    _getMnemonic(){
        return this.mnemonic;
    }
    importMnemonic(mnemonic){
        this._setMnemonic(mnemonic);
    }


    getAddress(){
        return new Promise(async(resolve,reject)=>{
            try {
                return resolve(
                    this._getActiveProtocol().provideAddress(
                        this._getMnemonic()));
            } catch (e) {
                return reject(e);
            }
        })
    }


    getPrivateKey(){
        return new Promise(async(resolve,reject)=>{
            try {
                return resolve(this._getActiveProtocol().providePrivateKey(this._getMnemonic()));
            } catch (e) {
                return reject(e);
            }
        })
    }
}

module.exports = CredentialsService;