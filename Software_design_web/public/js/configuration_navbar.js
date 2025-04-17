// Importar las variables desde el archivo components/navbar-primary.js
import { 
  generateNavbarHTML, 
  } from './components/navbar-background-color.js';
import { guardarJSON } from './function/save_json.js';
import { showJSON } from './function/show_page.js';
import { shownavbarJSON } from './function/show_navbar.js';

document.getElementById("updateColorbackground").addEventListener("click", () => {

  if (!pageData) {
    console.log("pageData no está disponible");
    return;
  }
  const selectedRadio = document.querySelector('input[name="radioGroup"]:checked');

  if (!selectedRadio) {
    console.log("Ningún radio seleccionado");
    return;
  }
  // 1. Generar el HTML del carrusel con los valores
  const navHTML = generateNavbarHTML(selectedRadio.value);
  console.log(navHTML)

  // 2. Verificar si el HTML ya existe (en container.html, no en title.html)
  if (pageData.page.navbar.html.includes(navHTML)) {
    console.log("El navbar ya existe, no se duplicará");
    return;
  }

  // 3. Actualizar el DOM y pageData
  try {
    // Guardar en pageData
    pageData.page.navbar.html = navHTML;
    
    // Guardar el JSON
    const resultado = guardarJSON(pageData);
    console.log("JSON guardado correctamente:", resultado);
    shownavbarJSON(pageData)
    showJSON(pageData);

  } catch (error) {
    console.error("Error al guardar los datos:", error);
  }

});







