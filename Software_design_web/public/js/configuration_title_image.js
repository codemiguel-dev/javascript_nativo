import { generateTitleHTML } from "./components/title-image.js";
import { guardarJSON } from './function/save_json.js';


document
  .getElementById("pagetitle")
  .addEventListener("click", async () => {
    const title = document.getElementById("titletxt").value;

    // 1. Generar el HTML del carrusel con los valores
    const carouselHTML = generateTitleHTML(title);

    if (pageData) {
      // Verificar si el carrusel ya existe para evitar duplicados
      if (!pageData.page.title.html.includes(carouselHTML)) {
        // Agregar el nuevo título al inicio del contenido existente
        pageData.page.title.html = carouselHTML;

        document.getElementById("dynamic-title").innerHTML = pageData.page.title.html;

        try {
          const resultado = await guardarJSON(pageData);
          console.log("JSON guardado correctamente:", resultado);
        } catch (error) {
          console.error("Error al guardar los datos:", error);
        }
      } else {
        console.log("El carrusel ya está presente.");
      }
    } else {
      console.error("No se encontró la variable pageData.");
    }
  });
