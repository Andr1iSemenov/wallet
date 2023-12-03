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
        document.getElementById("submit-send").addEventListener("click", (event) => {
            this.app.sendCurrency();
        });
    }
}