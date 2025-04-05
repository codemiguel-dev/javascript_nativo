// Importar las variables desde el archivo components/navbar-primary.js
import { navbarHTML, navbarHTMLsuccess } from './components/navbar-primary.js';

document.getElementById("agregarPanel").addEventListener("click", () => {
  if (pageData) {
    // Verificar si ya existe el navbar en el contenido
    if (!pageData.page.navbar.html.includes(navbarHTML)) {
      // Agregar el navbar al contenido
      pageData.page.navbar.html = navbarHTML + pageData.page.navbar.html;

      // Actualizar visualmente el contenido
      document.getElementById("container").innerHTML = pageData.page.navbar.html;

      // Enviar el JSON actualizado al servidor para guardar el archivo html.json
      fetch('/guardar-json', { // Ruta al servidor Express
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pageData) // Enviar el JSON con el contenido actualizado
      })
      .then(response => response.json())
      .then(data => {
        console.log("JSON guardado correctamente:", data);
      })
      .catch(error => {
        console.error("Error al guardar el JSON:", error);
      });
    } else {
      console.log("El navbar ya está presente.");
    }
  }
});


document.getElementById("agregarPanelsuccess").addEventListener("click", () => {
  if (pageData) {
    // Verificar si ya existe el navbar en el contenido
    if (!pageData.page.navbar.html.includes(navbarHTMLsuccess)) {
      // Agregar el navbar al contenido
      pageData.page.navbar.html = navbarHTMLsuccess + pageData.page.navbar.html;

      // Actualizar visualmente el contenido
      document.getElementById("container").innerHTML = pageData.page.navbar.html;

      // Enviar el JSON actualizado al servidor para guardar el archivo html.json
      fetch('/guardar-json', { // Ruta al servidor Express
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pageData) // Enviar el JSON con el contenido actualizado
      })
      .then(response => response.json())
      .then(data => {
        console.log("JSON guardado correctamente:", data);
      })
      .catch(error => {
        console.error("Error al guardar el JSON:", error);
      });
    } else {
      console.log("El navbar ya está presente.");
    }
  }
});

// Borrar el navbar
document.getElementById("borrarPanel").addEventListener("click", () => {
  if (pageData) {
    // Eliminar el navbar del contenido
    pageData.page.navbar.html = pageData.page.navbar.html.replace(navbarHTMLsuccess, "");

    // Actualizar visualmente el contenido
    document.getElementById("container").innerHTML = pageData.page.navbar.html;

    // Enviar el JSON actualizado al servidor para guardar el archivo html.json
    fetch('/guardar-json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pageData) // Enviar el JSON con el contenido actualizado
    })
    .then(response => response.json())
    .then(data => {
      console.log("JSON guardado correctamente:", data);
    })
    .catch(error => {
      console.error("Error al guardar el JSON:", error);
    });
  }
});
