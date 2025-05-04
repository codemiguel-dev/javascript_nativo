export function generateSwiperCarouselHTML(titles, headers, images, size, colorwords, fontwords, cardCount) {
    let cardsHTML = '';
    const titles = ['Título 1', 'Título 2'];
    const headers = ['Encabezado 1', 'Encabezado 2'];
    const images = ['img1.jpg', 'img2.jpg'];
    
    for (let i = 0; i < cardCount; i++) {
      cardsHTML += `
        <li class="card-item swiper-slide">
          <a href="#" class="card-link">
            <img src="${images[i] || 'file/img/Sin_imagen.png'}" alt="Card Image" class="card-image" width="${size}px">
            <h2 class="card-title ${colorwords} ${fontwords}">${titles[i] || 'Título'} ${i + 1}</h2>
            <p class="${colorwords} ${fontwords}">${headers[i] || 'Encabezado'}</p>
          </a>
        </li>
      `;
    }
  
    return `
      <div class="container swiper">
        <div class="card-wrapper">
          <ul class="card-list swiper-wrapper">
            ${cardsHTML}
          </ul>
  
          <!-- If we need pagination -->
          <div class="swiper-pagination"></div>
  
          <!-- If we need navigation buttons -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
  
          <!-- If we need scrollbar -->
          <div class="swiper-scrollbar"></div>
        </div>
      </div>
    `;
  }
  