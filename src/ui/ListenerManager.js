class ListenerManager{
    constructor(app) {
        this.app = app
    }
    setListeners(){
        this.setChangeCurrencyListener();
        this.setSendCurrencyListener();
    }

    setChangeCurrencyListener() {
        Array.from(document.getElementsByClassName("nav-currency")).forEach(element => {
            element.addEventListener("click", (event) => {
                this.app.changeCurrency(event.target.getAttribute("data-value"));
            });
        });
    }

    setSendCurrencyListener() {
        let sendButton = document.getElementById("submit-send");
        sendButton.addEventListener("click",  async(event) => {
            event.preventDefault();
            let address = document.getElementById("receiver").value;
            let amount = document.getElementById("amount").value;
            console.log('send currency for address: %s in amount %s', address, amount)
            sendButton.disabled = true;
            try {
                let result = await this.app.sendCurrency(address, amount);
                alert(result);
                location.reload();
            } catch (e) {
                alert(e.message);
                sendButton.disabled = false;
            }
        });
    }
}

module.exports = ListenerManager;