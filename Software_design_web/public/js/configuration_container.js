import { generateContainerHTML } from "./components/container.js";
import { guardarJSON } from './function/save_json.js';
import { shownavbarJSON } from './function/show_navbar.js';

document.getElementById("updateContainer").addEventListener("click", () => {
  if (!pageData) {
    console.log("pageData no está disponible");
    return;
  }

  const selectedRadio = document.querySelector('input[name="radioGroup"]:checked');

  if (!selectedRadio) {
    console.log("Ningún radio seleccionado");
    return;
  }

  // 1. Generar el HTML usando el VALOR del radio (no el elemento completo)
  const containerHTML = generateContainerHTML(selectedRadio.value); // <- ¡Asegúrate de que reciba el valor!
  console.log("HTML generado:", containerHTML);

  // 2. Verificar si el HTML ya existe (en container.html, no en title.html)
  if (pageData.page.container.html.includes(containerHTML)) {
    console.log("El contenedor ya existe, no se duplicará");
    return;
  }

  // 3. Actualizar el DOM y pageData
  try {
    // Actualizar el contenedor en el DOM (si existe un elemento con ID "dynamic-container")
    const containerElement = document.getElementById("dynamic-container");
    if (containerElement) {
      containerElement.innerHTML = containerHTML;
    }

    // Guardar en pageData
    pageData.page.container.html = containerHTML;
    
    // Guardar el JSON
    const resultado = guardarJSON(pageData);
    console.log("JSON guardado correctamente:", resultado);
    shownavbarJSON(pageData);

  } catch (error) {
    console.error("Error al guardar los datos:", error);
  }
});