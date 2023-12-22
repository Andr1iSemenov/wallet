class ListenerManager{
    constructor(app) {
        this.app = app
    }
    setListeners(){
        this.setChangeCurrencyListener();
        this.setSendCurrencyListener();
        this.setMnemonicListeners();
        this.copyAddressListener();
    }

    setChangeCurrencyListener() {
        Array.from(document.getElementsByClassName("nav-currency")).forEach(element => {
            element.addEventListener("click", (event) => {
                this.app.changeCurrency(event.target.getAttribute("data-value"));
            });
        });
    }

    copyAddressListener() {
        document.getElementById('copy-address').addEventListener('click', async(event) => {
            event.preventDefault();

            let address = document.getElementById('address').value;
            try {
                await navigator.clipboard.writeText(address);
                console.log('Address copied to clipboard');
            } catch (err) {
                console.error('Failed to copy: ', err);
            }
        })
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
                // location.reload();
            } catch (e) {
                if (e.message) {
                    alert(e.message);
                }
            } finally {
                sendButton.disabled = false;
            }
        });
    }

    setMnemonicListeners(){
        this.setGenerateMnemonicListener();
        this.setImportMnemonicOnInputListener();
    }

    setGenerateMnemonicListener(){
        document.getElementById("generate_mnemonic").addEventListener("click",async()=>{
            console.log('generate mnemonic')
            let mnemonic = await this.app.generateMnemonic();
            alert(mnemonic);
        })
    }

    setImportMnemonicOnInputListener(){
        document.getElementById("import_mnemonic").addEventListener("input",async()=>{
            console.log('import mnemonic')
            let element = event.target || event.srcElement;
            let mnemonic = element.value;
            console.log(mnemonic);
            this.app.importMnemonic(mnemonic);
        })
    }
}

module.exports = ListenerManager;