import { generateTitleImageHTML } from "./components/title-image.js";
import { guardarJSON } from './function/save_json.js';


document
  .getElementById("pagetitleimage")
  .addEventListener("click", async () => {
    const image = document.getElementById("titleimagetxt").value;

    // 1. Generar el HTML del carrusel con los valores
    const carouselHTML = generateTitleImageHTML(image);

    if (pageData) {
      // Verificar si el carrusel ya existe para evitar duplicados
      if (!pageData.page.titleimage.html.includes(carouselHTML)) {
        // Agregar el nuevo título al inicio del contenido existente
        pageData.page.titleimage.html = carouselHTML;

        document.getElementById("dynamic-title-image").innerHTML = pageData.page.titleimage.html;

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
