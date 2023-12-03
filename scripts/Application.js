const DEFAULT_CURRENCY = "ETH";

class Application{

    constructor() {
        this.currency = DEFAULT_CURRENCY;
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

    sendCurrency(){
        return this.getBlockchainService().sendCurrency();
    }

    getAddress(){
        return this.getBlockchainService().getAddress();
    }

    getBalance(){
        return this.getBlockchainService().getBalance();
    }
}