const Web3 = require('web3');
module.exports = function(providerUrl) {
    return new Web3(new Web3.providers.HttpProvider(providerUrl));
}