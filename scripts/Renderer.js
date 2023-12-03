class Renderer{

    constructor(app) {
        this.app = app
    }

    renderUI(){
        this.renderCurrency();
        this.renderBalance();
        this.renderInputAddress();
        this.renderQRAddress();
    }

    renderCurrency() {
        let currency = this.app.getCurrency();
        Array.from(document.getElementsByClassName("currency-symbol")).forEach(element => {
            element.innerHTML = currency;
        });
    }

    renderBalance() {
        document.getElementById("balance").innerHTML = app.getBalance();
    }

    renderInputAddress() {
        document.getElementById('address').value = app.getAddress();
    }

    renderQRAddress() {
        let element = document.getElementById("qrcode");
        element.innerHTML = ''; //destroy previous
        new QRCode(element, {text: app.getAddress(), width: 200, height: 200});
    }
}