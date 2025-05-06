// Importar las variables desde los archivos necesarios
import { generateCarouselHTML } from './components/carousel.js';
import { guardarJSON } from './function/save_json.js';
import { showJSON } from './function/show_page.js';

// Variable global para almacenar los datos
let pageData = null;
const numberOfCards = 5; // Número de tarjetas del carrusel

// Configuración inicial del carrusel
let currentSize = '';
let currentColorWords = '';
let currentFontWords = '';
let currentTitleSize = '';
let currentHeaderSize = '';

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
  generateCarouselCards(); // Generar las tarjetas dinámicamente
  generateSizeImage();// Generar el selector de tamaño de imagen
  generateColorWords();
  await loadPageData();
  initializeControls();
  setupEventListeners();
});

// Función para generar las tarjetas del carrusel
function generateCarouselCards() {
  const carouselContainer = document.querySelector('.swiper-wrapper');
  
  if (!carouselContainer) {
    console.error('No se encontró el contenedor del carrusel');
    return;
  }

  // Limpiar contenedor existente
  carouselContainer.innerHTML = '';

  for (let i = 1; i <= numberOfCards; i++) {
    const cardHTML = `
    
      <li class="card-item swiper-slide" data-index="${i}">
        <a href="#" class="card-link">
          <p class="fs-1">Número de tarjeta. ${i}</p>
          <img src="file/img/Sin_imagen.png" alt="Card Image" class="card-image"
            id="previewcarousel-${i}" width="100px">
          <h2 class="card-title">Ingresar Datos</h2>
          <input type="file" class="form-control image-input" 
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default" 
            id="imagecarousel-${i}"
            placeholder="Ingrese Imagen" />
          <input type="text" class="form-control title-input" 
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default" 
            id="titlecarousel-${i}"
            placeholder="Ingrese Título" />
          <input type="text" class="form-control header-input" 
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default" 
            id="headercarousel-${i}"
            placeholder="Ingrese Encabezado" />
        </a>
      </li>
      <!-- If we need pagination -->
    `;
    carouselContainer.insertAdjacentHTML('beforeend', cardHTML);
  }

  // Configurar los event listeners para los inputs de imagen
  setupImageInputs();
}

function generateSizeImage() {
  const sizeImageContainer = document.querySelector('.size-image');
  sizeImageContainer.innerHTML = '';
  
  // Tamaños personalizados (puedes modificarlos según necesites)
  const customSizes = [200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300];
  
  let radioButtonsHTML = customSizes.map(size => `
    <div class="form-check">
      <input type="radio" name="radioGroupCarousel" value="${size}" class="form-check-input">
      <label for="size${size}" class="form-check-label text-dark">${size}px</label>
    </div>
  `).join('');

  const HTML = `
    <div class="modal-header">
      <h5 class="modal-title">Tamaño de imagen:</h5>
    </div>
    <div class="modal-header">
      <div class="modal-body">
        ${radioButtonsHTML}
      </div>
    </div>
  `;
  
  sizeImageContainer.insertAdjacentHTML('beforeend', HTML);
}

