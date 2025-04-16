// Importar las variables desde el archivo components/navbar-primary.js
import { 
  navbarHTMLprimary, 
  navbarHTMLsuccess,
  navbarHTMLinfo,
  navbarHTMLwarning,
  navbarHTMLdanger,
  navbarHTMLsecondary,
  navbarHTMLdark
  } from './components/navbar-background-color.js';
import { guardarJSON } from './function/save_json.js';
import { showJSON } from './function/show_page.js';


document.getElementById("addPanelprimary").addEventListener("click", () => {
  if (pageData) {
    // Verificar si ya existe el navbar en el contenido
    if (!pageData.page.navbar.html.includes(navbarHTMLprimary)) {
      // Agregar el navbar al contenido
      pageData.page.navbar.html = navbarHTMLprimary + pageData.page.navbar.html;

      document.getElementById("dynamic-title").innerHTML = pageData.page.title.html;

      showJSON(pageData);

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
      showJSON(pageData);

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
      showJSON(pageData);

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
      showJSON(pageData);

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
      showJSON(pageData);

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
      showJSON(pageData);

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
      showJSON(pageData);

      // Guardar los cambios usando la función modularizada
      const resultado = guardarJSON(pageData);
      console.log("JSON guardado correctamente:", resultado);
    } else {
      console.log("El navbar ya está presente.");
    }
  }
});


