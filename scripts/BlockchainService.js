const DEFAULT_BALANCE = 1.516;
const DEFAULT_ADDRESS = "0x9dd7CA2A77704836667CD69F805052656eF3aBB3";

class BlockchainService{

    constructor(app) {
        this.app = app;
    }

    getAddress(){
        return DEFAULT_ADDRESS;
    }

    getBalance(){
        return DEFAULT_BALANCE;
    }

    sendCurrency() {
        let currency = this.app.getCurrency();
        let amount = document.getElementById("amount").value;
        let address = document.getElementById("receiver").value;
        alert(`Sending ${amount} ${currency} to ${address}`);
    }
}