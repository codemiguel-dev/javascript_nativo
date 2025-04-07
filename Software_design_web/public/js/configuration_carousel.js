// Importar las variables desde el archivo components/navbar-primary.js
import { 
  generateCarouselHTML
  } from './components/carousel.js';
import { guardarJSON } from './function/save_json.js';


document.getElementById("addcarousel").addEventListener("click", () => {
  if (pageData) {
    // Verificar si ya existe el navbar en el contenido
    if (!pageData.page.carousel.html.includes(carouselHTML)) {
      // Agregar el navbar al contenido
      pageData.page.carousel.html = carouselHTML + pageData.page.carousel.html;

      // Actualizar visualmente el contenido
      document.getElementById("container").innerHTML = pageData.page.navbar.html + pageData.page.carousel.html;

      // Guardar los cambios usando la función modularizada
      const resultado = guardarJSON(pageData);
      console.log("JSON guardado correctamente:", resultado);
    } else {
      console.log("El carousel ya está presente.");
    }
  }
});

document.getElementById('updateCarousel').addEventListener('click', () => {
  const title = document.getElementById('title').value;
  const header = document.getElementById('header').value;

  const html = generateCarouselHTML(title, header);
  document.getElementById('carouselContainer').innerHTML = html;
});




