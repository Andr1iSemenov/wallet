const BtcLib = require('/src/blockchain/btc/BtcLib')

const LtcValidator = require('/src/validators/blockchain/LtcValidator');
const LtcConverter = require('/src/helpers/LtcConverter');
const BlockcypherProvider = require('/src/blockchain/ltc/LtcBlockcypherProvider');
const LtcNetworkHelper = require('/src/blockchain/ltc/LtcNetworkHelper');

class LtcLib extends BtcLib{

    constructor(app) {
        let validator = new LtcValidator();
        let converter = new LtcConverter();
        let provider = new BlockcypherProvider(app,validator,converter);
        super(app);
        this.validator = validator;
        this.converter = converter;
        this.provider = provider;

    }

    getNetwork(){
        return LtcNetworkHelper.getNetwork();
    }
}

module.exports = LtcLib;