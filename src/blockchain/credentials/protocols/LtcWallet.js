const {payments}= require('bitcoinjs-lib');
const BtcWallet = require('/src/blockchain/credentials/protocols/BtcWallet');
const LtcNetworkHelper = require("/src/blockchain/ltc/LtcNetworkHelper");
class LtcWallet extends BtcWallet{

    _getPath(){
        return LtcNetworkHelper.isMainnet()?`m/44'/2'/0'/0/0`:`m/44'/2'/0'/0/0`;
    }

    _getNetwork(){
        return LtcNetworkHelper.getNetwork();
    }

    provideAddress(mnemonic) {
        return new Promise(async(resolve,reject)=>{
            try {
                let child = await this._getPrivateKey(mnemonic);
                const { address } = payments.p2wpkh({ pubkey: child.publicKey, network: this._getNetwork() });
                return resolve(address);
            } catch (e) {
                return reject(e);
            }
        })
    }
}

module.exports = LtcWallet;