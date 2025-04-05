// Importar las variables desde el archivo components/navbar-primary.js
import { 
  navbarHTMLprimary, 
  navbarHTMLsuccess,
  navbarHTMLinfo,
  navbarHTMLwarning,
  navbarHTMLdanger,
  navbarHTMLsecondary ,
  navbarHTMLdark
  } from './components/navbar-background-color.js';
import { guardarJSON } from './function/save_json.js';


document.getElementById("addPanelprimary").addEventListener("click", () => {
  if (pageData) {
    // Verificar si ya existe el navbar en el contenido
    if (!pageData.page.navbar.html.includes(navbarHTMLprimary)) {
      // Agregar el navbar al contenido
      pageData.page.navbar.html = navbarHTMLprimary + pageData.page.navbar.html;

      // Actualizar visualmente el contenido
      document.getElementById("container").innerHTML = pageData.page.navbar.html;

      // Guardar los cambios usando la función modularizada
      const resultado = guardarJSON(pageData);
      console.log("JSON guardado correctamente:", resultado);
    } else {
      console.log("El navbar ya está presente.");
    }
  }
});

document.getElementById("addPanelsuccess").addEventListener("click", () => {
  if (pageData) {
    // Verificar si ya existe el navbar en el contenido
    if (!pageData.page.navbar.html.includes(navbarHTMLsuccess)) {
      // Agregar el navbar al contenido
      pageData.page.navbar.html = navbarHTMLsuccess + pageData.page.navbar.html;

      // Actualizar visualmente el contenido
      document.getElementById("container").innerHTML = pageData.page.navbar.html;

      // Guardar los cambios usando la función modularizada
      const resultado = guardarJSON(pageData);
      console.log("JSON guardado correctamente:", resultado);
    } else {
      console.log("El navbar ya está presente.");
    }
  }
});

document.getElementById("addPanelinfo").addEventListener("click", () => {
  if (pageData) {
    // Verificar si ya existe el navbar en el contenido
    if (!pageData.page.navbar.html.includes(navbarHTMLinfo)) {
      // Agregar el navbar al contenido
      pageData.page.navbar.html = navbarHTMLinfo + pageData.page.navbar.html;

      // Actualizar visualmente el contenido
      document.getElementById("container").innerHTML = pageData.page.navbar.html;

      // Guardar los cambios usando la función modularizada
      const resultado = guardarJSON(pageData);
      console.log("JSON guardado correctamente:", resultado);
    } else {
      console.log("El navbar ya está presente.");
    }
  }
});

document.getElementById("addPanelwarning").addEventListener("click", () => {
  if (pageData) {
    // Verificar si ya existe el navbar en el contenido
    if (!pageData.page.navbar.html.includes(navbarHTMLwarning)) {
      // Agregar el navbar al contenido
      pageData.page.navbar.html = navbarHTMLwarning + pageData.page.navbar.html;

      // Actualizar visualmente el contenido
      document.getElementById("container").innerHTML = pageData.page.navbar.html;

      // Guardar los cambios usando la función modularizada
      const resultado = guardarJSON(pageData);
      console.log("JSON guardado correctamente:", resultado);
    } else {
      console.log("El navbar ya está presente.");
    }
  }
});

document.getElementById("addPaneldanger").addEventListener("click", () => {
  if (pageData) {
    // Verificar si ya existe el navbar en el contenido
    if (!pageData.page.navbar.html.includes(navbarHTMLdanger)) {
      // Agregar el navbar al contenido
      pageData.page.navbar.html = navbarHTMLdanger + pageData.page.navbar.html;

      // Actualizar visualmente el contenido
      document.getElementById("container").innerHTML = pageData.page.navbar.html;

      // Guardar los cambios usando la función modularizada
      const resultado = guardarJSON(pageData);
      console.log("JSON guardado correctamente:", resultado);
    } else {
      console.log("El navbar ya está presente.");
    }
  }
});

document.getElementById("addPanelsecondary").addEventListener("click", () => {
  if (pageData) {
    // Verificar si ya existe el navbar en el contenido
    if (!pageData.page.navbar.html.includes(navbarHTMLsecondary)) {
      // Agregar el navbar al contenido
      pageData.page.navbar.html = navbarHTMLsecondary + pageData.page.navbar.html;

      // Actualizar visualmente el contenido
      document.getElementById("container").innerHTML = pageData.page.navbar.html;

      // Guardar los cambios usando la función modularizada
      const resultado = guardarJSON(pageData);
      console.log("JSON guardado correctamente:", resultado);
    } else {
      console.log("El navbar ya está presente.");
    }
  }
});

document.getElementById("addPaneldark").addEventListener("click", () => {
  if (pageData) {
    // Verificar si ya existe el navbar en el contenido
    if (!pageData.page.navbar.html.includes(navbarHTMLdark)) {
      // Agregar el navbar al contenido
      pageData.page.navbar.html = navbarHTMLdark + pageData.page.navbar.html;

      // Actualizar visualmente el contenido
      document.getElementById("container").innerHTML = pageData.page.navbar.html;

      // Guardar los cambios usando la función modularizada
      const resultado = guardarJSON(pageData);
      console.log("JSON guardado correctamente:", resultado);
    } else {
      console.log("El navbar ya está presente.");
    }
  }
});


// Borrar el navbar por ID
document.getElementById("deletePanel").addEventListener("click", () => {
  if (!pageData || !pageData.page || !pageData.page.navbar) {
    console.warn("Datos no válidos: pageData o navbar no encontrado");
    return;
  }

  // ID del navbar que quieres borrar (podría venir de un input o ser fijo)
  const navbarIdToDelete = 1; // Este sería el ID 1 que aparece en tu JSON

  // Verificar si el navbar existe y coincide con el ID
  if (pageData.page.navbar.id === navbarIdToDelete) {
    // 1. Limpiar el HTML visualmente
    document.getElementById("container").innerHTML = "";
    
    // 2. Actualizar el JSON (ambas opciones disponibles)
    // Opción A: Eliminar completamente el objeto navbar
    //delete pageData.page.navbar;
    
    // Opción B: Mantener la estructura vacía (descomenta si prefieres esta)
    pageData.page.navbar = { id: 1, html: "" };

    // 3. Enviar cambios al servidor
    fetch('/guardar-json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pageData)
    })
    .then(response => {
      if (!response.ok) throw new Error("Error en la respuesta del servidor");
      return response.json();
    })
    .then(data => {
      console.log("Navbar eliminado correctamente", data);
      // Opcional: Recargar datos o actualizar UI
    })
    .catch(error => {
      console.error("Error:", error);
      // Opcional: Mostrar mensaje al usuario
    });
  } else {
    console.warn(`No se encontró navbar con ID ${navbarIdToDelete}`);
  }
});