export function generateCarouselHTML(slides) {
  let indicators = '';
  let items = '';

  slides.forEach((slide, index) => {
    const activeClass = index === 0 ? 'active' : '';
    indicators += `
      <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="${index}" class="${activeClass}" aria-current="${index === 0}" aria-label="Slide ${index + 1}"></button>
    `;

    items += `
      <div class="carousel-item ${activeClass}" data-bs-interval="10000">
        <img src="file/carousel/${slide.image}" class="d-block w-100" alt="..." height="900px">
        <div class="carousel-caption d-none d-md-block">
          <h5 class="text-light">${slide.title}</h5>
          <p class="text-light">${slide.header}</p>
        </div>
      </div>
    `;
  });

  return `
    <div id="carouselExampleDark" class="carousel carousel-dark slide">
      <div class="carousel-indicators">
        ${indicators}
      </div>
      <div class="carousel-inner">
        ${items}
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  `;
}
