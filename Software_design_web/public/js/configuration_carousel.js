// Importar las variables desde los archivos necesarios
import { generateCarouselHTML } from "./components/carousel.js";
import { guardarJSON } from "./function/save_json.js";
import { showJSON } from "./function/show_page.js";

// Variable global para almacenar los datos
let pageData = null;
const numberOfCards = 5; // Número de tarjetas del carrusel

// Configuración inicial del carrusel
let currentSize = "";
let currentColorWords = "";
let currentFontWords = "";
let currentTitleSize = "";
let currentHeaderSize = "";
let currentPositionWords = "";

// Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", async () => {
  generateCarouselCards(); // Generar las tarjetas dinámicamente
  generateSizeImage(); // Generar el selector de tamaño de imagen
  generateColorWords(); // Generar los radios de colores
  generateFontWords(); // Generar los radios de fuentes
  generatePositionWords(); // Generar los radios de posiciones
  generateQuantityCard(); // Generar el selector de cantidad de tarjetas
  await loadPageData();
  initializeControls();
  setupEventListeners();
});

// Función para generar las tarjetas del carrusel
function generateCarouselCards() {
  const carouselContainer = document.querySelector(".swiper-wrapper");

  if (!carouselContainer) {
    console.error("No se encontró el contenedor del carrusel");
    return;
  }

  // Limpiar contenedor existente
  carouselContainer.innerHTML = "";

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
    carouselContainer.insertAdjacentHTML("beforeend", cardHTML);
  }

  // Configurar los event listeners para los inputs de imagen
  setupImageInputs();
}

function generateSizeImage() {
  const Container = document.querySelector(".size-image");
  Container.innerHTML = "";

  // Tamaños personalizados (puedes modificarlos según necesites)
  const customSizes = [
    200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300,
  ];

  let radioButtonsHTML = customSizes
    .map(
      (size) => `
    <div class="form-check">
      <input type="radio" name="radioGroupCarousel" value="${size}" class="form-check-input">
      <label for="size${size}" class="form-check-label text-dark">${size}px</label>
    </div>
  `
    )
    .join("");

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

  Container.insertAdjacentHTML("beforeend", HTML);
}

