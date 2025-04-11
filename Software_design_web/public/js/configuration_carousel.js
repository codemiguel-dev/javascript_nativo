// Importar las variables desde el archivo components/navbar-primary.js
import { 
  generateCarouselHTML
  } from './components/carousel.js';
import { guardarJSON } from './function/save_json.js';

let uploadedImageUrl = '';

document.getElementById('image').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    console.log(result);

    if (result.success) {
      uploadedImageUrl = result.imageUrl;
      console.log('Imagen subida:', uploadedImageUrl);
    } else {
      console.error('Error al cargar la imagen');
    }
  } catch (err) {
    console.error('Error en la subida:', err);
  }
});

document.getElementById('updateCarousel').addEventListener('click', async () => {
  const imageInput = document.getElementById('image');
  const fileName = imageInput.files[0].name;
  const title = document.getElementById('title').value;
  const header = document.getElementById('header').value;

  if (!uploadedImageUrl) {
    console.warn("La imagen no ha sido cargada aún");
    return;
  }

  // 1. Generar el HTML del carrusel con los valores
  const carouselHTML = generateCarouselHTML(title, header, fileName);

  if (pageData) {
    // Verificar si el carrusel ya existe para evitar duplicados
    if (!pageData.page.carousel.html.includes(carouselHTML)) {

      // Agregar el nuevo carrusel al inicio del contenido existente
      pageData.page.carousel.html = carouselHTML + pageData.page.carousel.html;

      // Actualizar visualmente el contenedor
      document.getElementById("container").innerHTML =
        (pageData.page.navbar?.html || "") + pageData.page.carousel.html;

      // Guardar los datos en el servidor
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



