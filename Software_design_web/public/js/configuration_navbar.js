// Importar las variables desde los archivos necesarios
import { generateNavbarHTML } from './components/navbar.js';
import { guardarJSON } from './function/save_json.js';
import { showJSON } from './function/show_page.js';
import { shownavbarJSON } from './function/show_navbar.js';

// Variable global para almacenar los datos
let pageData = null;

// Configuración inicial
const DEFAULT_POSITION = ''; // 'no fixed' por defecto
let currentPosition = ''; // Asegúrate de declarar esta variable
let currentColor = 'primary'; // Color por defecto
let currentImage = ''; // Almacenará la URL de la imagen

// Elementos del DOM
const fileInput = document.getElementById('imagenav');
const previewImage = document.getElementById('previewImage');
const uploadButton = document.getElementById('uploadButton');
const form = document.getElementById('uploadForm');

// Evento para manejar la selección de imagen
fileInput.addEventListener('change', async function(e) {
  const file = e.target.files[0]; // Obtiene el primer archivo seleccionado
  
  if (file) {
    // Parte 1: Mostrar previsualización de la imagen
    const reader = new FileReader(); // Crea un lector de archivos

    reader.onload = function(event) {
      previewImage.src = event.target.result; // Asigna la imagen al src
      previewImage.style.display = 'block'; // Muestra la imagen
    };

    reader.readAsDataURL(file); // Lee el archivo como URL

    // Parte 2: Subir la imagen al servidor
    const formData = new FormData();
    formData.append('image', file); // Usamos 'file' que ya tenemos
    
    try {
      const response = await fetch('/upload-image-nav', {
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
});

// Cargar datos JSON
async function loadPageData() {
  try {
    const response = await fetch('data/page.json');
    pageData = await response.json();
    
    // Restaurar selecciones previas si existen
    if (pageData.page.navbar.currentColor) {
      currentColor = pageData.page.navbar.currentColor;
    }

    if (pageData.page.navbar.currentPosition) {
      currentPosition = pageData.page.navbar.currentPosition;
    }

    if (pageData.page.navbar.currentImage) {
      currentImage = pageData.page.navbar.currentImage;
      previewImage.src = currentImage;
      previewImage.style.display = 'block';
    }

  } catch (error) {
    console.error('Error cargando datos:', error);
  }
}

// Inicializar controles UI
function initializeControls() {
  const positionRadio = document.querySelector(`input[name="radioGroupFixed"][value="${currentPosition}"]`);
  if (positionRadio) positionRadio.checked = true;

  // Marcar color actual (o primary por defecto)
  const colorRadio = document.querySelector(`input[name="radioGroup"][value="${currentColor}"]`);
  if (colorRadio) colorRadio.checked = true;
}

// Configurar event listeners
function setupEventListeners() {
  // Guardar color seleccionado cuando cambia
  document.querySelectorAll('input[name="radioGroup"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      currentColor = e.target.value;
    });
  });

  document.querySelectorAll('input[name="radioGroupFixed"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      currentPosition = e.target.value;
    });
  });

  // Botón de actualización
  document.getElementById("updateNav")?.addEventListener("click", handleNavbarUpdate);
}

// Manejar actualización del navbar
async function handleNavbarUpdate() {
  try {
    if (!pageData) throw new Error("Datos no cargados");
    
    // Obtener selecciones actuales
    const color = getSelectedValue('radioGroup') || currentColor;
    const position = getSelectedValue('radioGroupFixed') || DEFAULT_POSITION;
    
    // Validar selecciones
    if (!color) throw new Error("Selecciona un color");
    
    // Obtener opciones del menú
    const menuOptions = getMenuOptions();
    
    // Generar HTML (actualizado para incluir la imagen)
    const navHTML = generateNavbarHTML(
      color,
      ...menuOptions.texts,
      ...menuOptions.links,
      position,
      currentImage // Pasamos la URL de la imagen
    );
    
    // Actualizar y guardar
    pageData.page.navbar = {
      html: navHTML,
      currentColor: color,
      currentPosition: position,
      currentImage: currentImage // Guardamos la URL de la imagen
    };
    
    await guardarJSON(pageData);
    updateUI();
    
  } catch (error) {
    console.error("Error:", error.message);
    alert(`Error: ${error.message}`);
  }
}

// Helper: Obtener valor seleccionado de un grupo de radios
function getSelectedValue(name) {
  const selected = document.querySelector(`input[name="${name}"]:checked`);
  return selected ? selected.value : null;
}

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
  shownavbarJSON(pageData);
  showJSON(pageData);
  location.reload(); 
  console.log("Navbar actualizado!");
}