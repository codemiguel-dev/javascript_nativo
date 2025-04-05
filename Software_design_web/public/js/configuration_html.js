let pageData; // Variable global para almacenar los datos del JSON cargado

fetch('html.json')
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

    // Mostrar contenido inicial
    document.getElementById("container").innerHTML = data.page.navbar.html;
  })
  .catch(error => {
    console.error("Error al cargar el JSON:", error);
  });

