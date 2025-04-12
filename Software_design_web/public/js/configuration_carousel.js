// Importar las variables desde el archivo components/navbar-primary.js
import { 
  generateCarouselHTML,
  
  } from './components/carousel.js';
import { guardarJSON } from './function/save_json.js';

const uploadedImages = {}; // Almacena las URLs por ID

function setupImageUpload(id) {
  document.getElementById(`image${id}`).addEventListener('change', async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        uploadedImages[id] = result.imageUrl;
        console.log(`Imagen ${id} subida:`, result.imageUrl);
      } else {
        console.error(`Error al subir imagen ${id}`);
      }
    } catch (err) {
      console.error(`Error en la subida (${id}):`, err);
    }
  });
}

function setupCarouselUpdate(id) {
  document.getElementById(`updateCarousel${id}`).addEventListener('click', async () => {
    const imageInput = document.getElementById(`image${id}`);
    const file = imageInput.files[0];
    if (!file) return;

    const fileName = file.name;
    const title = document.getElementById(`title${id}`).value;
    const header = document.getElementById(`header${id}`).value;

    if (!uploadedImages[id]) {
      console.warn(`La imagen ${id} no ha sido cargada aún`);
      return;
    }

    const carouselHTML = generateCarouselHTML(title, header, fileName);

    if (pageData) {
      if (!pageData.page.carousel.html.includes(carouselHTML)) {
        pageData.page.carousel.html = carouselHTML + pageData.page.carousel.html;
        document.getElementById("container").innerHTML =
          (pageData.page.navbar?.html || "") + pageData.page.carousel.html;

        try {
          const resultado = await guardarJSON(pageData);
          console.log(`JSON (${id}) guardado correctamente:`, resultado);
        } catch (error) {
          console.error(`Error al guardar datos (${id}):`, error);
        }
      } else {
        console.log(`El carrusel ${id} ya está presente.`);
      }
    } else {
      console.error("No se encontró la variable pageData.");
    }
  });
}

// Inicializar para varios IDs
['1', '2'].forEach(id => {
  setupImageUpload(id);
  setupCarouselUpdate(id);
});





