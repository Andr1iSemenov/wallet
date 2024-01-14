module.exports = {
    "mainnet":{
        bech32:"ltc1",
        messagePrefix: '\x19Litecoin Signed Message:\n',
        bip32: { // HD Wallet
            public: 0x019da462,
            private: 0x019d9cfe
        },
        pubKeyHash: 0x30,
        scriptHash: 0x32,
        wif: 0xb0
    }
}