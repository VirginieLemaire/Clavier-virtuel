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
        console.log("toto");
        // create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");
        //setup main elements
        this.elements.main.classList.add("keyboard", "1keyboard--hidden"); //remove the 1 when development is done
        this.elements.keysContainer.classList.add("keyboard__keys");

        //add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);
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

    //5 ) 2 methods - open and close the keyboard
    open(initialValue, oninput, onclose) {
        //
    },

    close(){
        //
    }
};


window.addEventListener("DOMContentLoaded", function() {
    //once the DOM is loaded => initialize the keyboard
    keyboard.init();
});