function generateColorWords() {
  const sizeImageContainer = document.querySelector('.color-words');
  sizeImageContainer.innerHTML = '';

  // Lista de colores Bootstrap
  const colorOptions = [
    { name: 'Primary', class: 'text-primary' },
    { name: 'Secondary', class: 'text-secondary' },
    { name: 'Success', class: 'text-success' },
    { name: 'Danger', class: 'text-danger' },
    { name: 'Warning', class: 'text-warning' },
    { name: 'Info', class: 'text-info' },
    { name: 'Light', class: 'text-light bg-dark' }, // Visibilidad
    { name: 'Dark', class: 'text-dark' }
  ];

  // Tamaños para título y encabezado
  const fontSizes = [];
  for (let i = 12; i <= 200; i += 2) {
    fontSizes.push(i);
  }
  
  // Radios de colores
  const colorRadiosHTML = colorOptions.map((color, index) => `
    <input type="radio" name="radioGroupCarouselColorWord" value="${color.class.replace(' bg-dark', '')}" class="design_radio_nav_color" id="colorOption${index}">
    <label for="colorOption${index}" class="${color.class}">${color.name}</label><br/>
  `).join('');

  // Selector de tamaño para title
  const titleSizeSelectHTML = `
    <label for="titleSizeSelect"><strong>Tamaño del título:</strong></label>
    <select id="titleSizeSelect" class="form-select mb-3">
      ${fontSizes.map(size => `<option value="${size}">${size}px</option>`).join('')}
    </select>
  `;

  // Selector de tamaño para header
  const headerSizeSelectHTML = `
    <label for="headerSizeSelect"><strong>Tamaño del encabezado:</strong></label>
    <select id="headerSizeSelect" class="form-select mb-3">
      ${fontSizes.map(size => `<option value="${size}">${size}px</option>`).join('')}
    </select>
  `;

  // HTML final
  const HTML = `
    <div class="modal-header">
      <h5 class="modal-title" id="miModalLabel">Configuración de letras</h5>
    </div>
    <div class="modal-body">
      <div class="mb-3">
        ${colorRadiosHTML}
      </div>
      <div class="mb-3">
        ${titleSizeSelectHTML}
      </div>
      <div>
        ${headerSizeSelectHTML}
      </div>
    </div>
  `;

  sizeImageContainer.insertAdjacentHTML('beforeend', HTML);
}







