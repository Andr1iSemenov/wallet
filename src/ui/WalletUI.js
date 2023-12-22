class WalletUI{

    constructor(app, listenerManager, renderer) {
        this.app = app;
        this.listenerManager = listenerManager;
        this.renderer = renderer;
    }

    prepareUI(){
        this.renderUI();
        this.setListeners();
    }

    renderUI() {
        this.getRenderer().renderUI();
    }

    setListeners() {
        this.getListenerManager().setListeners()
    }

    getListenerManager() {
        return this.listenerManager;
    }

    getRenderer() {
        return this.renderer;
    }
}

module.exports = WalletUI;