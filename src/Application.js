const NODE_ENV = process.env.NODE_ENV;
const DEFAULT_CURRENCY = "ETH";

const Renderer = require("./ui/Renderer");
const ListenerManager = require("./ui/ListenerManager");
const WalletUI = require("./ui/WalletUI");
const BlockchainService = require("./blockchain/BlockchainService")
const HttpService = require("./services/HttpService")

class Application{

    constructor() {
        this.currency = DEFAULT_CURRENCY;
        this.httpService = new HttpService(this);
        let renderer = new Renderer(this);
        let listenerManager = new ListenerManager(this);
        this.setWalletUI(new WalletUI(this, listenerManager, renderer));
        this.setBlockchainService(new BlockchainService(this));
    }

    isProduction(){
        return NODE_ENV === "production";
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
        this.getWalletUI().renderUI();
    }

    setCurrency(currency){
        this.currency = currency;
    }

    sendCurrency(receiver, amount){
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

    generateMnemonic() {
        return this.blockchainService.generateMnemonic();
    }

    importMnemonic(mnemonic) {
        this.blockchainService.importMnemonic(mnemonic);
        this.walletUI.renderUI();
    }
}

module.exports = Application;