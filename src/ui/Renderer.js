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

    async renderBalance() {
        document.getElementById("balance").innerHTML = await this.app.getCurrentBalance();
    }

    async renderInputAddress() {
        document.getElementById('address').value = await this.app.getAddress();
    }

    async renderQRAddress() {
        let element = document.getElementById("qrcode");
        element.innerHTML = ''; //destroy previous
        new QRCode(element, {text: await this.app.getAddress(), width: 200, height: 200});
    }
}

module.exports = Renderer;