//let PROVIDER_URL = process.env.ETH_PROVIDER_URL;
const PROVIDER_URL = "https://sepolia.infura.io/v3/c7177d980081401881fa31dca0f65baa";// TODO via env
const DEFAULT_ADDRESS = "0x9dd7CA2A77704836667CD69F805052656eF3aBB3";
let GWEI = 10**9;
let GAS_PRICE = 70 * GWEI;
let GAS_LIMIT = 21000;

const Web3 = require('web3');
const EthConverter = require('/src/helpers/EthConverter');
const Validator = require('/src/validators/blockchain/EthValidator.js');


class EthLib{
    constructor(app) {
        this.provider = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL));
        this.converter = new EthConverter();
        this.validator = new Validator();
        this.app = app;
    }

    _getChainId(){
        return 11155111;
    }

    getAddress(){
        return new Promise(async(resolve, reject)=>{
            try{
                return resolve(DEFAULT_ADDRESS);
            }catch (e){
                return reject(e);
            }
        })
    }

    getBalance(address){
        return new Promise(async(resolve, reject)=>{
            try{
                this.validator.validateAddress(address);
                let balance =await this.provider.eth.getBalance(address);
                balance = this.converter.toDecimals(balance);
                return resolve(balance);
            }catch (e){
                return reject(e);
            }
        })
    }

    sendCurrency(to,amount){
        return new Promise(async(resolve, reject)=>{
            try{
                this.validator.validateAddress(to,"Tx Receiver");
                this.validator.validateNumber(amount,"sendCurrency amount");
                alert("Transactions are disabled");
                return reject();
            } catch (e){
                return reject(e);
            }
        });
    }
}

module.exports = EthLib;