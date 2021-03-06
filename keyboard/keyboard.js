const keyboard = {
    // keyboard structure
    elements : {
        main : null,
        keysContainer : null,
        keys : []
    },

    //évènements
    eventHandlers : {
        oninput : null,
        onclose : null
    },

    // les différentes valeurs
    properties : {
        value : "",
        capsLock : false, // le clavier a activé casplock ou non

    },

    //METHODES
    //1) Initialiser
    init() {
        // créer les principaux éléments
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");
        //paramétrer les principaux éléments
        this.elements.main.classList.add("keyboard", "keyboard--hidden");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        //ajouter le clavier au DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        //ouverture automatique et utilisation du clavier avec un écouteur d'évènement sur la classe '.use-keyboard-input'
        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },

    //2) Créer les touches du clavier
    _createKeys() { //_ = "private method"
        const fragment = document.createDocumentFragment(); //un élément virtuel "container" auquel on peut ajouter d'autres éléments, le tout sera ajouté au document en 1 fois.
        const keyLayout = [
            //contient toutes les touches du clavier
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "a", "z", "e", "r", "t", "y", "u", "i", "o", "p",
            "caps", "q", "s", "d", "f", "g", "h", "j", "k", "l","m", "enter",
            "done", "w", "x", "c", "v", "b", "n", ",", ";", ":", "?", ".", "!",
            "space"
        ];
        //fonction qui crée le code HTML pour insérer les icones google
        const createIconHTML = (icon_name) => {
            const span = document.createElement("span");
            span.classList.add("material-icons");
            span.textContent= `${icon_name}`;
            return span;
            //return `<span class="material-icons">${icon_name}</span>`;
        };

        //créer chaque touche du clavier
        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            let createIcon = "";
            // insère un saut à la ligne si la touche est l'une ce de celles spécifiées dans insertLineBreak et que le méthode indexOf ne retourne pas -1 (donc s'il trouve cette touche dans le tableau)
            const insertLineBreak = ["backspace", "p", "enter", "!"].indexOf(key) !== -1;

            //ajoute un attribut à keyElement
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    createIcon = createIconHTML("backspace");
                    keyElement.appendChild(createIcon);
                    // backspace => du coup on doit supprimer un caractère:
                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length -1); //substring du 1er à l'avant dernier caractère - longueur moins 1)
                        //change l'event en "oninput"
                        this._triggerEvent("oninput");
                    })
                    break;

                case "caps":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    createIcon = createIconHTML("keyboard_capslock");
                    keyElement.appendChild(createIcon);
                    // capsLock => majuscules
                    keyElement.addEventListener("click", () => {
                        //passe la méthode togglecapslock
                        this._toggleCapsLock();
                        //change la classe en "active" pour avoir le petit bouton vert
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock); 
                    })
                    break;

                case "enter":
                    keyElement.classList.add("keyboard__key--wide");
                    createIcon = createIconHTML("keyboard_return");
                    keyElement.appendChild(createIcon);
                    //Eventlistener
                    keyElement.addEventListener("click", () => {
                        //
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });
                    break;

                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    createIcon = createIconHTML("space_bar");
                    keyElement.appendChild(createIcon);
                    //Eventlistener
                    keyElement.addEventListener("click", () => {
                        //
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });
                    break;

                case "done" :
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                    createIcon = createIconHTML("check_circle");
                    keyElement.appendChild(createIcon);
                    //eventlistener
                    keyElement.addEventListener("click", () => {
                        this.close();
                        this._triggerEvent("onclose");
                    });
                    break;

                default :
                    keyElement.textContent = key.toLocaleLowerCase();
                    //eventlistener
                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? /*si capslock est sur on, alors*/ key.toUpperCase() :/*sinon*/ key.toLowerCase() ;
                        this._triggerEvent("oninput");
                    });
                    break;
            }
            //insérer la touche créée dans le clavier
            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    //3) Déclencheur d'évènements
    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    //4) toggle le mode de capslock ("allumé" ou non)
    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock; //bascule la propriété de capsLock
        
        for ( const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    //5 ) 2 méthodes -> ouvre + ferme le clavier
    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard--hidden");
    },

    close(){
        this.properties.value= "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard--hidden");
    }
};


window.addEventListener("DOMContentLoaded", function() {
    keyboard.init();
});