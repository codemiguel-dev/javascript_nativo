export function generateCarouselHTML(
  allCards,
  {
    size = "400",
    colorwords = "text-white",
    fontwords = "fw-normal",
    titleSize = "24",
    headerSize = "16",
    positionWord = "text-start",
    numberCard = 3 // Valor por defecto: 5 tarjetas
  },
  carouselId
) {
  // Validación de parámetros
  if (!Array.isArray(allCards)) {
    throw new Error("allCards debe ser un array de objetos");
  }

  if (!carouselId) {
    throw new Error("Se requiere un ID único para el carrusel");
  }

  if (allCards.length === 0) {
    return '<div class="alert alert-warning">No hay tarjetas para mostrar</div>';
  }

  // Limitar el número de tarjetas según numberCard
  const limitedCards = allCards.slice(0, numberCard);

  // Generar indicadores e items del carrusel
  const carouselItems = limitedCards.map((card, i) => {
    const imagePath = card.image 
      ? `file/img/${card.image}`
      : 'file/img/Sin_imagen.png';

    return `
      <div class="carousel-item ${i === 0 ? 'active' : ''}">
        <img src="${imagePath}" class="d-block w-100" 
             alt="${card.title || 'Imagen ' + (i + 1)}" 
             height="${size}px">
        <div class="carousel-caption ${positionWord}">
          <h2 class="${colorwords} ${fontwords}" style="font-size:${titleSize}px;">
            ${card.title || ''}
          </h2>
          <p class="${colorwords} ${fontwords}" style="font-size:${headerSize}px;">
            ${card.header || ''}
          </p>
        </div>
      </div>
    `;
  }).join('');

  const carouselIndicators = limitedCards.map((_, i) => `
    <button type="button" data-bs-target="#${carouselId}" 
            data-bs-slide-to="${i}" class="${i === 0 ? 'active' : ''}" 
            aria-current="${i === 0}" aria-label="Slide ${i + 1}">
    </button>
  `).join('');

  return `
    <div id="${carouselId}" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        ${carouselIndicators}
      </div>
      <div class="carousel-inner">
        ${carouselItems}
      </div>
      <button class="carousel-control-prev" type="button" 
              data-bs-target="#${carouselId}" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" 
              data-bs-target="#${carouselId}" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  `;
}