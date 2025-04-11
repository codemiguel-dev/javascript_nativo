// Importar las variables desde el archivo components/navbar-primary.js
import { 
    generateCardmodalHTML
  } from './components/card-modal.js';
import { guardarJSON } from './function/save_json.js';


document.getElementById('addcardmodal').addEventListener('click', async () => {


  // 1. Generar el HTML del carrusel con los valores
  const carouselHTML = generateCardmodalHTML();

  console.log(pageData);

  if (pageData) {
    // Verificar si el carrusel ya existe para evitar duplicados
    if (!pageData.page.cardmodal.html.includes(carouselHTML)) {

        // Agregar el nuevo carrusel al inicio del contenido existente
        pageData.page.cardmodal.html = carouselHTML + pageData.page.cardmodal.html;

        // Actualizar visualmente el contenedor
        document.getElementById("card-modal").innerHTML = pageData.page.cardmodal.html;

           // Guardar los cambios usando la función modularizada
        const resultado = await guardarJSON(pageData);
        console.log("JSON guardado correctamente:", resultado);

    } else {
      console.log("El card modal ya está presente.");
    }
  } else {
    console.error("No se encontró la variable pageData.");
  }
});



