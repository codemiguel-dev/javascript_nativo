import { generateContainerHTML } from "./components/container.js";

import { guardarJSON } from './function/save_json.js';
// Esperar a que pageData esté disponible


document.getElementById("updateContainer").addEventListener("click", () => {
  if (pageData) {
    const selectedRadio = document.querySelector('input[name="radioGroup"]:checked');

    if (selectedRadio) {
        console.log("Valor seleccionado:", selectedRadio.value);
    } else {
        console.log("Ningún radio seleccionado");
    }

  

    } else {
      console.log("no trajo pageData");
    }
  
});