function generateColorWords() {
  const Container = document.querySelector(".color-words");
  Container.innerHTML = "";

  // Lista de colores Bootstrap
  const colorOptions = [
    { name: "Primary", class: "text-primary" },
    { name: "Secondary", class: "text-secondary" },
    { name: "Success", class: "text-success" },
    { name: "Danger", class: "text-danger" },
    { name: "Warning", class: "text-warning" },
    { name: "Info", class: "text-info" },
    { name: "Light", class: "text-light bg-dark" }, // Visibilidad
    { name: "Dark", class: "text-dark" },
  ];

  // Tamaños para título y encabezado
  const fontSizes = [];
  for (let i = 12; i <= 200; i += 2) {
    fontSizes.push(i);
  }

  // Radios de colores
  const colorRadiosHTML = colorOptions
    .map(
      (color, index) => `
    <input type="radio" name="radioGroupCarouselColorWord" value="${color.class.replace(
      " bg-dark",
      ""
    )}" class="design_radio_nav_color" id="colorOption${index}">
    <label for="colorOption${index}" class="${color.class}">${
        color.name
      }</label><br/>
  `
    )
    .join("");

  // Selector de tamaño para title
  const titleSizeSelectHTML = `
    <label for="titleSizeSelect"><strong>Tamaño del título:</strong></label>
    <select id="titleSizeSelect" class="form-select mb-3">
      ${fontSizes
        .map((size) => `<option value="${size}">${size}px</option>`)
        .join("")}
    </select>
  `;

  // Selector de tamaño para header
  const headerSizeSelectHTML = `
    <label for="headerSizeSelect"><strong>Tamaño del encabezado:</strong></label>
    <select id="headerSizeSelect" class="form-select mb-3">
      ${fontSizes
        .map((size) => `<option value="${size}">${size}px</option>`)
        .join("")}
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

  Container.insertAdjacentHTML("beforeend", HTML);
}

function generateFontWords() {
  const Container = document.querySelector(".font-words");
  Container.innerHTML = "";

  const fontOptions = [
    { label: "Bold", value: "fw-bold" },
    { label: "Bolder", value: "fw-bolder" },
    { label: "Semibold", value: "fw-semibold" },
    { label: "Medium", value: "fw-medium" },
    { label: "Normal", value: "fw-normal" },
    { label: "Light", value: "fw-light" },
    { label: "Lighter", value: "fw-lighter" },
    { label: "Italic", value: "fst-italic" },
    { label: "Text with normal", value: "fst-normal" },
    { label: "Font Elegant", value: "font-elegant" },
    { label: "Font Modern", value: "font-modern" },
    { label: "Font Code", value: "font-code" },
    { label: "Font Handwritten", value: "font-handwritten" },
    { label: "Font Minimal", value: "font-minimal" },
    { label: "Font Gradient", value: "font-gradient" },
    { label: "Font Bold 3D", value: "font-bold-3d" },
    { label: "Font Typewriter", value: "font-typewriter" },
    { label: "Font Vintage", value: "font-vintage" },
    { label: "Font Fire", value: "font-fire" },
    { label: "Font Holographic", value: "font-holographic" },
    { label: "Font Glitch", value: "font-glitch" },
    { label: "Font Ice", value: "font-ice" },
    { label: "Font Rainbow Shadow", value: "font-rainbow-shadow" },
    { label: "Font Smoke", value: "font-smoke" },
    { label: "Font Neon Soft", value: "font-neon-soft" },
    { label: "Font Western", value: "font-western" },
    { label: "Font Medieval", value: "font-medieval" },
    { label: "Font Rainbow", value: "font-rainbow" },
    { label: "Font Matrix", value: "font-matrix" },
    { label: "Font Chocolate", value: "font-chocolate" },
    { label: "Font Cyberpunk", value: "font-cyberpunk" },
    { label: "Font Pixel", value: "font-pixel" },
    { label: "Font Dry Ice", value: "font-dry-ice" },
    { label: "Font Crystal", value: "font-crystal" },
    { label: "Font Retro", value: "font-retro" },
    { label: "Font Box", value: "font-box" },
  ];

  // Crear el select con vista previa
  const HTML = `
    <div class="modal-header">
      <h5 class="modal-title">Fuentes de letras:</h5>
    </div>
    <div class="modal-body">
      <label for="fontSelect" class="form-label">Selecciona una fuente:</label>
      <select id="selectFontWord" class="form-select mb-3">
        ${fontOptions
          .map(
            (option) => `
          <option value="${option.value}" ${
              currentFontWords === option.value ? "selected" : ""
            }>
            ${option.label}
          </option>
        `
          )
          .join("")}
      </select>
      
      <div class="mt-3 p-3 border rounded bg-light">
        <h6>Vista previa:</h6>
        <p id="fontPreview" class="${currentFontWords || "fw-normal"} mt-2">
        Texto de ejemplo con la fuente seleccionada
      </p>
  </div>

    </div>
  `;

  Container.insertAdjacentHTML("beforeend", HTML);

  // Actualizar vista previa al cambiar selección
  const selectElement = document.getElementById("selectFontWord");
  const previewElement = document.getElementById("fontPreview");

  selectElement.addEventListener("change", function () {
    previewElement.className = this.value;
  });

  // Inicializar vista previa
  previewElement.className = selectElement.value;
}

function generatePositionWords() {
  const Container = document.querySelector(".position-words");
  Container.innerHTML = "";
  // Tamaños personalizados (puedes modificarlos según necesites)

  const HTML = `
      <!-- posición de letras -->
                <div class="modal-header">
                    <h5 class="modal-title" id="miModalLabel">Posición de letras:</h5>

                    <input type="radio" name="radioGroupCarouselPositionWord" value="text-start"
                        class="design_radio_nav_color">
                    <label for="fixedTop" class="text-dark">Izquierda</label></br>

                    <input type="radio" name="radioGroupCarouselPositionWord" value="text-center"
                        class="design_radio_nav_color">
                    <label for="fixedTop" class="text-dark">Centro</label></br>

                    <input type="radio" name="radioGroupCarouselPositionWord" value="text-end"
                        class="design_radio_nav_color">
                    <label for="fixedTop" class="text-dark">Derecha </label></br>

                </div>
  `;

  Container.insertAdjacentHTML("beforeend", HTML);
}

function generateQuantityCard() {
  const Container = document.querySelector(".quantity-card");
  Container.innerHTML = "";

  const cantidades = [1, 2, 3, 4, 5]; // Puedes ajustar los valores según lo necesario

  let optionsHTML = cantidades
    .map((cantidad) => `<option value="${cantidad}">${cantidad} tarjeta${cantidad > 1 ? "s" : ""}</option>`)
    .join("");

  const HTML = `
    <div class="mb-3">
      <label for="selectCantidad" class="form-label text-dark">Cantidad de tarjetas:</label>
      <select class="form-select" id="selectCantidad" name="carouselCardQuantity">
        ${optionsHTML}
      </select>
    </div>
  `;

  Container.insertAdjacentHTML("beforeend", HTML);
}

// Función para configurar los event listeners de los inputs de imagen
function setupImageInputs() {
  document.querySelectorAll(".image-input").forEach((input) => {
    input.addEventListener("change", async function (e) {
      const index = this.id.split("-")[1];
      const previewId = `previewcarousel-${index}`;
      const previewImage = document.getElementById(previewId);
      const file = e.target.files[0];

      if (file && previewImage) {
        // Mostrar previsualización
        const reader = new FileReader();
        reader.onload = function (event) {
          previewImage.src = event.target.result;
          previewImage.style.display = "block";
        };
        reader.readAsDataURL(file);

        // Subir imagen al servidor
        const formData = new FormData();
        formData.append("image", file);
        formData.append("index", index);

        try {
          const response = await fetch("/upload-image", {
            method: "POST",
            body: formData,
          });
          const data = await response.json();

          if (!data.success) {
            console.error("Error al subir la imagen:", data.message);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    });
  });
}

// Cargar datos JSON
async function loadPageData() {
  try {
    const response = await fetch("data/page.json");
    pageData = await response.json();

    // Restaurar selecciones previas si existen
    if (pageData.page.carousel?.styles) {
      currentSize = pageData.page.carousel.styles.size || "";
      currentColorWords = pageData.page.carousel.styles.color || "";
      currentFontWords = pageData.page.carousel.styles.font || "";

      // NUEVO: Restaurar tamaño de título y encabezado
      currentTitleSize = pageData.page.carousel.styles.titleSize || "";
      currentHeaderSize = pageData.page.carousel.styles.headerSize || "";
      currentPositionWords = pageData.page.carousel.styles.positionWord || "";
    }

    // Restaurar datos de las tarjetas si existen
    if (pageData.page.carousel?.cards) {
      pageData.page.carousel.cards.forEach((card) => {
        const index = card.index;
        const titleInput = document.getElementById(`titlecarousel-${index}`);
        const headerInput = document.getElementById(`headercarousel-${index}`);
        const previewImage = document.getElementById(
          `previewcarousel-${index}`
        );

        if (titleInput) titleInput.value = card.title || "";
        if (headerInput) headerInput.value = card.header || "";
        if (previewImage && card.image) {
          previewImage.src = "file/img/" + card.image;
          previewImage.style.display = "block";
        }
      });
    }
  } catch (error) {
    console.error("Error loading page data:", error);
  }
}

function initializeControls() {
  // Configurar radios según los valores cargados
  if (currentSize) {
    const sizeRadio = document.querySelector(
      `input[name="radioGroupCarousel"][value="${currentSize}"]`
    );
    if (sizeRadio) sizeRadio.checked = true;
  }

  if (currentColorWords) {
    const colorRadio = document.querySelector(
      `input[name="radioGroupCarouselColorWord"][value="${currentColorWords}"]`
    );
    if (colorRadio) colorRadio.checked = true;
  }

  if (currentPositionWords) {
    const positionRadio = document.querySelector(
      `input[name="radioGroupCarouselPositionWord"][value="${currentPositionWords}"]`
    );
    if (positionRadio) positionRadio.checked = true;
  }

  if (currentFontWords) {
    const fontSelect = document.getElementById("selectFontWord"); // o usa el ID que tengas
    if (fontSelect) {
      fontSelect.value = currentFontWords;
    }
  }

  if (currentFontWords) {
    const previewElement = document.getElementById("fontPreview");
    if (previewElement) {
      previewElement.className = `${currentFontWords} mt-2`;
    }
  }

  // NUEVO: Configurar tamaño de título
  if (currentTitleSize) {
    const titleSizeSelect = document.getElementById("titleSizeSelect");
    if (titleSizeSelect) titleSizeSelect.value = currentTitleSize;
  }

  // NUEVO: Configurar tamaño de encabezado
  if (currentHeaderSize) {
    const headerSizeSelect = document.getElementById("headerSizeSelect");
    if (headerSizeSelect) headerSizeSelect.value = currentHeaderSize;
  }
}

// Configurar event listeners
function setupEventListeners() {
  // Botón de actualización
  document
    .getElementById("updateCarousel")
    ?.addEventListener("click", handleCarouselUpdate);
}

// Manejar actualización del carrusel
async function handleCarouselUpdate() {
  try {
    if (!pageData) throw new Error("Datos no cargados");

    // Obtener valores seleccionados
    const size = getSelectedValue("radioGroupCarousel") || currentSize;
    const colorwords = getSelectedValue("radioGroupCarouselColorWord") || currentColorWords;
    const fontwords = document.getElementById("selectFontWord")?.value || currentFontWords;
    const titleSize =
      document.getElementById("titleSizeSelect")?.value ||
      currentTitleSize ||
      "20";
    const headerSize =
      document.getElementById("headerSizeSelect")?.value ||
      currentHeaderSize ||
      "16";
    const positionWord = getSelectedValue("radioGroupCarouselPositionWord") || "text-start";

    console.log(positionWord);  
    const allCards = getCard();

    // Generar HTML del carrusel
    const carouselHTML = generateCarouselHTML(
      allCards,
      size,
      colorwords,
      fontwords,
      titleSize,
      headerSize,
      positionWord
    );

    pageData.page.carousel = {
      id: 1,
      html: carouselHTML,
      cards: allCards,
      styles: {
        size: size,
        color: colorwords,
        font: fontwords,
        titleSize: titleSize,
        headerSize: headerSize,
        positionWord: positionWord,
      },
    };

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
        headerSize: headerSize,
        positionWord: positionWord,
      },
    };



    await guardarJSON(pageData);
    updateUI();
       
    // const toastEl = document.getElementById('toastUpdated');
    // const toast = new bootstrap.Toast(toastEl);
    // return toast.show();

    // Mostrar feedback visual
  } catch (error) {
    console.error("Error:", error.message);
    showToast(`Error: ${error.message}`, "danger");
  }
}

// Función auxiliar para mostrar notificaciones (opcional)
function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `toast show align-items-center text-white bg-${type} border-0`;
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// Obtener datos de todas las tarjetas
function getCard() {
  const cards = document.querySelectorAll(".card-item");
  const cardsArray = [];

  cards.forEach((card) => {
    const index = card.getAttribute("data-index");
    const fileInput = document.getElementById(`imagecarousel-${index}`);
    const titleInput = document.getElementById(`titlecarousel-${index}`);
    const headerInput = document.getElementById(`headercarousel-${index}`);
    const previewImage = document.getElementById(`previewcarousel-${index}`);

    console.log(fileInput);

    // Obtener nombre de archivo o mantener la imagen actual
    let imageName = "";
    if (fileInput?.files?.[0]) {
      imageName = fileInput.files[0].name;
    } else if (previewImage?.src) {
      const srcParts = previewImage.src.split("/");
      imageName = srcParts[srcParts.length - 1];
    }

    cardsArray.push({
      index: index,
      image: imageName,
      title: titleInput?.value || "",
      header: headerInput?.value || "",
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

// Actualizar la interfaz
function updateUI() {
  showJSON(pageData);
  // location.reload(); // Recarga la página (equivalente a F5)
}
