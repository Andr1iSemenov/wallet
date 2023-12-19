const DEFAULT_CURRENCY = "ETH";

const Renderer = require("./ui/Renderer");
const ListenerManager = require("./ui/ListenerManager");
const WalletUI = require("./ui/WalletUI");
const BlockchainService = require("./blockchain/BlockchainService")

class Application{

    constructor() {
        this.currency = DEFAULT_CURRENCY;
        let renderer = new Renderer(this);
        let listenerManager = new ListenerManager(this);
        this.setWalletUI(new WalletUI(this, listenerManager, renderer));
        this.setBlockchainService(new BlockchainService(this));
    }

    setWalletUI(walletUI){
        this.walletUI = walletUI;
    }

    getWalletUI(){
        return this.walletUI;
    }

    setBlockchainService(blockchainService) {
        this.blockchainService = blockchainService;
    }

    getBlockchainService() {
        return this.blockchainService;
    }

    prepareUI(){
        this.getWalletUI().prepareUI();
    }

    getCurrency(){
        return this.currency;
    }

    changeCurrency(currency){
        this.setCurrency(currency);
        console.log(this.getWalletUI())
        this.getWalletUI().getRenderer().renderUI();
    }

    setCurrency(currency){
        this.currency = currency;
    }

    sendCurrency(receiver, amount){
        console.log('send currency in application')
        return this.getBlockchainService().sendCurrency(receiver, amount);
    }

    getAddress(){
        return new Promise(async (resolve, reject) => {
            try {
                return resolve(await this.getBlockchainService().getAddress());
            } catch (e) {
                return reject(e);
            }
        });
    }

    getCurrentBalance(){
        return new Promise(async (resolve, reject) => {
            try {
                return resolve(await this.getBlockchainService().getCurrentBalance());
            } catch (e) {
                return reject(e);
            }
        });
    }
}

module.exports = Application;