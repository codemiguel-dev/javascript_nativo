// Importar las variables desde los archivos necesarios
import { generateCarouselHTML } from './components/carousel.js';
import { guardarJSON } from './function/save_json.js';
import { showJSON } from './function/show_page.js';

// Variable global para almacenar los datos
let pageData = null;

let currentImage = ''; // Almacenará la URL de la imagen

// Elementos del DOM
const fileInput = document.getElementById('imagecarousel');
const previewImage = document.getElementById('previewcarousel');


// Evento para manejar la selección de imagen
fileInput.addEventListener('change', async function(e) {
  const file = e.target.files[0]; // Obtiene el primer archivo seleccionado
  
  if (file) {
    // Parte 1: Mostrar previsualización de la imagen
    const reader = new FileReader(); // Crea un lector de archivos


/*************  ✨ Windsurf Command ⭐  *************/
    // Función que se ejecuta cuando se completa la lectura de un archivo
    // en el lector de archivos (FileReader). La función asigna el contenido
    // leído como una URL de imagen al elemento <img> con id "previewImage"
    // y muestra el elemento.
/*******  e90be4b3-b731-45bb-9def-e0820d0f01a8  *******/    reader.onload = function(event) {
      previewImage.src = event.target.result; // Asigna la imagen al src
      previewImage.style.display = 'block'; // Muestra la imagen
    };

    reader.readAsDataURL(file); // Lee el archivo como URL

    // Parte 2: Subir la imagen al servidor
    const formData = new FormData();
    formData.append('image', file); // Usamos 'file' que ya tenemos
    
    try {
      const response = await fetch('/upload-image', {
        method: 'POST',
        body: formData
      });
  
      const data = await response.json(); // Esperamos la conversión a JSON
  
      if (data.success) {
        currentImage = data.imageUrl; // Almacenamos la URL de la imagen
        console.log('URL de la imagen:', currentImage);
        // No mostramos alerta para mejor UX, solo actualizamos el estado
      } else {
        console.error('Error al subir la imagen:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
});

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
  await loadPageData();
  setupEventListeners();
});

// Cargar datos JSON
async function loadPageData() {
  try {
    const response = await fetch('data/page.json');
    pageData = await response.json();
    
    // Restaurar selecciones previas si existen
    // if (pageData.page.navbar.currentColor) {
    //   currentColor = pageData.page.navbar.currentColor;
    // }

    // if (pageData.page.navbar.currentPosition) {
    //   currentPosition = pageData.page.navbar.currentPosition;
    // }

    if (pageData.page.carousel.imagecarousel) {
      currentImage = pageData.page.carousel.imagecarousel;
      previewImage.src = currentImage;
      previewImage.style.display = 'block';
    }

  } catch (error) {
    console.error('Error cargando datos:', error);
  }
}



// Configurar event listeners
function setupEventListeners() {

  // Botón de actualización
  document.getElementById("updateCarousel")?.addEventListener("click", handleCarouselUpdate);
}

// Manejar actualización del navbar
async function handleCarouselUpdate() {
  try {
    if (!pageData) throw new Error("Datos no cargados");
    
    // Obtener selecciones actuales
    const titlecarousel = document.getElementById("titlecarousel").value;
    const headercarousel = document.getElementById("headercarousel").value;
    

    
    // Validar selecciones
    // if (!color) throw new Error("Selecciona un color");
    
    // Obtener opciones del menú
    // const menuOptions = getMenuOptions();
    
    // // Generar HTML (actualizado para incluir la imagen)
    const carouselHTML = generateCarouselHTML(
      titlecarousel,
      headercarousel,
      currentImage
    );
    
    // Actualizar y guardar
    pageData.page.carousel = {
      id: 1,
      html: carouselHTML,
      titlecarousel: titlecarousel,
      headercarousel: headercarousel,
      imagecarousel: currentImage // Guardamos la URL de la imagen
    };
    
    await guardarJSON(pageData);
    updateUI();
    
  } catch (error) {
    console.error("Error:", error.message);
    alert(`Error: ${error.message}`);
  }
}

// Helper: Obtener valor seleccionado de un grupo de radios
// Helper: Obtener opciones del menú
function getMenuOptions() {
  const options = { texts: [], links: [] };
  for (let i = 1; i <= 6; i++) {
    options.texts.push(getValue(`opc${i}`));
    options.links.push(getValue(`opc${i}link`));
  }
  return options;
}

// Helper: Obtener valor de input de forma segura
function getValue(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : "";
}

// Actualizar la interfaz
function updateUI() {
  // shownavbarJSON(pageData);
  showJSON(pageData);
  location.reload(); 
  console.log("Navbar actualizado!");
}