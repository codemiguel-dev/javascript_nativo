import { guardarJSON } from "./save_json.js";

// Para mover el navbar arriba
document.getElementById('moveNavUp').addEventListener('click', () => {
  updateElementsOrder(['navbar', 'carousel']);
});

// Para mover el carousel arriba
document.getElementById('moveCarouselUp').addEventListener('click', () => {
  updateElementsOrder(['carousel', 'navbar']);
});
async function updateElementsOrder(newOrder) {
  try {
    if (!pageData) throw new Error("Datos no cargados");
    
    // Validar el nuevo orden
    if (!Array.isArray(newOrder) || 
        newOrder.length !== 2 || 
        !newOrder.includes('navbar') || 
        !newOrder.includes('carousel')) {
      throw new Error("Orden no válido");
    }
    
    // Actualizar el orden en los datos
    pageData.page.elementsOrder = newOrder;
    
    // Guardar en la base de datos
    await guardarJSON(pageData);
    
    // Opcional: Actualizar la UI inmediatamente
    applyElementsOrder();
    
  } catch (error) {
    console.error("Error al actualizar el orden:", error.message);
    alert(`Error: ${error.message}`);
  }
}

function applyElementsOrder() {
  const container = document.querySelector('.frame-container');
  const navElement = document.querySelector('#container-nav').closest('.hover');
  const carouselElement = document.querySelector('#container-carousel').closest('.hover');
  
  // Limpiar el contenedor
  container.innerHTML = '';
  
  // Reagregar elementos en el orden correcto
  if (pageData.page.elementsOrder[0] === 'navbar') {
    container.appendChild(navElement);
    container.appendChild(carouselElement);
  } else {
    container.appendChild(carouselElement);
    container.appendChild(navElement);
  }
}