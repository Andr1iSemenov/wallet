const PROVIDER_URL = process.env.ETH_PROVIDER_URL;

const Transaction = require('ethereumjs-tx');
let GWEI = 10**9;
let GAS_PRICE = 50 * GWEI;
let GAS_LIMIT = 21000;

const Web3 = require('web3');
const EthConverter = require('/src/helpers/EthConverter');
const Validator = require('/src/validators/blockchain/EthValidator.js');

const AbstractCurrencyLib = require('/src/blockchain/AbstractCurrencyLib')
const {add} = require("lodash/math");
const buildProvider = require('../eth/ProviderBuilder');
const EthNetworkProvider = require('./EthNetworkHelper')

console.log('BTC_WIF: ', process.env.BTC_WIF)
console.log('NODE_ENV: ', process.env.NODE_ENV == 'production')
console.log('NODE_ENV: ', process.env.NODE_ENV )
console.log('test: ', process.env.ERC20_CONTRACT_ADDRESS)

class EthLib extends AbstractCurrencyLib{
    constructor(app) {
        let provider = buildProvider(PROVIDER_URL);
        let converter = new EthConverter();
        let validator = new Validator();

        super(app, provider, validator, converter)
    }

    _getChainId(){
        return EthNetworkProvider.getNetwork();
    }

    // getAddress(){
    //     return new Promise(async(resolve, reject)=>{
    //         try{
    //             return resolve(DEFAULT_ADDRESS);
    //         }catch (e){
    //             return reject(e);
    //         }
    //     })
    // }

    getBalance(address){
        return new Promise(async(resolve, reject)=>{
            try{
                this.validator.validateAddress(address);
                let balance = await this.provider.eth.getBalance(address);
                balance = this.converter.toDecimals(balance);
                return resolve(balance);
            }catch (e){
                return reject(e);
            }
        })
    }

    // getPrivateKey(){
    //     return new Promise(async(resolve, reject)=>{
    //         try{
    //             return resolve(PRIVATE_KEY);
    //         }catch (e){
    //             return reject(e);
    //         }
    //     })
    // }

    // getAddress(){
    //     return new Promise(async(resolve, reject)=>{
    //         try{
    //             let address = this.app.blockchainService.getAddress();
    //             return resolve(address);
    //         }catch (e){
    //             return reject(e);
    //         }
    //     })
    // }
    //
    // getPrivateKey(){
    //     return new Promise(async(resolve, reject)=>{
    //         try{
    //             let privKey = this.app.blockchainService.getPrivateKey();
    //             return resolve(privKey);
    //         }catch (e){
    //             return reject(e);
    //         }
    //     })
    // }

    sendCurrency(to, amount){
        return new Promise(async(resolve, reject)=>{
            try{
                console.log('send currency in EthLib');

                this.validator.validateAddress(to,"Tx Receiver");
                this.validator.validateNumber(amount,"sendCurrency amount");

                let txData = await this._formatTransactionParams(to, amount);
                console.log('txData: ', txData)
                let hash = await this._makeTransaction(txData);
                return resolve(hash);
            } catch (e){
                return reject(e);
            }
        });
    }

    _formatTransactionParams(to, value, data="0x"){
        return new Promise(async(resolve,reject)=>{
            try{
                this.validator.validateAddress(to);
                this.validator.validateNumber(value);
                this.validator.validateString(data);
                let privateKey = await this.getPrivateKey();
                this.validator.validateString(privateKey);
                let privKeyBuffer=Buffer.from(privateKey,'hex');
                let from = await this.getAddress();
                let nonce = await this.getNextNonce();
                this.validator.validateAddress(from);
                this.validator.validateNumber(nonce);
                let gasPrice = this.getGasPrice();
                //this.validator.validateNumber(gasPrice);

                let gasLimit = this.getGasLimit();
                //this.validator.validateNumber(gasLimit);

                value = this.converter.fromDecimals(value);
                let chainId = this._getChainId();
                //this.validator.validateNumber(chainId);
                let txParams = {
                    "from":from,
                    "to":to,
                    "privateKey":privKeyBuffer,
                    "value":this.provider.utils.numberToHex(value),
                    "gasPrice":this.provider.utils.numberToHex(gasPrice),
                    "gasLimit":gasLimit,
                    "nonce":nonce,
                    "data":data,
                    "chainId":chainId
                };

                console.log('txParams',txParams)

                return resolve(txParams);
            }catch (e){
                return reject(e);
            }
        })
    }

    getGasPrice(){
        return GAS_PRICE;
    }

    getGasLimit(){
        return GAS_LIMIT;
    }

    getNextNonce(){
        return new Promise(async(resolve,reject)=>{
            try{
                let address = await this.getAddress();
                console.log('address: ', address)
                let nonce = await this.provider.eth.getTransactionCount(address, 'latest');
                console.log('nonce: ', nonce)
                return resolve(nonce);
            }catch (e){
                return reject(e)
            }
        });
    }

    _makeTransaction(txParams){
        return new Promise(async (resolve,reject)=>{
            try{
                console.log('making Transaction');
                let tx = new Transaction(txParams,{'chainId':'11155111'});
                console.log(tx);
                console.log('signing tx');
                tx.sign(txParams.privateKey);
                console.log('tx signed');
                var raw = "0x"+tx.serialize().toString('hex');
                console.log('tx serialized');
                this.provider.eth.sendSignedTransaction(raw).on("receipt",(data)=>{
                    console.log(data);
                    let transactionHash = data["transactionHash"];
                    return resolve(transactionHash);
                }).on("error",(e)=>{
                    console.error(e);
                    return reject(e);
                });

            }catch(e){
                return reject(e);
            }
        });
    }

}

module.exports = EthLib;