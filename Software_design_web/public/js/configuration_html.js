
let pageData; 

fetch('data/page.json')
  .then(response => response.json())
  .then(data => {
    pageData = data; // Guardamos los datos cargados

    // Cargar CDN styles
    if (data.page.cdnStyles) {
      data.page.cdnStyles.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
      });
    }

    // Cargar local styles
    if (data.page.localStyles) {
      data.page.localStyles.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
      });
    }
    document.getElementById("dynamic-title-image").innerHTML = data.page.titleimage.html;

    // Mostrar contenido inicial
    document.getElementById("body").innerHTML = data.page.body.html;
    document.getElementById("endbody").innerHTML = data.page.endbody.html;
    console.log(data.page.body.html)

    // Mostrar contenido de navbar modal
    document.getElementById("container-nav").innerHTML =   data.page.container.html + data.page.title.html +
    data.page.navbar.html + data.page.endcontainer.html;
    
    // Mostrar contenido completo de la página
    document.getElementById("container-carousel").innerHTML =   data.page.container.html +
    data.page.carousel.html + data.page.endcontainer.html;

     // Mostrar contenido completo de la página
     document.getElementById("container-carousel-modal").innerHTML =   data.page.container.html +
     data.page.carouselmodal.html + data.page.endcontainer.html;

    
  })
  .catch(error => {
    console.error("Error al cargar el JSON:", error);
  });




