// Importar las variables desde el archivo components/navbar-primary.js
import { 
  generateCarouselHTML,
  
  } from './components/carousel.js';
import { guardarJSON } from './function/save_json.js';

const uploadedImages = {}; // Almacena las URLs por ID

function setupImageUploadnav(id) {
  document.getElementById(`image${id}`).addEventListener('change', async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/upload-image-nav', {
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

function setupCarouselUpdate() {
  document.getElementById(`updateCarousel`).addEventListener('click', async () => {
    // Obtener datos de AMBAS imágenes
    const image1 = document.getElementById('image1').files[0];
    const image2 = document.getElementById('image2').files[0];
    
    if (!image1 || !image2) {
      console.warn('Ambas imágenes son requeridas');
      return;
    }

    const title1 = document.getElementById('title1').value;
    const header1 = document.getElementById('header1').value;
    const title2 = document.getElementById('title2').value;
    const header2 = document.getElementById('header2').value;

    if (!uploadedImages['1'] || !uploadedImages['2']) {
      console.warn('Ambas imágenes deben ser cargadas primero');
      return;
    }

    // Crear un nuevo array de slides con ambas imágenes
    const newSlides = [
      {
        image: image1.name,
        title: title1,
        header: header1
      },
      {
        image: image2.name,
        title: title2,
        header: header2
      }
    ];

    // Asignar el nuevo array completo
    pageData.page.carousel.slides = newSlides;

    // Generar el carrusel con ambas imágenes
    const carouselHTML = generateCarouselHTML(pageData.page.carousel.slides);

    // Actualizar visualmente
    pageData.page.carousel.html = carouselHTML;
    document.getElementById("container").innerHTML =
      (pageData.page.navbar?.html || "") + pageData.page.carousel.html;

    // Guardar
    try {
      const resultado = await guardarJSON(pageData);
      console.log('JSON guardado correctamente:', resultado);
    } catch (error) {
      console.error('Error al guardar datos:', error);
    }
  });
}


// Inicializar para varios IDs
['1', '2', '3'].forEach(id => {
  setupImageUpload(id);
  setupCarouselUpdate(id);
});


 


