// Importar las variables desde los archivos necesarios
import { generateCarouselHTML } from './components/carousel.js';
import { guardarJSON } from './function/save_json.js';
import { showJSON } from './function/show_page.js';

// Variable global para almacenar los datos
let pageData = null;

let cardCount = '';
let currentTitle = ''; // Almacena el valor de currentTitle
let currentHeader = ''; // Almacena el valor de currentHeader
let currentImage = ''; // Almacenará la URL de la imagen
let currentSize = ''; // Almacenará tamaño del carousel
let currentColorWords = ''; // Almacenará color de la letras del carousel
let currentFontWords = ''; // Almacenará fuentes de la letras del carousel


// Elementos del DOM
const fileInput = document.getElementById('imagecarousel');
const previewImage = document.getElementById('previewcarousel');

// Definir en ámbito global o en tu módulo
function getSelectedValue(radioGroupName) {
  const radios = document.getElementsByName(radioGroupName);
  for (const radio of radios) {
    if (radio.checked) return radio.value;
  }
  return null;
}


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
  initializeControls();
  setupEventListeners();
  getMenuOptions();
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

    if (pageData.page.carousel.titlecarousel) {
      currentTitle = pageData.page.carousel.titlecarousel;
    }
    if (pageData.page.carousel.headercarousel) {
      currentHeader = pageData.page.carousel.headercarousel;
    }

    if (pageData.page.carousel.size) {
      currentSize = pageData.page.carousel.size;
    }

    if (pageData.page.carousel.colorwords) {
      currentColorWords = pageData.page.carousel.colorwords;
    }

    if (pageData.page.carousel.fontwords) {
      currentFontWords = pageData.page.carousel.fontwords;
    }

    if (pageData.page.carousel.cardCount) {
      cardCount = pageData.page.carousel.cardCount;
    }
    

    if (pageData.page.carousel.imagecarousel) {
      currentImage = pageData.page.carousel.imagecarousel;
      previewImage.src = currentImage;
      previewImage.style.display = 'block';
    }

  } catch (error) {
    console.error('Error cargando datos:', error);
  }
}

function initializeControls() {
  const positionRadio = document.querySelector(`input[name="radioGroupCarousel"][value="${currentSize}"]`);
  if (positionRadio) positionRadio.checked = true;

  const positionRadiocolorword = document.querySelector(`input[name="radioGroupCarouselColorWord"][value="${currentColorWords}"]`);
  if (positionRadiocolorword) positionRadiocolorword.checked = true;

  const positionRadiofontword = document.querySelector(`input[name="radioGroupCarouselFontWord"][value="${currentFontWords}"]`);
  if (positionRadiofontword) positionRadiofontword.checked = true;

  const positionRadiocantcard = document.querySelector(`input[name="radioGroupCarouselQuanty"][value="${cardCount}"]`);
  if (positionRadiocantcard) positionRadiocantcard.checked = true;

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
    
    
    const size = getSelectedValue('radioGroupCarousel') || currentSize;
    const colorwords = getSelectedValue('radioGroupCarouselColorWord') || currentColorWords;
    const fontwords = getSelectedValue('radioGroupCarouselFontWord') || currentFontWords;
    const cardCount = getSelectedValue('radioGroupCarouselQuanty') || cardCount;   

    
    // Validar selecciones
    // if (!color) throw new Error("Selecciona un color");
    
    // Obtener opciones del menú
    // const menuOptions = getMenuOptions();
    
    // // Generar HTML (actualizado para incluir la imagen)
    const carouselHTML = generateCarouselHTML(
      titlecarousel,
      headercarousel,
      currentImage,
      size,
      colorwords,
      fontwords, 
      cardCount
    );
    
    // Actualizar y guardar
    pageData.page.carousel = {
      id: 1,
      html: carouselHTML,
      titlecarousel: titlecarousel,
      headercarousel: headercarousel,
      imagecarousel: currentImage, // Guardamos la URL de la imagen
      size: size,
      colorwords: colorwords,
      fontwords: fontwords,
      cardCount: cardCount
    };
    getCard();
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
  const options = { texts: [] };
  for (let i = 1; i <= 6; i++) {
    options.texts.push(getValue(`imagecarousel${i}`));
  }
  console.log(options);
  return options;
}

function getCard() {
  // Obtener todas las tarjetas
  const cards = document.querySelectorAll('.card-item');

  cards.forEach(card => {
    const index = card.getAttribute('data-index');

    // Obtener la imagen del input tipo file dentro de esta tarjeta
    const fileInput = card.querySelector('input[type="file"]');
    const image = fileInput?.files?.[0]?.name || 'Sin imagen seleccionada';

    // Obtener el título y encabezado
    const title = card.querySelector('input[id^="titlecarousel"]')?.value || 'Sin título';
    const header = card.querySelector('input[id^="headercarousel"]')?.value || 'Sin encabezado';

    console.log(`Tarjeta ${index}:`);
    console.log(`  Imagen: ${image}`);
    console.log(`  Título: ${title}`);
    console.log(`  Encabezado: ${header}`);
  });
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
  // location.reload(); 
  console.log("Navbar actualizado!");
}