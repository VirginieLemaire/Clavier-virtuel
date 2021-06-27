const keyboard = {
    // keyboard structure
    elements : {
        main : null,
        keysContainer : null,
        keys : []
    },

    //events
    eventHandlers : {
        oninput : null,
        onclose : null
    },

    // the differents values
    properties : {
        value : "",
        capsLock : false, // the keyboard is capslocked or not

    },

    //METHODS
    //1) Initialize
    init() {
        //
    },

    //2) Create keys
    _createKeys() { //_ = private method
        //
    },

    //3) Trigger the events
    _tiggerEvent(handlerName) {
        console.log("Event triggered ! Event Name :" + handlerName);
    },

    //4) toggling the capslock mode
    _toggleCapsLock() {
        console.log("caps lock toggled ;p")
    },

    //5 ) 2 méthodes - ouvrir et fermer le clavier
    open(initialValue, oninput, onclose) {
        //
    },

    close(){
        //
    }
};