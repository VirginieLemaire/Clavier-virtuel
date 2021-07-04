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

    // les différentes valeurs
    properties : {
        value : "",
        capsLock : false, // le clavier a activé casplock ou non

    },

    //METHODES
    //1) Initialiser
    init() {
        console.log("toto");
        // créer les principaux éléments
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");
        //paramétrer les principaux éléments
        this.elements.main.classList.add("keyboard", "1keyboard--hidden"); //enlever le "1" quand le développement sera fini
        this.elements.keysContainer.classList.add("keyboard__keys");

        //ajouter le clavier au DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);
        this.elements.keysContainer.appendChild(this._createKeys());
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
        //fonction qui crée le HTML pour les icones google
        const createIconHTML = (icon_name) => {
            return `<span class="material-icons">${icon_name}</span>`;
        };

        //créer chaque touche du clavier
        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            // insère un saut à la ligne si la touche est l'une ce de celles spécifiées dans insertLineBreak et que le méthode indexOf ne retourne pas -1 (donc s'il trouve cette touche dans le tableau)
            const insertLineBreak = ["backspace", "p", "enter", "!"].indexOf(key) !== -1;

            //ajoute un attribut à keyElement
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("backspace");
                    // backspace => du coup on doit supprimer un caractère:
                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length -1); //substring du 1er à l'avant dernier caractère - longueur moins 1)
                        //change l'event en "oninput"
                        this._tiggerEvent("oninput");
                    })
                    break;

                case "caps":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");
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
                    keyElement.innerHTML = createIconHTML("keyboard_return");
                    //Eventlistener
                    keyElement.addEventListener("click", () => {
                        //
                        this.properties.value += "\n";
                        this._tiggerEvent("oninput");
                    });
                    break;

                case "spacebar":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar");
                    //Eventlistener
                    keyElement.addEventListener("click", () => {
                        //
                        this.properties.value += " ";
                        this._tiggerEvent("oninput");
                    });
                    break;

                case "done" :
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                    keyElement.innerHTML = createIconHTML("check_circle");
                    //eventlistener
                    keyElement.addEventListener("click", () => {
                        this.close();
                        this._tiggerEvent("onclose");
                    });
                    break;

                default :
                    keyElement.textContent = key.toLocaleLowerCase();
                    //eventlistener
                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? /*si capslock est sur on*/ key.toUpperCase() :/*sinon*/ key.toLowerCase() ;
                        this._tiggerEvent("oninput");
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
    _tiggerEvent(handlerName) {
        console.log("Event triggered ! Event Name :" + handlerName);
    },

    //4) toggle le mode de capslock ("allumé" ou non)
    _toggleCapsLock() {
        console.log("caps lock toggled ;p")
    },

    //5 ) 2 méthodes -> ouvre + ferme le clavier
    open(initialValue, oninput, onclose) {
        //
    },

    close(){
        //
    }
};


window.addEventListener("DOMContentLoaded", function() {
    keyboard.init();
});