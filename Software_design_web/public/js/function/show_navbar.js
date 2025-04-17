

/**
 * Función para guardar datos JSON en el servidor
 * @param {Object} data - Datos a guardar
 * @returns {Promise} - Promesa con la respuesta del servidor
 */
// En tu función guardarJSON del frontend:
export async function shownavbarJSON(pageData) {
    // Mostrar contenido inicial
    document.getElementById("container-nav").innerHTML =   pageData.page.container.html +  pageData.page.title.html +
    pageData.page.navbar.html +   pageData.page.endcontainer.html;

  }