// Función para configurar los event listeners de los inputs de imagen
function setupImageInputs() {
  document.querySelectorAll('.image-input').forEach(input => {
    input.addEventListener('change', async function(e) {
      const index = this.id.split('-')[1];
      const previewId = `previewcarousel-${index}`;
      const previewImage = document.getElementById(previewId);
      const file = e.target.files[0];
      
      if (file && previewImage) {
        // Mostrar previsualización
        const reader = new FileReader();
        reader.onload = function(event) {
          previewImage.src = event.target.result;
          previewImage.style.display = 'block';
        };
        reader.readAsDataURL(file);

        // Subir imagen al servidor
        const formData = new FormData();
        formData.append('image', file);
        formData.append('index', index);
        
        try {
          const response = await fetch('/upload-image', {
            method: 'POST',
            body: formData
          });
          const data = await response.json();
          
          if (!data.success) {
            console.error('Error al subir la imagen:', data.message);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    });
  });
}

// Cargar datos JSON
async function loadPageData() {
  try {
    const response = await fetch('data/page.json');
    pageData = await response.json();

    // Restaurar selecciones previas si existen
    if (pageData.page.carousel?.styles) {
      currentSize = pageData.page.carousel.styles.size || '';
      currentColorWords = pageData.page.carousel.styles.color || '';
      currentFontWords = pageData.page.carousel.styles.font || '';
      
      // NUEVO: Restaurar tamaño de título y encabezado
      currentTitleSize = pageData.page.carousel.styles.titleSize || '';
      currentHeaderSize = pageData.page.carousel.styles.headerSize || '';
    }

    // Restaurar datos de las tarjetas si existen
    if (pageData.page.carousel?.cards) {
      pageData.page.carousel.cards.forEach(card => {
        const index = card.index;
        const titleInput = document.getElementById(`titlecarousel-${index}`);
        const headerInput = document.getElementById(`headercarousel-${index}`);
        const previewImage = document.getElementById(`previewcarousel-${index}`);

        if (titleInput) titleInput.value = card.title || '';
        if (headerInput) headerInput.value = card.header || '';
        if (previewImage && card.image) {
          previewImage.src = 'file/img/' + card.image;
          previewImage.style.display = 'block';
        }
      });
    }
  } catch (error) {
    console.error('Error loading page data:', error);
  }
}


function initializeControls() {
  // Configurar radios según los valores cargados
  if (currentSize) {
    const sizeRadio = document.querySelector(`input[name="radioGroupCarousel"][value="${currentSize}"]`);
    if (sizeRadio) sizeRadio.checked = true;
  }

  if (currentColorWords) {
    const colorRadio = document.querySelector(`input[name="radioGroupCarouselColorWord"][value="${currentColorWords}"]`);
    if (colorRadio) colorRadio.checked = true;
  }

  if (currentFontWords) {
    const fontRadio = document.querySelector(`input[name="radioGroupCarouselFontWord"][value="${currentFontWords}"]`);
    if (fontRadio) fontRadio.checked = true;
  }

  // NUEVO: Configurar tamaño de título
  if (currentTitleSize) {
    const titleSizeSelect = document.getElementById('titleSizeSelect');
    if (titleSizeSelect) titleSizeSelect.value = currentTitleSize;
  }

  // NUEVO: Configurar tamaño de encabezado
  if (currentHeaderSize) {
    const headerSizeSelect = document.getElementById('headerSizeSelect');
    if (headerSizeSelect) headerSizeSelect.value = currentHeaderSize;
  }
}


// Configurar event listeners
function setupEventListeners() {
  // Botón de actualización
  document.getElementById("updateCarousel")?.addEventListener("click", handleCarouselUpdate);
}

// Manejar actualización del carrusel
async function handleCarouselUpdate() {
  try {
    if (!pageData) throw new Error("Datos no cargados");

    // Obtener valores seleccionados
    const size = getSelectedValue('radioGroupCarousel') || currentSize;
    const colorwords = getSelectedValue('radioGroupCarouselColorWord') || currentColorWords;
    const fontwords = getSelectedValue('radioGroupCarouselFontWord') || currentFontWords;

    // NUEVO: Obtener tamaño de título y encabezado
    const titleSize = document.getElementById('titleSizeSelect')?.value || currentTitleSize || '20';
    const headerSize = document.getElementById('headerSizeSelect')?.value || currentHeaderSize || '16';

    const allCards = getCard();

    // Pasar también tamaños al generar HTML
    const carouselHTML = generateCarouselHTML(
      allCards,
      size,
      colorwords,
      fontwords,
      titleSize,
      headerSize
    );

    // Actualizar y guardar datos
    pageData.page.carousel = {
      id: 1,
      html: carouselHTML,
      cards: allCards,
      styles: {
        size: size,
        color: colorwords,
        font: fontwords,
        titleSize: titleSize,
        headerSize: headerSize
      }
    };

    await guardarJSON(pageData);
    updateUI();

  } catch (error) {
    console.error("Error:", error.message);
    alert(`Error: ${error.message}`);
  }
}


// Obtener datos de todas las tarjetas
function getCard() {
  const cards = document.querySelectorAll('.card-item');
  const cardsArray = [];

  cards.forEach(card => {
    const index = card.getAttribute('data-index');
    const fileInput = document.getElementById(`imagecarousel-${index}`);
    const titleInput = document.getElementById(`titlecarousel-${index}`);
    const headerInput = document.getElementById(`headercarousel-${index}`);
    const previewImage = document.getElementById(`previewcarousel-${index}`);

    console.log(fileInput);

    // Obtener nombre de archivo o mantener la imagen actual
    let imageName = '';
    if (fileInput?.files?.[0]) {
      imageName = fileInput.files[0].name;
    } else if (previewImage?.src) {
      const srcParts = previewImage.src.split('/');
      imageName = srcParts[srcParts.length - 1];
    }

    cardsArray.push({
      index: index,
      image: imageName,
      title: titleInput?.value || '',
      header: headerInput?.value || ''
    });
  });

  return cardsArray;
}

// Helper: Obtener valor seleccionado de un grupo de radios
function getSelectedValue(radioGroupName) {
  const radios = document.getElementsByName(radioGroupName);
  for (const radio of radios) {
    if (radio.checked) return radio.value;
  }
  return null;
}

// Helper: Obtener valor de input de forma segura
function getValue(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : "";
}

// Actualizar la interfaz
function updateUI() {
  showJSON(pageData);
  location.reload();  // Recarga la página (equivalente a F5)
  console.log("Carrusel actualizado!");
}