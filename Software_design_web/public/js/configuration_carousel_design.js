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
    generateSizeImage(); // Generar el selector de tamaño de imagen
    generateColorWords();
    generateFontWords();
    generatePositionWords();
    generateQuantityCard();
    await loadPageData();
    initializeControls();
});

function generateSizeImage() {
    const Container = document.querySelector(".size-image-design");
    Container.innerHTML = "";
  
    // Tamaños personalizados (puedes modificarlos según necesites)
    const customSizes = [
      200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300,
    ];
  
    let radioButtonsHTML = customSizes
      .map(
        (size) => `
      <div class="form-check">
        <input type="radio" name="radioGroupCarouseldesign" value="${size}" class="form-check-input">
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
    const Container = document.querySelector(".color-words-design");
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
      <input type="radio" name="radioGroupCarouselColorWorddesign" value="${color.class.replace(
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
      <label for="titleSizeSelectdesign"><strong>Tamaño del título:</strong></label>
      <select id="titleSizeSelectdesign" class="form-select mb-3">
        ${fontSizes
          .map((size) => `<option value="${size}">${size}px</option>`)
          .join("")}
      </select>
    `;
  
    // Selector de tamaño para header
    const headerSizeSelectHTML = `
      <label for="headerSizeSelectdesign"><strong>Tamaño del encabezado:</strong></label>
      <select id="headerSizeSelectdesign" class="form-select mb-3">
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
    const Container = document.querySelector(".font-words-design");
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
        <select id="selectFontWorddesign" class="form-select mb-3">
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
          <p id="fontPreviewdesign" class="${currentFontWords || "fw-normal"} mt-2">
          Texto de ejemplo con la fuente seleccionada
        </p>
    </div>
  
      </div>
    `;
  
    Container.insertAdjacentHTML("beforeend", HTML);
  
    // Actualizar vista previa al cambiar selección
    const selectElement = document.getElementById("selectFontWorddesign");
    const previewElement = document.getElementById("fontPreviewdesign");
  
    selectElement.addEventListener("change", function () {
      previewElement.className = this.value;
    });
  
    // Inicializar vista previa
    previewElement.className = selectElement.value;
}

function generatePositionWords() {
    const Container = document.querySelector(".position-words-design");
    Container.innerHTML = "";
    // Tamaños personalizados (puedes modificarlos según necesites)
  
    const HTML = `
        <!-- posición de letras -->
                  <div class="modal-header">
                      <h5 class="modal-title" id="miModalLabel">Posición de letras:</h5>
  
                      <input type="radio" name="radioGroupCarouselPositionWorddesign" value="text-start"
                          class="design_radio_nav_color">
                      <label for="fixedTop" class="text-dark">Izquierda</label></br>
  
                      <input type="radio" name="radioGroupCarouselPositionWorddesign" value="text-center"
                          class="design_radio_nav_color">
                      <label for="fixedTop" class="text-dark">Centro</label></br>
  
                      <input type="radio" name="radioGroupCarouselPositionWorddesign" value="text-end"
                          class="design_radio_nav_color">
                      <label for="fixedTop" class="text-dark">Derecha </label></br>
  
                  </div>
    `;
  
    Container.insertAdjacentHTML("beforeend", HTML);
}

function generateQuantityCard() {
  const Container = document.querySelector(".quantity-card-design");
  Container.innerHTML = "";

  const cantidades = [1, 2, 3, 4, 5]; // Puedes ajustar los valores según lo necesario

  let optionsHTML = cantidades
    .map((cantidad) => `<option value="${cantidad}">${cantidad} tarjeta${cantidad > 1 ? "s" : ""}</option>`)
    .join("");

  const HTML = `
    <div class="mb-3">
      <label for="selectCantidaddesign" class="form-label text-dark">Cantidad de tarjetas:</label>
      <select class="form-select" id="selectCantidaddesign" name="carouselCardQuantitydesign">
        ${optionsHTML}
      </select>
    </div>
  `;

  Container.insertAdjacentHTML("beforeend", HTML);
}


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
      `input[name="radioGroupCarouseldesign"][value="${currentSize}"]`
    );
    if (sizeRadio) sizeRadio.checked = true;
  }

  if (currentColorWords) {
    const colorRadio = document.querySelector(
      `input[name="radioGroupCarouselColorWorddesign"][value="${currentColorWords}"]`
    );
    if (colorRadio) colorRadio.checked = true;
  }

  if (currentPositionWords) {
    const positionRadio = document.querySelector(
      `input[name="radioGroupCarouselPositionWorddesign"][value="${currentPositionWords}"]`
    );
    if (positionRadio) positionRadio.checked = true;
  }

  if (currentFontWords) {
    const fontSelect = document.getElementById("selectFontWorddesign"); // o usa el ID que tengas
    if (fontSelect) {
      fontSelect.value = currentFontWords;
    }
  }

  if (currentFontWords) {
    const previewElement = document.getElementById("fontPreviewdesign");
    if (previewElement) {
      previewElement.className = `${currentFontWords} mt-2`;
    }
  }

  // NUEVO: Configurar tamaño de título
  if (currentTitleSize) {
    const titleSizeSelect = document.getElementById("titleSizeSelectdesign");
    if (titleSizeSelect) titleSizeSelect.value = currentTitleSize;
  }

  // NUEVO: Configurar tamaño de encabezado
  if (currentHeaderSize) {
    const headerSizeSelect = document.getElementById("headerSizeSelectdesign");
    if (headerSizeSelect) headerSizeSelect.value = currentHeaderSize;
  }
}
