export function generateCarouselHTML(
  allCards,
  size,
  colorwords,
  fontwords,
  titleSize = 24,
  headerSize = 16,
  imageBasePath = "file/img/"
) {
  // Validación de parámetros
  if (!Array.isArray(allCards)) {
    throw new Error("allCards debe ser un array de objetos");
  }

  if (allCards.length === 0) {
    return '<div class="alert alert-warning">No hay tarjetas para mostrar</div>';
  }

  let indicatorsHTML = "";
  let itemsHTML = "";

  allCards.forEach((card, i) => {
    const activeClass = i === 0 ? "active" : "";

    const imagePath = card.image
      ? `${imageBasePath}${card.image}`
      : `${imageBasePath}Sin_imagen.png`;

    indicatorsHTML += `
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="${i}" 
        class="${activeClass}" aria-current="${i === 0}" aria-label="Slide ${i + 1}"></button>
    `;

    itemsHTML += `
      <div class="carousel-item ${activeClass}">
        <img src="${imagePath}" class="d-block w-100" alt="${card.title || "Imagen " + (i + 1)}" height="${size}px">
        <div class="carousel-caption d-none d-md-block text-start">
          <h2 class="${colorwords} ${fontwords}" style="font-size:${titleSize}px;">${card.title || ""}</h2>
          <p class="${colorwords} ${fontwords}" style="font-size:${headerSize}px;">${card.header || ""}</p>
        </div>
      </div>
    `;
  });

  return `
    <div id="carouselExampleCaptions" class="carousel slide">
      <div class="carousel-indicators">
        ${indicatorsHTML}
      </div>
      <div class="carousel-inner">
        ${itemsHTML}
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  `;
}
