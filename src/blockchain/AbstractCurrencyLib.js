const Validator = require('/src/validators/Validator');
const staticValidator = new Validator();
class AbstractCurrencyLib{
    constructor(app,provider,validator,converter) {
        this.app = app;
        staticValidator.validateObject(provider,"provider");
        staticValidator.validateObject(validator,"validator");
        staticValidator.validateObject(converter,"converter");
        this.provider = provider;
        this.validator = validator;
        this.converter = converter;
    }

    getAddress(){
        return new Promise(async(resolve,reject)=>{
            try{
                throw("getAddress not implemented");
            }catch(e){
                return reject(e);
            }
        })
    };

    getPrivateKey(){
        return new Promise(async(resolve,reject)=>{
            try{
                throw("getPrivKey not implemented");
            }catch(e){
                return reject(e);
            }
        })
    }

    getCurrentBalance(){
        return new Promise(async(resolve,reject)=>{
            try{
                console.log("Abstract getCurrentBalance start");
                let address = await this.getAddress();
                console.log("Abstract getCurrentBalance middle",address);
                let balance =await this.getBalance(address);
                console.log("Abstract getCurrentBalance end",balance);
                return resolve(balance);
            }catch (e){
                return reject(e);
            }
        })
    }

    getBalance(address){
        return new Promise(async(resolve,reject)=>{
            try{
                throw("getBalance() not implemented")
            }catch (e){
                return reject(e);
            }
        })
    }

    sendCurrency(to,amount){
        return new Promise(async(resolve,reject)=>{
            try{
                throw("sendCurrency() not implemented")
            }catch (e){
                return reject(e);
            }
        });
    }

    toDecimals(amount){
        return this.converter.toDecimals(amount);
    }
    fromDecimals(amount){
        return this.converter.fromDecimals(amount);
    }
}

module.exports = AbstractCurrencyLib;