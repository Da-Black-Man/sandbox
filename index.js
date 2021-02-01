// var screen = document.getElementById("screen");
// var keys = document.getElementsByClassName("keyboard-key");

// let screenArray = [];
// screen.innerHTML = screenArray;

// for (var i = 0; i < keys.length; i++) {
//   keys[i].addEventListener("click", function (e) {
//     if (e.target.classList.contains("letter")) {
//       var letters = e.target.innerHTML;
//       console.log(letters);

//       var typedLetters = document.createElement("span");
//       typedLetters.innerHTML = letters;
//       screenArray.push(letters);
//       screen.appendChild(typedLetters);
//     }

//     if (e.target.classList.contains("number")) {
//       var numberLabel = e.target.children[1].innerHTML;
//       console.log(numberLabel);

//       var typedNumbers = document.createElement("span");
//       typedNumbers.innerHTML = numberLabel;

//       screenArray.push(numberLabel);
//       screen.appendChild(typedNumbers);
//     }

//     if (e.target.classList.contains("enter")) {
//       var enter = document.createElement("p");

//       var newLine = [];

//       newLine.push(enter.innerHTML);

//       screen.appendChild(enter);
//     }
//   });
// }

const kirbyKeyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
  },

  eventHandlers: {
    oninput: null,
    onclose: null,
  },

  properties: {
    value: "",
    capsLock: false,
  },

  init() {
    this._createKeys();
    document.querySelectorAll(".screen-container").forEach((element) => {
      element.addEventListener("focus", () => {
        this.open(element.value, (currentValue) => {
          element.value = currentValue;
        });
      });
    });
  },

  _createKeys() {
    
    var keys = document.getElementsByClassName("keyboard-key");

    for (let i = 0; i < keys.length; i++) {
      switch (i) {
        case 27:
          //delete
          keys[27].addEventListener("click", () => {
            this.properties.value = this.properties.value.substring(
              0,
              this.properties.value.length - 1
            );
            this._triggerEvent("oninput");
          });

          break;

        case 42:
          //caps
          keys[42].addEventListener("click", () => {
            this._toggleCapsLock();
          });

          break;

        case 54:
          //enter
          keys[54].addEventListener("click", () => {
            this.properties.value += "\n";
            this._triggerEvent("oninput");
          });

          break;

        case 71:
          //space
          keys[71].addEventListener("click", () => {
            this.properties.value += " ";
            this._triggerEvent("oninput");
          });

          break;

        default:
          const lower = keys[i].textContent.toLowerCase();
          const upper = keys[i].textContent.toUpperCase();

          keys[i].addEventListener("click", () => {
            this.properties.value += this.properties.capsLock ? upper : lower;
            this._triggerEvent("oninput");
            console.log(this.properties.value);
          });

          break;
      }
    }
  },

  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock
          ? key.textContent.toUpperCase()
          : key.textContent.toLowerCase();
      }
    }
  },

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
  },

  close() {
    this.properties.value = "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
  },
};

window.addEventListener("DOMContentLoaded", function () {
  kirbyKeyboard.init();
});
