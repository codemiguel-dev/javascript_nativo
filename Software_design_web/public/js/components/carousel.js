export function generateCarouselHTML(titlecarousel, headercarousel, imagecarousel, size, colorwords, fontwords, cardCount) {
  let indicatorsHTML = '';
  let itemsHTML = '';

  for (let i = 0; i < cardCount; i++) {
    const activeClass = i === 0 ? 'active' : '';
    indicatorsHTML += `
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="${i}" class="${activeClass}" aria-current="${i === 0}" aria-label="Slide ${i + 1}"></button>
    `;

    itemsHTML += `
      <div class="carousel-item ${activeClass}">
        <img src="${imagecarousel}" class="d-block w-100" alt="..." height="${size}px">
        <div class="carousel-caption d-none d-md-block">
          <h2 class="${colorwords} ${fontwords}">${titlecarousel} ${i + 1}</h2>
          <p class="${colorwords} ${fontwords}">${headercarousel}</p>
        </div>
      </div>
    `;
  }

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
